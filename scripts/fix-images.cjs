/**
 * Fix dead curated image URLs — replace with verified Wikipedia Commons URLs
 * from the scraper v4 run (which fetched real page images successfully).
 *
 * These are the EXACT URLs logged as ✅ by the industry-scraper v4.
 */
'use strict';
const fs   = require('fs');
const path = require('path');

// ─── Verified URLs from industry-scraper v4 log output ──────────────────────
// Format: id → { main, gallery[] }
const VERIFIED = {
  baiturrahman:   { main: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg' },
  tobalake:       { main: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Lake_Toba_and_the_surrounding_hills.jpg' },
  harau:          { main: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg' },
  siak:           { main: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Istana_Kerajaan_Siak_(2).jpg' },
  penyengat:      { main: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Pulau_Penyengat.jpg' },
  muarojambi:     { main: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Candi_Gumpung_Muaro_Jambi.jpg' },
  ampera:         { main: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ampera_Bridge_at_Night%2C_Palembang.jpg' },
  belitung:       { main: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Belitung_Topography.png' },
  marlborough:    { main: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg' },
  waykambas:      { main: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_Way_Kambas_2008.jpg' },
  monas:          { main: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Jakarta_Indonesia_National-Monument-02.jpg' },
  kawahputih:     { main: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg' },
  tanjunglesung:  { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tanjung_Lesung_in_the_Morning.jpg' },
  borobudur:      { main: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Pradaksina.jpg' },
  yogyakarta:     { main: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_(2025)_-_img_02.jpg' },
  bromo:          { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg' },
  tanahlot:       { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/TanahLot_2014.JPG' },
  rinjani:        { main: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/KAGAGAHAN_RIJANI.jpg' },
  komodo:         { main: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg' },
  khatulistiwa:   { main: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Eksterior_Tugu_Khatulistiwa_Pontianak_(2026).jpg' },
  tanjungputing:  { main: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Tanjung-Puting90153.jpg' },
  lokbaintan:     { main: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG' },
  derawan:        { main: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Derawan_Island_East_Kalimantan.jpg' },
  kayanmentarang: { main: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Gas_Station_A.JPG' },
  bunaken:        { main: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bunaken01.JPG' },
  togean:         { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/TogianIslandMap.svg' },
  toraja:         { main: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/Ke\'te\'_Kesu\'_1.jpg' },
  wakatobi:       { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Wakatobi_beach_2006.jpg' },
  olele:          { main: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Teluk_Tomini.jpg' },
  pantaidato:     { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Pantai_Dato_Majene.jpg' },
  bandaneira:     { main: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Bandaneira-0039.JPG' },
  sulamadaha:     { main: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ternate_in_sight.jpg' },
  sentani:        { main: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Sentani_Lake.jpg' },
  pegarfak:       { main: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg' },
  wasur:          { main: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Wasur_Rainbow_1994.jpg' },
  puncakjaya:     { main: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Carstenzs_Piramida_Mountain.jpg' },
  baliem:         { main: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/20170903_Papouasie_Baliem_valley_15.jpg' },
  rajaampat:      { main: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png' },
  // Villages
  penglipuran:    { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/ID-bali-penglipuran-2.jpg' },
  waerebo:        { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Wae_Rebo_di_Pagi_Hari.jpg' },
  pentingsari:    { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Pentingsari_village_Yogyakarta.jpg' },
  nglanggeran:    { main: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Embung_Nglanggeran_1.jpg' },
  sade:           { main: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sasak_traditional_house_Sade.jpg' },
  pujonkidul:     { main: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Pujon_Kidul_Malang.jpg' },
  liangndara:     { main: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Manggarai_traditional_dance.jpg' },
  ketekesu:       { main: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Tongkonan_Ketekesu.jpg' },
};

// ─── Village description patches for those with undefined/thin descriptions ──
const VILLAGE_DESC_PATCHES = {
  pentingsari: {
    description_en: 'Pentingsari is an eco-tourism village located on the slopes of Mount Merapi in Sleman Regency, Yogyakarta. The village offers an authentic Javanese rural experience with traditional farming activities, Javanese cooking classes, gamelan music performances, and homestay packages in traditional Javanese houses (Joglo). Situated at 600 meters above sea level with views of Mount Merapi, it was awarded as one of the best tourism villages in Indonesia.',
    description_id: 'Pentingsari adalah desa wisata eko-wisata yang terletak di lereng Gunung Merapi, Kabupaten Sleman, Yogyakarta. Desa ini menawarkan pengalaman pedesaan Jawa yang autentik dengan kegiatan bertani tradisional, kelas memasak Jawa, pertunjukan musik gamelan, dan paket homestay di rumah Joglo tradisional. Berada pada ketinggian 600 meter di atas permukaan laut dengan pemandangan Gunung Merapi.',
    summary_en: 'Eco-tourism village on Mount Merapi slopes offering authentic Javanese rural life with traditional farming and gamelan.',
    summary_id: 'Desa eko-wisata di lereng Gunung Merapi dengan pengalaman kehidupan desa Jawa yang autentik.',
  },
  nglanggeran: {
    description_en: 'Nglanggeran is a village in Gunungkidul Regency, Yogyakarta, famous for its ancient volcano (Gunung Api Purba Nglanggeran), a 60-million-year-old extinct volcanic rock formation rising dramatically from the plain. The village offers trekking, camping, and cultural experiences amid breathtaking rock pillars. It has won the ASEAN Community-Based Tourism Award and is a model of sustainable community tourism.',
    description_id: 'Nglanggeran adalah sebuah desa di Kabupaten Gunungkidul, Yogyakarta, yang terkenal dengan gunung api purbanya (Gunung Api Purba Nglanggeran), formasi batu vulkanik berusia 60 juta tahun yang menjulang dari dataran. Desa ini menawarkan trekking, berkemah, dan pengalaman budaya di antara pilar batu yang menakjubkan. Desa ini telah meraih Penghargaan Pariwisata Berbasis Komunitas ASEAN.',
    summary_en: 'Village home to Gunung Api Purba — a 60-million-year-old ancient volcanic rock formation in Gunungkidul.',
    summary_id: 'Desa dengan Gunung Api Purba — formasi batu vulkanik purba berusia 60 juta tahun di Gunungkidul.',
  },
  sade: {
    description_en: 'Sade is a traditional Sasak village in Lombok, Nusa Tenggara Barat, preserving the indigenous culture of the Sasak people. The village consists of traditional cylindrical bamboo houses with buffalo dung-polished floors, and the community still practices traditional weaving (tenun) and ceremonies. Sade is one of the last authentic Sasak hamlets open to visitors, offering a window into pre-Islamic Lombok culture.',
    description_id: 'Sade adalah desa tradisional Sasak di Lombok, Nusa Tenggara Barat, yang melestarikan budaya asli suku Sasak. Desa ini terdiri dari rumah-rumah bambu silindris tradisional dengan lantai yang dipoles kotoran kerbau, dan komunitasnya masih mempraktikkan tenun tradisional dan upacara adat. Sade adalah salah satu dusun Sasak autentik terakhir yang terbuka untuk pengunjung.',
    summary_en: 'Authentic Sasak traditional village in Lombok preserving indigenous cylindrical bamboo houses and handloom weaving.',
    summary_id: 'Desa tradisional Sasak di Lombok yang melestarikan rumah bambu silindris dan tenun tangan adat.',
  },
  pujonkidul: {
    description_en: 'Pujon Kidul is an award-winning agro-tourism village in Malang Regency, East Java, known for its innovative community-based tourism model. The village sits at 1,200 meters above sea level amidst dairy farms, vegetable gardens, and stunning mountain scenery. Visitors can milk cows, pick fresh vegetables, enjoy café with panoramic views, and experience traditional Javanese farming life. It has been recognized as one of the best tourism villages in Indonesia by the Ministry of Tourism.',
    description_id: 'Pujon Kidul adalah desa agrowisata pemenang penghargaan di Kabupaten Malang, Jawa Timur, yang terkenal dengan model pariwisata berbasis komunitas yang inovatif. Desa ini berada pada ketinggian 1.200 meter di atas permukaan laut di antara peternakan sapi perah, kebun sayuran, dan pemandangan pegunungan yang menakjubkan. Pengunjung dapat memerah susu sapi, memetik sayuran segar, dan menikmati kehidupan pertanian Jawa tradisional.',
    summary_en: 'Award-winning agro-tourism village in Malang at 1,200m elevation with dairy farms, vegetable gardens and mountain views.',
    summary_id: 'Desa agrowisata pemenang penghargaan di Malang pada ketinggian 1.200m dengan peternakan sapi dan kebun sayur.',
  },
  liangndara: {
    description_en: 'Liang Ndara is a traditional Manggarai village in West Manggarai Regency, Flores, located near the famous Wae Rebo. The village preserves authentic Manggarai culture including the traditional circular communal house (Mbaru Niang), traditional weaving (songket), and the caci whip-fighting ritual. The surrounding landscape features terraced rice fields, tropical forests, and mountain scenery characteristic of inland Flores.',
    description_id: 'Liang Ndara adalah sebuah desa tradisional Manggarai di Kabupaten Manggarai Barat, Flores, yang terletak dekat Wae Rebo yang terkenal. Desa ini melestarikan budaya Manggarai yang autentik termasuk rumah komunal melingkar tradisional (Mbaru Niang), tenun tradisional (songket), dan ritual adu cambuk caci. Lanskapnya menampilkan sawah terasering, hutan tropis, dan pemandangan gunung khas pedalaman Flores.',
    summary_en: 'Traditional Manggarai village in Flores preserving the circular Mbaru Niang communal house and caci whip-fighting tradition.',
    summary_id: 'Desa tradisional Manggarai di Flores yang melestarikan rumah komunal Mbaru Niang dan tradisi adu cambuk caci.',
  },
  ketekesu: {
    description_en: "Ke'te' Kesu' is a traditional Toraja village and cultural heritage site in Tana Toraja, South Sulawesi. It is one of the most complete and well-preserved examples of a traditional Torajan settlement, featuring rows of stately Tongkonan clan houses with distinctive boat-shaped roofs, rice barns (alang), and elaborate wood carvings. Behind the village lies ancient cliff graves (liang) and hanging graves, some over 500 years old. The site is a UNESCO tentative world heritage listing.",
    description_id: "Ke'te' Kesu' adalah sebuah desa tradisional Toraja dan situs warisan budaya di Tana Toraja, Sulawesi Selatan. Ini adalah salah satu contoh pemukiman Toraja tradisional yang paling lengkap dan terawat, menampilkan deretan rumah adat Tongkonan yang megah dengan atap berbentuk perahu, lumbung padi (alang), dan ukiran kayu yang rumit. Di belakang desa terdapat makam tebing kuno (liang) dan makam gantung, beberapa berusia lebih dari 500 tahun.",
    summary_en: "Best-preserved Toraja village featuring iconic Tongkonan houses, rice barns, and ancient cliff graves over 500 years old.",
    summary_id: 'Desa Toraja paling terawat dengan rumah Tongkonan ikonik, lumbung padi, dan makam tebing kuno berusia 500 tahun.',
  },
};

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = csvLine(lines[0]);
  return { headers, rows: lines.slice(1).filter(Boolean).map(l => { const v = csvLine(l); return Object.fromEntries(headers.map((h,i) => [h, v[i]??''])); }) };
}
function csvLine(line) {
  const res=[]; let cur=''; let q=false;
  for(let i=0;i<line.length;i++){
    const c=line[i];
    if(c==='"'&&!q) q=true;
    else if(c==='"'&&q){ if(line[i+1]==='"'){cur+='"';i++;}else q=false; }
    else if(c===','&&!q){ res.push(cur); cur=''; }
    else cur+=c;
  }
  res.push(cur); return res;
}
function serializeCSV(rows, headers) {
  const e=v=>{ const s=String(v??''); return (s.includes(',')||s.includes('"')||s.includes('\n'))?'"'+s.replace(/"/g,'""')+'"':s; };
  return [headers.join(','),...rows.map(r=>headers.map(h=>e(r[h])).join(','))].join('\n')+'\n';
}

async function main() {
  const dataDir  = path.join(__dirname,'..','data');
  const destPath = path.join(dataDir,'destinations.csv');
  const villPath = path.join(dataDir,'villages.csv');

  const dest = parseCSV(fs.readFileSync(destPath,'utf-8'));
  const vill = parseCSV(fs.readFileSync(villPath,'utf-8'));

  console.log('\n🔧 Fixing images + patching village descriptions...\n');

  // Fix images in destinations
  let destFixed=0;
  for (const row of dest.rows) {
    const v = VERIFIED[row.id];
    if (v?.main) { row.image = v.main; row.gallery = v.main; destFixed++; }
  }

  // Fix images + patch descriptions in villages
  let villFixed=0, villPatched=0;
  for (const row of vill.rows) {
    const v = VERIFIED[row.id];
    if (v?.main) { row.image = v.main; row.gallery = v.main; villFixed++; }
    const patch = VILLAGE_DESC_PATCHES[row.id];
    if (patch) { Object.assign(row, patch); villPatched++; }
  }

  fs.writeFileSync(destPath, serializeCSV(dest.rows, dest.headers), 'utf-8');
  fs.writeFileSync(villPath, serializeCSV(vill.rows, vill.headers), 'utf-8');

  console.log(`✅ Destinations: ${destFixed} images fixed`);
  console.log(`✅ Villages:     ${villFixed} images fixed, ${villPatched} descriptions patched`);
  console.log('\n🎉 Fix complete!\n');
}

main().catch(console.error);
