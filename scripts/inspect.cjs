const fs = require("fs");
const path = require("path");

// Official list of 38 provinces in Indonesia
const OFFICIAL_PROVINCES = [
  "Aceh", "North Sumatra", "West Sumatra", "Riau", "Riau Islands", "Jambi", 
  "South Sumatra", "Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta", 
  "West Java", "Banten", "Central Java", "DI Yogyakarta", "East Java", 
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "West Kalimantan", 
  "Central Kalimantan", "South Kalimantan", "East Kalimantan", "North Kalimantan", 
  "North Sulawesi", "Central Sulawesi", "South Sulawesi", "Southeast Sulawesi", 
  "Gorontalo", "West Sulawesi", "Maluku", "North Maluku", "Papua", 
  "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
];

const content = fs.readFileSync(path.join(__dirname, "../src/lib/data.ts"), "utf8");

// Extract the destinations array JSON string
const startIdx = content.indexOf("export const destinations: Destination[] = ");
if (startIdx === -1) {
  console.error("Error: Could not find destinations array in data.ts");
  process.exit(1);
}

const remaining = content.slice(startIdx + "export const destinations: Destination[] = ".length);
const endIdx = remaining.indexOf(";\n\nexport interface Village");
if (endIdx === -1) {
  console.error("Error: Could not find end of destinations array in data.ts");
  process.exit(1);
}

const jsonStr = remaining.slice(0, endIdx);
let destinations = [];
try {
  destinations = JSON.parse(jsonStr);
} catch (err) {
  console.error("Error parsing destinations JSON:", err);
  process.exit(1);
}

console.log("=== AUDIT LAPORAN DATA PARIWISATA ===");
console.log(`Total Destinasi Terdaftar: ${destinations.length}`);

const representedProvinces = new Set();
const invalidCoords = [];
const invalidCategories = [];
const VALID_CATEGORIES = ["village", "beach", "mountain", "volcano", "ecotourism", "heritage", "culture", "marine", "park"];

destinations.forEach((d) => {
  representedProvinces.add(d.region);

  // Check coordinates
  if (!Array.isArray(d.coords) || d.coords.length !== 2 || isNaN(d.coords[0]) || isNaN(d.coords[1])) {
    invalidCoords.push(d.name);
  }

  // Check categories
  if (!VALID_CATEGORIES.includes(d.category)) {
    invalidCategories.push(`${d.name} (${d.category})`);
  }
});

console.log("\n--- Validasi Data ---");
console.log(`Koordinat Tidak Valid: ${invalidCoords.length === 0 ? "Tidak ada (Semua Valid)" : invalidCoords.join(", ")}`);
console.log(`Kategori Tidak Valid: ${invalidCategories.length === 0 ? "Tidak ada (Semua Valid)" : invalidCategories.join(", ")}`);

console.log("\n--- Pemeriksaan Keterwakilan 38 Provinsi ---");
const missing = [];
OFFICIAL_PROVINCES.forEach((prov) => {
  if (!representedProvinces.has(prov)) {
    missing.push(prov);
  }
});

if (missing.length === 0) {
  console.log("✓ LUAR BIASA! Semua 38 provinsi di Indonesia telah memiliki minimal 1 destinasi wisata terdaftar.");
} else {
  console.log(`✗ Masih ada ${missing.length} provinsi yang belum terdaftar:`);
  missing.forEach((prov, idx) => console.log(`  ${idx + 1}. ${prov}`));
}
