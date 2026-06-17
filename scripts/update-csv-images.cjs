const fs = require("fs");
const path = require("path");

const DEST_IMAGE_MAPPING = {
  "baiturrahman": "https://images.unsplash.com/photo-1590892225674-d4b9405ae979?auto=format&fit=crop&w=800&q=80",
  "tobalake": "https://images.unsplash.com/photo-1517088455888-7f55562776c5?auto=format&fit=crop&w=800&q=80",
  "harau": "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=80",
  "siak": "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?auto=format&fit=crop&w=800&q=80",
  "penyengat": "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&w=800&q=80",
  "muarojambi": "https://images.unsplash.com/photo-1608976693714-3a5f4c4a6a57?auto=format&fit=crop&w=800&q=80",
  "ampera": "https://images.unsplash.com/photo-1619864223274-13e61a6c76db?auto=format&fit=crop&w=800&q=80",
  "belitung": "https://images.unsplash.com/photo-1602058097931-155fa879555c?auto=format&fit=crop&w=800&q=80",
  "marlborough": "https://images.unsplash.com/photo-1601662539747-21fc39ed092b?auto=format&fit=crop&w=800&q=80",
  "waykambas": "https://images.unsplash.com/photo-1581852013749-11910d65b1cc?auto=format&fit=crop&w=800&q=80",
  "monas": "https://images.unsplash.com/photo-1616499370260-48573ecc569c?auto=format&fit=crop&w=800&q=80",
  "kawahputih": "https://images.unsplash.com/photo-1596328320490-67c87c943ad6?auto=format&fit=crop&w=800&q=80",
  "tanjunglesung": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  "borobudur": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
  "yogyakarta": "https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=800&q=80",
  "bromo": "https://images.unsplash.com/photo-1588668214407-6eb9527032d6?auto=format&fit=crop&w=800&q=80",
  "tanahlot": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  "rinjani": "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80",
  "komodo": "https://images.unsplash.com/photo-1603566580665-27a3c5717b38?auto=format&fit=crop&w=800&q=80",
  "khatulistiwa": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  "tanjungputing": "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
  "lokbaintan": "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80",
  "derawan": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
  "kayanmentarang": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
  "bunaken": "https://images.unsplash.com/photo-1682687220063-4742bd7fd53c?auto=format&fit=crop&w=800&q=80",
  "togean": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
  "toraja": "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80",
  "wakatobi": "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=800&q=80",
  "olele": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  "pantaidato": "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  "bandaneira": "https://images.unsplash.com/photo-1607335614551-3062bf90f30e?auto=format&fit=crop&w=800&q=80",
  "sulamadaha": "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
  "sentani": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
  "pegarfak": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  "wasur": "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
  "puncakjaya": "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80",
  "baliem": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
  "rajaampat": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=800&q=80"
};

const VILL_IMAGE_MAPPING = {
  "penglipuran": "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
  "waerebo": "https://images.unsplash.com/photo-1601824907956-2ad2bd6c9a17?auto=format&fit=crop&w=800&q=80",
  "pentingsari": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
  "nglanggeran": "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=800&q=80",
  "sade": "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=800&q=80",
  "pujonkidul": "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
  "liangndara": "https://images.unsplash.com/photo-1580927751497-6a18b1ccf705?auto=format&fit=crop&w=800&q=80",
  "ketekesu": "https://images.unsplash.com/photo-1540801977931-6541063097e7?auto=format&fit=crop&w=800&q=80"
};

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
    if (val.includes(",") || val.includes("\n") || val.includes("\r") || val.includes('"')) {
      return `"${val.replace(/"/g, '""')}"`;
    }
    return val;
  };
  
  const headerLine = headers.map(formatCell).join(",");
  const rowLines = rows.map(r => r.map(formatCell).join(","));
  return [headerLine, ...rowLines].join("\n") + "\n";
}

function updateDestinations() {
  const filePath = path.join(__dirname, "../data/destinations.csv");
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseCSV(content);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  const idIdx = headers.indexOf("id");
  const imgIdx = headers.indexOf("image");
  const galIdx = headers.indexOf("gallery");

  const updatedRows = rows.map((row) => {
    const id = row[idIdx];
    if (DEST_IMAGE_MAPPING[id]) {
      row[imgIdx] = DEST_IMAGE_MAPPING[id];
      // Also update gallery to match the new image or be a related set (main image + secondary)
      row[galIdx] = `${DEST_IMAGE_MAPPING[id]};${DEST_IMAGE_MAPPING[id]}`;
    }
    return row;
  });

  const updatedContent = stringifyCSV(headers, updatedRows);
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log("Updated destinations.csv images successfully.");
}

function updateVillages() {
  const filePath = path.join(__dirname, "../data/villages.csv");
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseCSV(content);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  const idIdx = headers.indexOf("id");
  const imgIdx = headers.indexOf("image");

  const updatedRows = rows.map((row) => {
    const id = row[idIdx];
    if (VILL_IMAGE_MAPPING[id]) {
      row[imgIdx] = VILL_IMAGE_MAPPING[id];
    }
    return row;
  });

  const updatedContent = stringifyCSV(headers, updatedRows);
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log("Updated villages.csv images successfully.");
}

updateDestinations();
updateVillages();
