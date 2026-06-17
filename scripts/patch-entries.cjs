/**
 * Post-scrape patch: fix entries that got wrong/thin descriptions
 * Run after industry-scraper.cjs completes.
 */
'use strict';
const fs   = require('fs');
const path = require('path');

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = csvLine(lines[0]);
  return lines.slice(1).filter(Boolean).map(l => {
    const v = csvLine(l);
    return Object.fromEntries(headers.map((h,i) => [h, v[i]??'']));
  });
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
  const e=(v)=>{ const s=String(v??''); return (s.includes(',')||s.includes('"')||s.includes('\n'))?'"'+s.replace(/"/g,'""')+'"':s; };
  return [headers.join(','),...rows.map(r=>headers.map(h=>e(r[h])).join(','))].join('\n')+'\n';
}

const HEADERS = ['id','name','region','island','category','longitude','latitude','image','gallery','ambience','youtubeId','summary_en','summary_id','description_en','description_id','history_en','history_id','culture_en','culture_id','activities_en','activities_id','culinary_en','culinary_id','tips_en','tips_id','bestSeason_en','bestSeason_id'];

// Patches: specific overrides for entries that got wrong/thin scraped content
const PATCHES = {
  muarojambi: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Candi_Gumpung_Muaro_Jambi.jpg',
    summary_en: 'Vast Buddhist temple complex in Jambi, one of the largest archaeological sites in Southeast Asia.',
    summary_id: 'Kompleks percandian Buddha terluas di Jambi, salah satu situs arkeologi terbesar di Asia Tenggara.',
    description_en: 'The Muaro Jambi temple compounds are a series of ancient Buddhist temple complexes located along the Batanghari River in Jambi province, Sumatra. Covering approximately 2,600 hectares, they comprise the largest ancient temple complex in Indonesia and Southeast Asia, containing over 82 temple mounds (candi) and numerous smaller structures. The temples date from the 7th to 12th centuries CE and were associated with the Melayu Kingdom and later the Srivijaya empire, serving as an important centre of Mahayana Buddhist learning.',
    description_id: 'Kompleks Percandian Muaro Jambi adalah rangkaian kompleks candi Buddha kuno yang terletak di sepanjang Sungai Batanghari di Provinsi Jambi, Sumatra. Mencakup sekitar 2.600 hektar, kompleks ini merupakan kompleks candi kuno terluas di Indonesia dan Asia Tenggara, berisi lebih dari 82 gundukan candi dan berbagai struktur lainnya. Candi-candi ini berasal dari abad ke-7 hingga ke-12 M dan terkait dengan Kerajaan Melayu dan kemudian Kerajaan Sriwijaya.',
    history_en: 'Dating from the 7th to 12th centuries CE, Muaro Jambi served as a major centre of Buddhist learning during the Melayu and Srivijaya kingdoms. Chinese monk Yi Jing mentioned visiting the kingdom in the 7th century.',
    history_id: 'Berasal dari abad ke-7 hingga ke-12 M, Muaro Jambi merupakan pusat pembelajaran Buddha pada masa Kerajaan Melayu dan Sriwijaya. Biksu Tiongkok Yi Jing menyebutkan kunjungannya ke kerajaan ini pada abad ke-7.',
  },
  pantaidato: {
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Pantai_Dato_Majene.jpg',
    summary_en: 'Scenic white sand beach in Majene, West Sulawesi, divided by towering natural limestone cliffs.',
    summary_id: 'Pantai pasir putih yang indah di Majene, Sulawesi Barat, terbagi oleh tebing batu kapur alami yang menjulang tinggi.',
    description_en: 'Pantai Dato (Dato Beach) is a picturesque white-sand beach located in Majene Regency, West Sulawesi, Indonesia. The beach is distinctive for its dramatic vertical limestone cliffs that rise directly from the sea, splitting the shoreline into two sections. The turquoise water, white sand, and towering rock formations make it one of the most scenic spots in West Sulawesi. The area is popular for swimming, cliff climbing, and panoramic photography.',
    description_id: 'Pantai Dato adalah pantai berpasir putih yang indah terletak di Kabupaten Majene, Sulawesi Barat, Indonesia. Pantai ini khas dengan tebing batu kapur vertikal yang menjulang langsung dari laut, membagi garis pantai menjadi dua bagian. Air biru jernih, pasir putih, dan formasi batu yang menjulang tinggi menjadikannya salah satu tempat paling indah di Sulawesi Barat.',
    history_en: 'The limestone cliffs at Dato Beach were formed through natural coastal erosion over millions of years, creating the striking geological heritage of Majene coastal region.',
    history_id: 'Tebing batu kapur di Pantai Dato terbentuk melalui erosi pantai alami selama jutaan tahun, menciptakan warisan geologi pesisir Majene yang menakjubkan.',
  },
  khatulistiwa: {
    // Equatorial Monument — scraped description was thin
    description_en: 'The Equatorial Monument (Tugu Khatulistiwa) is a historic landmark located in Pontianak, West Kalimantan, Indonesia, positioned precisely on the Earth\'s equatorial line at 0°0\'0" latitude. Originally built in 1928 by Dutch geographers, the monument was reconstructed multiple times with the current form dating to 1930. Pontianak, known as the "Equator City", is one of the few cities in the world located exactly on the equator. During the equinox (around March 21 and September 23), objects near the monument cast no shadow, drawing visitors from across Indonesia.',
    description_id: 'Tugu Khatulistiwa adalah landmark bersejarah yang terletak di Kota Pontianak, Kalimantan Barat, Indonesia, tepat berada di garis khatulistiwa Bumi pada lintang 0°0\'0". Awalnya dibangun pada tahun 1928 oleh ahli geografi Belanda, monumen ini direkonstruksi beberapa kali dengan bentuk sekarang berasal dari tahun 1930. Pada saat ekuinoks (sekitar 21 Maret dan 23 September), benda-benda di dekat monumen tidak memiliki bayangan.',
  },
  sulamadaha: {
    // Ternate article is too generic — patch to be specific about Sulamadaha
    summary_en: 'Crystal-clear turquoise beach cove on Ternate Island, North Maluku, famous for its mirror-like water.',
    summary_id: 'Teluk pantai biru jernih di Pulau Ternate, Maluku Utara, terkenal dengan airnya yang seperti cermin.',
    description_en: 'Sulamadaha Beach is a stunning coastal destination located on Ternate Island, North Maluku, Indonesia, facing the Maluku Sea. The beach is renowned for its extraordinarily clear turquoise water and rocky black volcanic shoreline, a contrast created by the island\'s volcanic origin. The calm bay offers exceptional visibility for snorkeling and rowing boat trips. Nearby is the smaller hidden cove of Batu Angus (Burned Rock), a volcanic formation accessible by boat. The beach remains one of North Maluku\'s most treasured natural attractions.',
    description_id: 'Pantai Sulamadaha adalah destinasi pantai yang memukau terletak di Pulau Ternate, Maluku Utara, Indonesia, menghadap Laut Maluku. Pantai ini terkenal dengan airnya yang sangat jernih berwarna biru toska dan garis pantai berbatu hitam vulkanik, kontras yang tercipta dari asal-usul vulkanik pulau ini. Teluk yang tenang menawarkan visibilitas luar biasa untuk snorkeling dan perjalanan perahu dayung.',
  },
};

async function main() {
  const dataDir  = path.join(__dirname,'..','data');
  const destPath = path.join(dataDir,'destinations.csv');
  const rows = parseCSV(fs.readFileSync(destPath,'utf-8'));

  let patchCount = 0;
  for (const row of rows) {
    if (PATCHES[row.id]) {
      Object.assign(row, PATCHES[row.id]);
      patchCount++;
      console.log(`✅ Patched: ${row.id} (${row.name})`);
    }
  }

  fs.writeFileSync(destPath, serializeCSV(rows, HEADERS), 'utf-8');
  console.log(`\n🔧 ${patchCount} entries patched in destinations.csv`);
}

main().catch(console.error);
