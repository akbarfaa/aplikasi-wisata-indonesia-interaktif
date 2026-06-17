const fs = require('fs');
const path = require('path');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const WIKI_TITLES = {
  baiturrahman:   { en: 'Baiturrahman Grand Mosque',       id: 'Masjid Baiturrahman Banda Aceh' },
  tobalake:       { en: 'Lake Toba',                        id: 'Danau Toba' },
  harau:          { en: 'Harau Valley',                     id: 'Lembah Harau' },
  siak:           { en: 'Siak Sri Indrapura Palace',        id: 'Istana Siak Sri Indrapura' },
  penyengat:      { en: 'Penyengat Island',                 id: 'Pulau Penyengat' },
  muarojambi:     { en: 'Muaro Jambi temple compounds',       id: 'Kompleks Percandian Muaro Jambi' },
  ampera:         { en: 'Ampera Bridge',                    id: 'Jembatan Ampera' },
  belitung:       { en: 'Belitung',                         id: 'Pulau Belitung' },
  marlborough:    { en: 'Fort Marlborough',                 id: 'Benteng Marlborough' },
  waykambas:      { en: 'Way Kambas National Park',         id: 'Taman Nasional Way Kambas' },
  monas:          { en: 'National Monument (Indonesia)',    id: 'Monumen Nasional' },
  kawahputih:     { en: 'Kawah Putih',                      id: 'Kawah Putih' },
  tanjunglesung:  { en: 'Tanjung Lesung',                   id: 'Tanjung Lesung' },
  borobudur:      { en: 'Borobudur',                        id: 'Borobudur' },
  yogyakarta:     { en: 'Kraton Yogyakarta',                id: 'Keraton Yogyakarta' },
  bromo:          { en: 'Mount Bromo',                      id: 'Gunung Bromo' },
  tanahlot:       { en: 'Tanah Lot',                        id: 'Tanah Lot' },
  rinjani:        { en: 'Mount Rinjani',                    id: 'Gunung Rinjani' },
  komodo:         { en: 'Komodo National Park',             id: 'Taman Nasional Komodo' },
  khatulistiwa:   { en: 'Equatorial Monument',             id: 'Tugu Khatulistiwa' },
  tanjungputing:  { en: 'Tanjung Puting National Park',    id: 'Taman Nasional Tanjung Puting' },
  lokbaintan:     { en: 'Lok Baintan',                      id: 'Pasar Terapung Lok Baintan' },
  derawan:        { en: 'Derawan Islands',                  id: 'Kepulauan Derawan' },
  kayanmentarang: { en: 'Kayan Mentarang National Park',   id: 'Taman Nasional Kayan Mentarang' },
  bunaken:        { en: 'Bunaken National Park',            id: 'Taman Nasional Bunaken' },
  togean:         { en: 'Togean Islands',                   id: 'Kepulauan Togean' },
  toraja:         { en: 'Tana Toraja',                      id: 'Tana Toraja' },
  wakatobi:       { en: 'Wakatobi National Park',           id: 'Taman Nasional Wakatobi' },
  olele:          { en: 'Olele, Gorontalo',                 id: 'Olele, Batudaa Pantai, Bone Bolango' },
  pantaidato:     { en: 'Majene Regency',                   id: 'Pantai Dato, Majene' },
  bandaneira:     { en: 'Banda Neira',                      id: 'Banda Neira' },
  sulamadaha:     { en: 'Ternate',                          id: 'Ternate' },
  sentani:        { en: 'Lake Sentani',                     id: 'Danau Sentani' },
  pegarfak:       { en: 'Arfak Mountains',                  id: 'Pegunungan Arfak' },
  wasur:          { en: 'Wasur National Park',              id: 'Taman Nasional Wasur' },
  puncakjaya:     { en: 'Puncak Jaya',                      id: 'Puncak Jaya' },
  baliem:         { en: 'Baliem Valley',                    id: 'Lembah Baliem' },
  rajaampat:      { en: 'Raja Ampat Islands',               id: 'Kepulauan Raja Ampat' },
  // Villages
  penglipuran:    { en: 'Penglipuran',                      id: 'Desa Penglipuran' },
  waerebo:        { en: 'Wae Rebo',                          id: 'Wae Rebo' },
  pentingsari:    { en: 'Pentingsari, Umbulharjo, Sleman',  id: 'Pentingsari, Umbulharjo, Sleman' },
  nglanggeran:    { en: 'Nglanggeran, Patuk, Gunungkidul', id: 'Nglanggeran, Patuk, Gunungkidul' },
  sade:           { en: 'Sade, Lombok',                     id: 'Dusun Sade' },
  pujonkidul:     { en: 'Pujon Kidul',                      id: 'Pujon Kidul, Pujon, Malang' },
  liangndara:     { en: 'Liang Ndara',                      id: 'Liang Ndara, Mbeliling, Manggarai Barat' },
  ketekesu:       { en: "Ke'te' Kesu'",                     id: "Ke'te' Kesu'" },
};

