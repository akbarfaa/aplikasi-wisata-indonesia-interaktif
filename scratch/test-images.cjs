const fs = require('fs');
const path = require('path');

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
          i++; // skip next char
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
          i++; // skip \n
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

  const headers = lines[0];
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const r = lines[i];
    if (r.length < headers.length) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = r[j];
    }
    data.push(obj);
  }
  return data;
}

async function testUrl(url) {
  if (!url || !url.startsWith('http')) return { ok: false, status: 'Invalid URL' };
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: AbortSignal.timeout(5000)
    });
    return { ok: res.ok, status: res.status, contentType: res.headers.get('content-type') };
  } catch (err) {
    return { ok: false, status: err.message };
  }
}

async function main() {
  const dataDir = path.join(__dirname, '../data');
  const dests = parseCSV(fs.readFileSync(path.join(dataDir, 'destinations.csv'), 'utf8'));
  const vills = parseCSV(fs.readFileSync(path.join(dataDir, 'villages.csv'), 'utf8'));

  console.log('=== TESTING DESTINATION IMAGES ===');
  for (const d of dests) {
    const res = await testUrl(d.image);
    console.log(`- ${d.id.padEnd(16)}: ${res.ok ? '✅' : '❌'} status=${res.status} type=${res.contentType || 'N/A'} url=${d.image}`);
  }

  console.log('\n=== TESTING VILLAGE IMAGES ===');
  for (const v of vills) {
    const res = await testUrl(v.image);
    console.log(`- ${v.id.padEnd(16)}: ${res.ok ? '✅' : '❌'} status=${res.status} type=${res.contentType || 'N/A'} url=${v.image}`);
  }
}

main().catch(console.error);
