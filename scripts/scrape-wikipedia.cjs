const fs = require("fs");
const path = require("path");

const DEST_WIKI_MAPPING = {
  "baiturrahman": { en: "Baiturrahman_Grand_Mosque", id: "Masjid_Raya_Baiturrahman" },
  "tobalake": { en: "Lake_Toba", id: "Danau_Toba" },
  "harau": { en: "Harau_Valley", id: "Lembah_Harau" },
  "siak": { en: "Siak_Palace", id: "Istana_Siak_Sri_Indrapura" },
  "penyengat": { en: "Penyengat_Island", id: "Pulau_Penyengat" },
  "muarojambi": { en: "Muaro_Jambi_Temple_Compounds", id: "Situs_Purbakala_Muaro_Jambi" },
  "ampera": { en: "Ampera_Bridge", id: "Jembatan_Ampera" },
  "belitung": { en: "Belitung", id: "Pantai_Tanjung_Tinggi" },
  "marlborough": { en: "Fort_Marlborough", id: "Benteng_Marlborough" },
  "waykambas": { en: "Way_Kambas_National_Park", id: "Taman_Nasional_Way_Kambas" },
  "monas": { en: "National_Monument_(Indonesia)", id: "Monumen_Nasional" },
  "kawahputih": { en: "Kawah_Putih", id: "Kawah_Putih" },
  "tanjunglesung": { en: "Tanjung_Lesung", id: "Tanjung_Lesung" },
  "borobudur": { en: "Borobudur", id: "Borobudur" },
  "yogyakarta": { en: "Kraton_Ngayogyakarta_Hadiningrat", id: "Keraton_Ngayogyakarta_Hadiningrat" },
  "bromo": { en: "Mount_Bromo", id: "Gunung_Bromo" },
  "tanahlot": { en: "Tanah_Lot", id: "Tanah_Lot" },
  "rinjani": { en: "Mount_Rinjani", id: "Gunung_Rinjani" },
  "komodo": { en: "Komodo_National_Park", id: "Taman_Nasional_Komodo" },
  "khatulistiwa": { en: "Equator_Monument", id: "Tugu_Khatulistiwa" },
  "tanjungputing": { en: "Tanjung_Puting_National_Park", id: "Taman_Nasional_Tanjung_Puting" },
  "lokbaintan": { en: "Lok_Baintan_Floating_Market", id: "Pasar_Terapung_Lok_Baintan" },
  "derawan": { en: "Derawan_Islands", id: "Kepulauan_Derawan" },
  "kayanmentarang": { en: "Kayan_Mentarang_National_Park", id: "Taman_Nasional_Kayan_Mentarang" },
  "bunaken": { en: "Bunaken_National_Marine_Park", id: "Taman_Nasional_Bunaken" },
  "togean": { en: "Togean_Islands", id: "Kepulauan_Togean" },
  "toraja": { en: "Tana_Toraja_Regency", id: "Kabupaten_Tana_Toraja" },
  "wakatobi": { en: "Wakatobi_National_Park", id: "Taman_Nasional_Wakatobi" },
  "olele": { en: "Tomini_Gulf", id: "Taman_Laut_Olele" },
  "pantaidato": { en: "Majene_Regency", id: "Pantai_Dato" },
  "bandaneira": { en: "Banda_Neira", id: "Banda_Neira" },
  "sulamadaha": { en: "Ternate", id: "Pantai_Sulamadaha" },
  "sentani": { en: "Lake_Sentani", id: "Danau_Sentani" },
  "pegarfak": { en: "Arfak_Mountains", id: "Pegunungan_Arfak" },
  "wasur": { en: "Wasur_National_Park", id: "Taman_Nasional_Wasur" },
  "puncakjaya": { en: "Puncak_Jaya", id: "Puncak_Jaya" },
  "baliem": { en: "Baliem_Valley", id: "Lembah_Baliem" },
  "rajaampat": { en: "Raja_Ampat_Islands", id: "Kepulauan_Raja_Ampat" }
};