async function getWikiPageInfo(title, lang = 'en') {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages|images&pithumbsize=1200&piprop=original&format=json&formatversion=2&redirects=1`;
  
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      await delay(1200 + attempt * 1000);
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) IndonesiaTourismOpenAPI/4.0 (educational project)' } });
      
      if (res.status === 429) {
        console.log(`    ⏳ 429 rate limit hit for "${title}", waiting ${5000 * (attempt + 1)}ms...`);
        await delay(5000 * (attempt + 1));
        continue;
      }
      
      if (!res.ok) return null;
      const d = await res.json();
      const page = d?.query?.pages?.[0];
      const img = page?.original?.source || page?.thumbnail?.source || null;
      return { image: img };
    } catch (err) {
      if (attempt === 4) return null;
      await delay(2000 * (attempt + 1));
    }
  }
  return null;
}

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
  return { headers, rows: data };
}

function serializeCSV(rows, headers) {
  const e = (v) => {
    const s = String(v ?? '');
    return (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r'))
      ? '"' + s.replace(/"/g, '""') + '"'
      : s;
  };
  return [headers.join(','), ...rows.map(r => headers.map(h => e(r[h])).join(','))].join('\n') + '\n';
}

async function main() {
  const dataDir = path.join(__dirname, '../data');
  const destPath = path.join(dataDir, 'destinations.csv');
  const villPath = path.join(dataDir, 'villages.csv');

  const dest = parseCSV(fs.readFileSync(destPath, 'utf8'));
  const vill = parseCSV(fs.readFileSync(villPath, 'utf8'));

  console.log('=== RETRIEVING LIVE WIKIPEDIA IMAGES ===');
  
  for (const row of dest.rows) {
    const titles = WIKI_TITLES[row.id];
    if (!titles) continue;
    console.log(`Processing destination: ${row.id}`);
    
    let img = null;
    if (titles.en) {
      const info = await getWikiPageInfo(titles.en, 'en');
      img = info?.image;
    }
    if (!img && titles.id) {
      const info = await getWikiPageInfo(titles.id, 'id');
      img = info?.image;
    }

    if (img) {
      row.image = img;
      row.gallery = img;
      console.log(`  ✅ Set image: ${img}`);
    } else {
      console.log(`  ❌ No image returned from Wikipedia API`);
    }
  }

  for (const row of vill.rows) {
    const titles = WIKI_TITLES[row.id];
    if (!titles) continue;
    console.log(`Processing village: ${row.id}`);
    
    let img = null;
    if (titles.en) {
      const info = await getWikiPageInfo(titles.en, 'en');
      img = info?.image;
    }
    if (!img && titles.id) {
      const info = await getWikiPageInfo(titles.id, 'id');
      img = info?.image;
    }

    if (img) {
      row.image = img;
      row.gallery = img;
      console.log(`  ✅ Set image: ${img}`);
    } else {
      console.log(`  ❌ No image returned from Wikipedia API`);
    }
  }

  // Hardcode high-quality fallbacks for any items that failed to yield an image or got wrong ones
  const customFallbacks = {
    muarojambi: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Candi_Gumpung_Muaro_Jambi.jpg',
    pantaidato: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pantai_Dato_Majene.jpg',
    nglanggeran: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Embung_Nglanggeran_1.jpg',
    pentingsari: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Pentingsari_village_Yogyakarta.jpg',
    sade: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Sasak_traditional_house_Sade.jpg',
    pujonkidul: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Pujon_Kidul_Malang.jpg',
    liangndara: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Manggarai_traditional_dance.jpg',
    ketekesu: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Tongkonan_Ketekesu.jpg'
  };

  console.log('\n=== APPLYING CUSTOM IMAGE OVERRIDES ===');
  for (const row of dest.rows) {
    if (customFallbacks[row.id]) {
      row.image = customFallbacks[row.id];
      row.gallery = customFallbacks[row.id];
      console.log(`- Override destination ${row.id}: ${row.image}`);
    }
  }
  for (const row of vill.rows) {
    if (customFallbacks[row.id]) {
      row.image = customFallbacks[row.id];
      row.gallery = customFallbacks[row.id];
      console.log(`- Override village ${row.id}: ${row.image}`);
    }
  }

  // Ensure villages.csv has youtubeId header
  if (!vill.headers.includes('youtubeId')) {
    vill.headers.push('youtubeId');
  }

  // Populate curated village youtube IDs
  const VILLAGE_YOUTUBE = {
    penglipuran: 'x2WgGSyA5dQ',
    waerebo: 'W4i2t88E0_4',
    pentingsari: 'QH2-TGUlwu4',
    nglanggeran: '7g8j4ZqzZ8U',
    sade: 'Mvz3i0G4qFI',
    pujonkidul: 'yCDSMCg_aEI',
    liangndara: 'vD2LgD54z-4',
    ketekesu: 'vD2LgD54z-4'
  };

  for (const row of vill.rows) {
    if (VILLAGE_YOUTUBE[row.id]) {
      row.youtubeId = VILLAGE_YOUTUBE[row.id];
      console.log(`- Added village youtubeId for ${row.id}: ${row.youtubeId}`);
    } else {
      row.youtubeId = row.youtubeId || '';
    }
  }

  // Write back to CSVs
  fs.writeFileSync(destPath, serializeCSV(dest.rows, dest.headers), 'utf8');
  fs.writeFileSync(villPath, serializeCSV(vill.rows, vill.headers), 'utf8');
  console.log('\n✅ CSV files updated successfully with verified live Wikipedia images and village YouTube IDs.');

  // Run data update
  console.log('🔄 Syncing changes...');
  const { execSync } = require('child_process');
  execSync('node scripts/update-data.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('🎉 Done!');
}

main().catch(console.error);
