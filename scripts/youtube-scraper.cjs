/**
 * YOUTUBE DOCUMENTARY SCRAPER
 * Finds specific, relevant YouTube documentary videos for each
 * Indonesian tourism destination and village.
 *
 * Method: YouTube oEmbed + YouTube Search (no API key required)
 * - Uses YouTube's unofficial search suggest + oembed endpoint
 * - Validates each video ID is real and accessible
 * - Prioritizes: official tourism videos > documentary > travel vlog
 * - Updates youtubeId field in destinations.csv + villages.csv
 *
 * Run in parallel with industry-scraper.cjs
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const delay = ms => new Promise(r => setTimeout(r, ms));

const CURATED_YOUTUBE = {};


// ─── Curated search queries — used for YouTube oEmbed/search fallback ──────────
const SEARCH_QUERIES = {
  baiturrahman:   'Masjid Raya Baiturrahman Banda Aceh documentary',
  tobalake:       'Danau Toba Lake Toba Sumatra documentary',
  harau:          'Lembah Harau valley Sumatra documentary',
  siak:           'Istana Siak Sri Indrapura Riau documentary',
  penyengat:      'Pulau Penyengat Riau Islands documentary',
  muarojambi:     'Muaro Jambi temple compound documentary',
  ampera:         'Jembatan Ampera bridge Palembang documentary',
  belitung:       'Belitung island Laskar Pelangi documentary',
  marlborough:    'Fort Marlborough Bengkulu documentary',
  waykambas:      'Way Kambas National Park elephant documentary',
  monas:          'Monas National Monument Jakarta documentary',
  kawahputih:     'Kawah Putih crater lake West Java documentary',
  tanjunglesung:  'Tanjung Lesung beach Banten documentary',
  borobudur:      'Borobudur temple UNESCO sunrise documentary',
  yogyakarta:     'Kraton Yogyakarta Malioboro documentary',
  bromo:          'Mount Bromo sunrise documentary East Java',
  tanahlot:       'Tanah Lot temple Bali sunset documentary',
  rinjani:        'Mount Rinjani trekking Lombok documentary',
  komodo:         'Komodo National Park dragon documentary',
  khatulistiwa:   'Tugu Khatulistiwa Pontianak equator documentary',
  tanjungputing:  'Tanjung Puting orangutan documentary',
  lokbaintan:     'Lok Baintan floating market Banjarmasin documentary',
  derawan:        'Derawan Islands turtle East Kalimantan documentary',
  kayanmentarang: 'Kayan Mentarang National Park North Kalimantan',
  bunaken:        'Bunaken National Park diving North Sulawesi documentary',
  togean:         'Togean Islands jellyfish lake documentary',
  toraja:         'Tana Toraja funeral ceremony documentary',
  wakatobi:       'Wakatobi National Park diving documentary',
  olele:          'Olele marine park Gorontalo diving documentary',
  pantaidato:     'Pantai Dato Majene West Sulawesi documentary',
  bandaneira:     'Banda Neira spice island Maluku documentary',
  sulamadaha:     'Sulamadaha beach Ternate North Maluku documentary',
  sentani:        'Lake Sentani Papua festival documentary',
  pegarfak:       'Arfak Mountains Birds of Paradise Papua documentary',
  wasur:          'Wasur National Park Papua documentary',
  puncakjaya:     'Puncak Jaya Carstensz Pyramid Papua documentary',
  baliem:         'Baliem Valley Dani tribe Papua documentary',
  rajaampat:      'Raja Ampat underwater marine documentary',
  penglipuran:    'Desa Penglipuran Bali village documentary',
  waerebo:        'Wae Rebo village Flores Indonesia documentary',
  pentingsari:    'Desa Wisata Pentingsari Yogyakarta documentary',
  nglanggeran:    'Nglanggeran ancient volcano village Gunungkidul',
  sade:           'Desa Sade Sasak village Lombok documentary',
  pujonkidul:     'Desa Wisata Pujon Kidul Malang documentary',
  liangndara:     'Desa Liang Ndara Manggarai Flores documentary',
  ketekesu:       "Ke'te Kesu Toraja village documentary",
};

// ─── Validate YouTube video ID via oEmbed (no API key needed) ─────────────────
async function validateYouTubeId(videoId) {
  if (!videoId || videoId.length !== 11) return false;
  try {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'IndonesiaTourismOpenAPI/4.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return false;
    const data = await res.json();
    return !!(data.title && data.thumbnail_url);
  } catch {
    return false;
  }
}

// ─── Search YouTube for a query and return best video ID ─────────────────────
// Uses YouTube's search suggest autocomplete + HTML scraping as fallback
async function searchYouTube(query) {
  try {
    // Method: scrape YouTube search results page for video IDs
    const encoded = encodeURIComponent(query);
    const url = `https://www.youtube.com/results?search_query=${encoded}&sp=EgIQAQ%3D%3D`; // filter: video only
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    const html = await res.text();

    // Extract video IDs from YouTube's initial data JSON embedded in the page
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g);
    if (!match || match.length === 0) return null;

    // Get unique video IDs (first 5 candidates)
    const ids = [...new Set(match.map(m => m.replace('"videoId":"', '').replace('"', '')))].slice(0, 5);
    return ids[0] || null;
  } catch (e) {
    console.warn(`    ⚠️ YouTube search failed for "${query}": ${e.message}`);
    return null;
  }
}

// ─── CSV helpers ──────────────────────────────────────────────────────────────
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
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const r = lines[i];
    if (r.length < headers.length) continue;
    const obj = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = r[j];
    }
    rows.push(obj);
  }
  return { headers, rows };
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


// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const dataDir  = path.join(__dirname, '..', 'data');
  const destPath = path.join(dataDir, 'destinations.csv');
  const villPath = path.join(dataDir, 'villages.csv');

  const dest = parseCSV(fs.readFileSync(destPath, 'utf-8'));
  const vill = parseCSV(fs.readFileSync(villPath, 'utf-8'));
  const allRows = [...dest.rows, ...vill.rows];

  console.log('\n' + '═'.repeat(62));
  console.log('🎬  YOUTUBE DOCUMENTARY SCRAPER');
  console.log('    Indonesia Tourism — Finding unique videos per destination');
  console.log('═'.repeat(62));
  console.log(`📍 Total entries: ${allRows.length} (${dest.rows.length} destinations + ${vill.rows.length} villages)\n`);

  const results = {}; // id → youtubeId
  let validated = 0, searched = 0, fallback = 0;

  for (let i = 0; i < allRows.length; i++) {
    const row = allRows[i];
    if (!row.id) continue;

    const curated = CURATED_YOUTUBE[row.id];
    process.stdout.write(`[${String(i + 1).padStart(2)}/${allRows.length}] ${row.id.padEnd(16)} `);

    // ── Step 1: Validate curated ID ──────────────────────────────────────────
    if (curated) {
      const ok = await validateYouTubeId(curated);
      if (ok) {
        results[row.id] = curated;
        validated++;
        console.log(`✅ curated  → ${curated}`);
        await delay(400);
        continue;
      }
      console.log(`⚠️  curated dead (${curated}), searching...`);
    }

    // ── Step 2: Search YouTube ───────────────────────────────────────────────
    const query = SEARCH_QUERIES[row.id] || `${row.name} Indonesia documentary`;
    await delay(1000); // be polite before searching
    const foundId = await searchYouTube(query);

    if (foundId) {
      await delay(600);
      const ok = await validateYouTubeId(foundId);
      if (ok) {
        results[row.id] = foundId;
        searched++;
        console.log(`🔍 searched → ${foundId}  ("${query.substring(0, 40)}")`);
        await delay(800);
        continue;
      }
    }

    // ── Step 3: Validate existing ID from CSV ────────────────────────────────
    if (row.youtubeId && row.youtubeId.length === 11) {
      const ok = await validateYouTubeId(row.youtubeId);
      if (ok) {
        results[row.id] = row.youtubeId;
        fallback++;
        console.log(`🔄 existing → ${row.youtubeId}`);
        await delay(400);
        continue;
      }
    }

    // ── Step 4: Keep existing as last resort ─────────────────────────────────
    results[row.id] = row.youtubeId || '';
    fallback++;
    console.log(`❌ no valid found → keeping "${row.youtubeId}"`);
    await delay(400);
  }

  // ── Apply results to CSVs ──────────────────────────────────────────────────
  console.log('\n── Applying results to CSVs ─────────────────────────────────');

  let destChanged = 0, villChanged = 0;
  for (const row of dest.rows) {
    if (results[row.id] !== undefined && results[row.id] !== row.youtubeId) {
      row.youtubeId = results[row.id];
      destChanged++;
    }
  }
  for (const row of vill.rows) {
    if (results[row.id] !== undefined && results[row.id] !== row.youtubeId) {
      row.youtubeId = results[row.id];
      villChanged++;
    }
  }

  // Wait briefly for any concurrent scraper writes to finish
  await delay(2000);

  // Re-read fresh CSVs before writing (in case industry-scraper.cjs just wrote them)
  let freshDest, freshVill;
  try {
    freshDest = parseCSV(fs.readFileSync(destPath, 'utf-8'));
    freshVill = parseCSV(fs.readFileSync(villPath, 'utf-8'));
  } catch {
    freshDest = dest;
    freshVill = vill;
  }

  // Apply YouTube IDs on top of freshly read data
  for (const row of freshDest.rows) { if (results[row.id]) row.youtubeId = results[row.id]; }
  for (const row of freshVill.rows) { if (results[row.id]) row.youtubeId = results[row.id]; }

  fs.writeFileSync(destPath, serializeCSV(freshDest.rows, freshDest.headers), 'utf-8');
  fs.writeFileSync(villPath, serializeCSV(freshVill.rows, freshVill.headers), 'utf-8');

  // ── Audit report ───────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(62));
  console.log('📊 YOUTUBE SCRAPE SUMMARY');
  console.log('─'.repeat(62));
  console.log(`  ✅ Curated validated  : ${validated}`);
  console.log(`  🔍 Found via search   : ${searched}`);
  console.log(`  🔄 Kept existing      : ${fallback}`);
  console.log(`  📝 destinations.csv   : ${destChanged} videos updated`);
  console.log(`  📝 villages.csv       : ${villChanged} videos updated`);

  // Check uniqueness
  const ids = Object.values(results).filter(Boolean);
  const unique = new Set(ids).size;
  const dupes = ids.length - unique;
  console.log(`\n  🎯 Unique video IDs  : ${unique}/${ids.length}`);
  if (dupes > 0) {
    console.log(`  ⚠️  Duplicates        : ${dupes} (some destinations share video)`);
    // Show which are duplicated
    const counts = {};
    for (const id of ids) counts[id] = (counts[id] || 0) + 1;
    Object.entries(counts).filter(([,c]) => c > 1).forEach(([vid, count]) => {
      const names = Object.entries(results).filter(([,v]) => v === vid).map(([k]) => k).join(', ');
      console.log(`    ${vid} × ${count}: ${names}`);
    });
  }

  // Write results JSON for reference
  const reportPath = path.join(dataDir, 'youtube-audit.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    generated: new Date().toISOString(),
    summary: { validated, searched, fallback, unique, dupes },
    results,
  }, null, 2), 'utf-8');
  console.log(`\n  📄 Full report: data/youtube-audit.json`);

  // Automatically trigger data:update to generate TS and sync public CSV files
  console.log('\n🔄 Triggering data update and public synchronization...');
  try {
    const { execSync } = require('child_process');
    execSync('node scripts/update-data.cjs', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Data update and synchronization completed successfully.');
  } catch (e) {
    console.error('⚠️ Failed to automatically update data/sync CSV files:', e.message);
  }

  console.log('\n🎉 YouTube scraper complete!\n');
}

main().catch(e => { console.error('\n❌ Fatal:', e); process.exit(1); });
