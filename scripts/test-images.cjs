const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const https = require("https");

function parseCSV(content) {
  const lines = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        row.push(cell.trim());
        cell = "";
      } else if (char === "\r" || char === "\n") {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        row.push(cell.trim());
        if (row.length > 1 || row[0] !== "") {
          lines.push(row);
        }
        row = [];
        cell = "";
      } else {
        cell += char;
      }
    }
  }
  if (cell !== "" || row.length > 0) {
    row.push(cell.trim());
    lines.push(row);
  }
  return lines;
}

function getCommonsUrl(filename) {
  const cleanName = filename.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(cleanName).digest('hex');
  return `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.substring(0, 2)}/${encodeURIComponent(cleanName)}`;
}

function extractFilename(url) {
  if (!url.includes("upload.wikimedia.org/wikipedia/commons/")) return null;
  const parts = url.split("/");
  return decodeURIComponent(parts[parts.length - 1]);
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const options = {
      method: "HEAD",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      }
    };
    const req = https.request(url, options, (res) => {
      resolve(res.statusCode);
    });
    req.on("error", (e) => {
      resolve(500);
    });
    req.end();
  });
}

async function main() {
  const destPath = path.join(__dirname, "../data/destinations.csv");
  const destContent = fs.readFileSync(destPath, "utf8");
  const destData = parseCSV(destContent);
  const destHeaders = destData[0];
  const destRows = destData.slice(1);
  const destImgIdx = destHeaders.indexOf("image");
  const destNameIdx = destHeaders.indexOf("name");

  const villPath = path.join(__dirname, "../data/villages.csv");
  const villContent = fs.readFileSync(villPath, "utf8");
  const villData = parseCSV(villContent);
  const villHeaders = villData[0];
  const villRows = villData.slice(1);
  const villImgIdx = villHeaders.indexOf("image");
  const villNameIdx = villHeaders.indexOf("name");

  console.log("=== CHECKING DESTINATION IMAGES ===");
  for (let i = 0; i < destRows.length; i++) {
    const name = destRows[i][destNameIdx];
    const url = destRows[i][destImgIdx];
    const status = await checkUrl(url);
    console.log(`[Destination] ${name}: Status ${status} (${url})`);
    if (status === 404 && url.includes("wikimedia.org")) {
      const filename = extractFilename(url);
      if (filename) {
        const corrected = getCommonsUrl(filename);
        console.log(`  -> Corrected Candidate: ${corrected}`);
        const corrStatus = await checkUrl(corrected);
        console.log(`  -> Corrected Status: ${corrStatus}`);
      }
    }
  }

  console.log("\n=== CHECKING VILLAGE IMAGES ===");
  for (let i = 0; i < villRows.length; i++) {
    const name = villRows[i][villNameIdx];
    const url = villRows[i][villImgIdx];
    const status = await checkUrl(url);
    console.log(`[Village] ${name}: Status ${status} (${url})`);
    if (status === 404 && url.includes("wikimedia.org")) {
      const filename = extractFilename(url);
      if (filename) {
        const corrected = getCommonsUrl(filename);
        console.log(`  -> Corrected Candidate: ${corrected}`);
        const corrStatus = await checkUrl(corrected);
        console.log(`  -> Corrected Status: ${corrStatus}`);
      }
    }
  }
}

main().catch(console.error);
