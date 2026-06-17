const fs = require("fs");
const path = require("path");

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

console.log("=== MEMULAI AUDIT BESAR-BESARAN GAMBAR PARIWISATA ===");

const destPath = path.join(__dirname, "../data/destinations.csv");
const destContent = fs.readFileSync(destPath, "utf8");
const destData = parseCSV(destContent);
const destHeaders = destData[0];
const destRows = destData.slice(1);

const destIdIdx = destHeaders.indexOf("id");
const destNameIdx = destHeaders.indexOf("name");
const destImgIdx = destHeaders.indexOf("image");

const destImages = new Map();
const destDuplicates = [];
const destEmpty = [];

destRows.forEach((row) => {
  const id = row[destIdIdx];
  const name = row[destNameIdx];
  const img = row[destImgIdx];

  if (!img) {
    destEmpty.push(`${name} (${id})`);
  } else {
    if (destImages.has(img)) {
      destDuplicates.push({
        img,
        items: [destImages.get(img), `${name} (${id})`]
      });
    } else {
      destImages.set(img, `${name} (${id})`);
    }
  }
});

console.log(`\n--- Destinasi Pariwisata (Total: ${destRows.length}) ---`);
console.log(`Gambar Kosong: ${destEmpty.length === 0 ? "Nihil (Semua ada gambarnya)" : destEmpty.join(", ")}`);
if (destDuplicates.length === 0) {
  console.log("✓ Sukses! Tidak ada duplikasi gambar di antara 38 destinasi.");
} else {
  console.log(`✗ Ditemukan ${destDuplicates.length} duplikasi gambar:`);
  destDuplicates.forEach((dup, idx) => {
    console.log(`  ${idx + 1}. URL: ${dup.img}`);
    console.log(`     Dipakai oleh: ${dup.items.join(" DAN ")}`);
  });
}

const villPath = path.join(__dirname, "../data/villages.csv");
const villContent = fs.readFileSync(villPath, "utf8");
const villData = parseCSV(villContent);
const villHeaders = villData[0];
const villRows = villData.slice(1);

const villIdIdx = villHeaders.indexOf("id");
const villNameIdx = villHeaders.indexOf("name");
const villImgIdx = villHeaders.indexOf("image");

const villImages = new Map();
const villDuplicates = [];
const villEmpty = [];

villRows.forEach((row) => {
  const id = row[villIdIdx];
  const name = row[villNameIdx];
  const img = row[villImgIdx];

  if (!img) {
    villEmpty.push(`${name} (${id})`);
  } else {
    if (villImages.has(img)) {
      villDuplicates.push({
        img,
        items: [villImages.get(img), `${name} (${id})`]
      });
    } else {
      villImages.set(img, `${name} (${id})`);
    }
  }
});

console.log(`\n--- Desa Wisata (Total: ${villRows.length}) ---`);
console.log(`Gambar Kosong: ${villEmpty.length === 0 ? "Nihil (Semua ada gambarnya)" : villEmpty.join(", ")}`);
if (villDuplicates.length === 0) {
  console.log("✓ Sukses! Tidak ada duplikasi gambar di antara 8 desa wisata.");
} else {
  console.log(`✗ Ditemukan ${villDuplicates.length} duplikasi gambar:`);
  villDuplicates.forEach((dup, idx) => {
    console.log(`  ${idx + 1}. URL: ${dup.img}`);
    console.log(`     Dipakai oleh: ${dup.items.join(" DAN ")}`);
  });
}

const crossDuplicates = [];
destImages.forEach((name, img) => {
  if (villImages.has(img)) {
    crossDuplicates.push({
      img,
      dest: name,
      vill: villImages.get(img)
    });
  }
});

console.log(`\n--- Audit Silang (Destinasi vs Desa Wisata) ---`);
if (crossDuplicates.length === 0) {
  console.log("✓ Sukses! Tidak ada gambar yang dipakai bersama antara Destinasi dan Desa Wisata.");
} else {
  console.log(`✗ Ditemukan ${crossDuplicates.length} gambar yang dipakai silang:`);
  crossDuplicates.forEach((dup, idx) => {
    console.log(`  ${idx + 1}. URL: ${dup.img}`);
    console.log(`     Dipakai oleh Destinasi: ${dup.dest}`);
    console.log(`     Dipakai oleh Desa Wisata: ${dup.vill}`);
  });
}

if (destEmpty.length > 0 || destDuplicates.length > 0 || villEmpty.length > 0 || villDuplicates.length > 0 || crossDuplicates.length > 0) {
  process.exit(1);
} else {
  console.log("\n⭐ AUDIT SEMPURNA! SELURUH GAMBAR UNIK, VALID, DAN TIDAK DUPLIKAT! ⭐");
}