const VILL_WIKI_MAPPING = {
  "penglipuran": { en: "Penglipuran_Village", id: "Penglipuran" },
  "waerebo": { en: "Flores", id: "Wae_Rebo" },
  "pentingsari": { en: "Sleman_Regency", id: "Pentingsari" },
  "nglanggeran": { en: "Nglanggeran", id: "Gunung_Api_Purba_Nglanggeran" },
  "sade": { en: "Lombok", id: "Desa_Sade" },
  "pujonkidul": { en: "Malang_Regency", id: "Pujon_Kidul,_Pujon,_Malang" },
  "liangndara": { en: "Flores", id: "Liang_Ndara,_Mbeliling,_Manggarai_Barat" },
  "ketekesu": { en: "Tana_Toraja_Regency", id: "Ke'te'_Kesu'" }
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

async function fetchWikiSummary(title, lang = "en") {
  if (!title) return null;
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Error fetching wiki for ${title} (${lang}):`, err.message);
    return null;
  }
}

async function scrapeDestinations() {
  const filePath = path.join(__dirname, "../data/destinations.csv");
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseCSV(content);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  const idIdx = headers.indexOf("id");
  const imgIdx = headers.indexOf("image");
  const galIdx = headers.indexOf("gallery");
  const sumEnIdx = headers.indexOf("summary_en");
  const sumIdIdx = headers.indexOf("summary_id");
  const descEnIdx = headers.indexOf("description_en");
  const descIdIdx = headers.indexOf("description_id");

  const updatedRows = [];
  for (const row of rows) {
    const id = row[idIdx];
    const wikiMap = DEST_WIKI_MAPPING[id];

    if (wikiMap) {
      console.log(`Scraping Wikipedia for destination: ${id}...`);
      const [wikiEn, wikiId] = await Promise.all([
        fetchWikiSummary(wikiMap.en, "en"),
        fetchWikiSummary(wikiMap.id, "id")
      ]);

      // Update descriptions and summaries if available
      if (wikiEn) {
        if (wikiEn.extract) {
          // clean extract text to prevent quote or formatting corruption
          const cleanExtract = wikiEn.extract.replace(/\n/g, " ").trim();
          row[descEnIdx] = cleanExtract;
          row[sumEnIdx] = wikiEn.description || cleanExtract.split(".")[0] + ".";
        }
        if (wikiEn.originalimage && wikiEn.originalimage.source) {
          const originalImg = wikiEn.originalimage.source;
          const currentUnsplash = row[imgIdx];
          row[imgIdx] = originalImg;
          row[galIdx] = `${originalImg};${currentUnsplash}`;
        }
      }

      if (wikiId) {
        if (wikiId.extract) {
          const cleanExtract = wikiId.extract.replace(/\n/g, " ").trim();
          row[descIdIdx] = cleanExtract;
          row[sumIdIdx] = wikiId.description || cleanExtract.split(".")[0] + ".";
        }
      }
    }
    updatedRows.push(row);
  }

  const updatedContent = stringifyCSV(headers, updatedRows);
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log("Updated destinations.csv from Wikipedia successfully.");
}

async function scrapeVillages() {
  const filePath = path.join(__dirname, "../data/villages.csv");
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = parseCSV(content);
  const headers = parsed[0];
  const rows = parsed.slice(1);

  const idIdx = headers.indexOf("id");
  const imgIdx = headers.indexOf("image");
  const aboutEnIdx = headers.indexOf("about_en");
  const aboutIdIdx = headers.indexOf("about_id");

  const updatedRows = [];
  for (const row of rows) {
    const id = row[idIdx];
    const wikiMap = VILL_WIKI_MAPPING[id];

    if (wikiMap) {
      console.log(`Scraping Wikipedia for village: ${id}...`);
      const [wikiEn, wikiId] = await Promise.all([
        fetchWikiSummary(wikiMap.en, "en"),
        fetchWikiSummary(wikiMap.id, "id")
      ]);

      if (wikiEn) {
        if (wikiEn.extract) {
          row[aboutEnIdx] = wikiEn.extract.replace(/\n/g, " ").trim();
        }
        // If it's a specific page (not general fallback), use its image
        if (wikiMap.en !== "Flores" && wikiMap.en !== "Lombok" && wikiMap.en !== "Malang_Regency" && wikiEn.originalimage && wikiEn.originalimage.source) {
          row[imgIdx] = wikiEn.originalimage.source;
        }
      }

      if (wikiId) {
        if (wikiId.extract) {
          row[aboutIdIdx] = wikiId.extract.replace(/\n/g, " ").trim();
        }
      }
    }
    updatedRows.push(row);
  }

  const updatedContent = stringifyCSV(headers, updatedRows);
  fs.writeFileSync(filePath, updatedContent, "utf8");
  console.log("Updated villages.csv from Wikipedia successfully.");
}

async function main() {
  await scrapeDestinations();
  await scrapeVillages();
  console.log("Scraping completed!");
}

main();
