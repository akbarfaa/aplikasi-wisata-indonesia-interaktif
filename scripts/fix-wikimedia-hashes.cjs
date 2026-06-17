const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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
        row.push(cell);
        cell = "";
      } else if (char === "\r" || char === "\n") {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        row.push(cell);
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
    row.push(cell);
    lines.push(row);
  }
  return lines;
}

function stringifyCSV(headers, rows) {
  const formatCell = (val) => {
    if (!val) return "";
    const s = String(val);
    if (s.includes(",") || s.includes("\n") || s.includes("\r") || s.includes('"')) {
      return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
  };
  
  const headerLine = headers.map(formatCell).join(",");
  const rowLines = rows.map(r => r.map(formatCell).join(","));
  return [headerLine, ...rowLines].join("\n") + "\n";
}

function getCommonsUrl(filename) {
  const cleanName = filename.replace(/ /g, '_');
  const hash = crypto.createHash('md5').update(cleanName).digest('hex');
  return `https://upload.wikimedia.org/wikipedia/commons/${hash[0]}/${hash.substring(0, 2)}/${encodeURIComponent(cleanName)}`;
}

function correctWikiUrl(url) {
  if (!url.includes("upload.wikimedia.org/wikipedia/commons/")) return url;
  
  // Extract the filename portion after the last slash
  const parts = url.split("/");
  let filename = parts[parts.length - 1];
  
  // Clean up %20 or spaces if any
  filename = decodeURIComponent(filename);
  
  const corrected = getCommonsUrl(filename);
  return corrected;
}

function processFile(filePath) {
  console.log(`Processing file: ${filePath}`);
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseCSV(content);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  const imgIdx = headers.indexOf("image");
  const galIdx = headers.indexOf("gallery");

  let correctedCount = 0;

  const updatedRows = rows.map((row) => {
    if (imgIdx !== -1 && row[imgIdx]) {
      const original = row[imgIdx];
      const corrected = correctWikiUrl(original);
      if (original !== corrected) {
        row[imgIdx] = corrected;
        correctedCount++;
        console.log(`  [Image] Updated:`);
        console.log(`    From: ${original}`);
        console.log(`    To:   ${corrected}`);
      }
    }

    if (galIdx !== -1 && row[galIdx]) {
      const originalGal = row[galIdx];
      const galParts = originalGal.split(";");
      const correctedParts = galParts.map(url => correctWikiUrl(url.trim()));
      const correctedGal = correctedParts.join(";");
      if (originalGal !== correctedGal) {
        row[galIdx] = correctedGal;
        correctedCount++;
        console.log(`  [Gallery] Updated:`);
        console.log(`    From: ${originalGal}`);
        console.log(`    To:   ${correctedGal}`);
      }
    }

    return row;
  });

  if (correctedCount > 0) {
    const updatedContent = stringifyCSV(headers, updatedRows);
    fs.writeFileSync(filePath, updatedContent, "utf8");
    console.log(`Finished: Updated ${correctedCount} URLs in ${filePath}.\n`);
  } else {
    console.log(`Finished: No incorrect Wikipedia URLs found in ${filePath}.\n`);
  }
}

function main() {
  const destPath = path.join(__dirname, "../data/destinations.csv");
  const villPath = path.join(__dirname, "../data/villages.csv");

  processFile(destPath);
  processFile(villPath);

  console.log("=== Running update-data.cjs to sync changes ===");
  try {
    const { execSync } = require('child_process');
    execSync('node scripts/update-data.cjs', { stdio: 'inherit', cwd: path.dirname(__dirname) });
    console.log("Sync complete!");
  } catch (e) {
    console.error("Failed to sync updated CSVs:", e.message);
  }
}

main();
