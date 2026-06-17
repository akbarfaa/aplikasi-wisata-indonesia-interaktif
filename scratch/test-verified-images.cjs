const fs = require('fs');
const path = require('path');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const VERIFIED = {
  baiturrahman:   { main: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg' },
  tobalake:       { main: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Lake_Toba_and_the_surrounding_hills.jpg' },
  harau:          { main: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Harau_Valley.jpg' },
  siak:           { main: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Istana_Kerajaan_Siak.jpg' },
  penyengat:      { main: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Pulau_Penyengat.jpg' },
  muarojambi:     { main: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Candi_Gumpung_Muaro_Jambi.jpg' },
  ampera:         { main: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ampera_Bridge_at_Night.jpg' },
  belitung:       { main: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Tanjung_Tinggi_Beach.jpg' },
  marlborough:    { main: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Front_gate_of_Fort_Marlborough.jpg' },
  waykambas:      { main: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_in_Way_Kambas.jpg' },
  monas:          { main: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Jakarta_Indonesia_National-Monument-02.jpg' },
  kawahputih:     { main: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Kawah_Putih_Lake_from_Above.jpg' },
  tanjunglesung:  { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Tanjung_Lesung_in_2018.jpg' },
  borobudur:      { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Borobudur-Nothwest-view.jpg' },
  yogyakarta:     { main: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Kraton_Yogyakarta.jpg' },
  bromo:          { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg' },
  tanahlot:       { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/TanahLot_2014.JPG' },
  rinjani:        { main: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Mount_Rinjani_from_Senaru_Crater_Rim.jpg' },
  komodo:         { main: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_Island.jpg' },
  khatulistiwa:   { main: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Tugu_Khatulistiwa.jpg' },
  tanjungputing:  { main: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Bornean_Orangutan_%28Pongo_pygmaeus%29_%288688715248%29.jpg' },
  lokbaintan:     { main: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Jukung_Pasar_Terapung_Lok_Baintan.jpg' },
  derawan:        { main: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Derawan_Island_East_Kalimantan.jpg' },
  kayanmentarang: { main: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Kayan_Mentarang_NP_forest.jpg' },
  bunaken:        { main: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Bunaken01.JPG' },
  togean:         { main: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Togean_Island.jpg' },
  toraja:         { main: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Tongkonan_houses_Tana_Toraja.jpg' },
  wakatobi:       { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Wakatobi_beach_2009.jpg' },
  olele:          { main: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Teluk_Tomini.jpg' },
  pantaidato:     { main: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Majene_Regency.jpg' },
  bandaneira:     { main: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Bandaneira-0039.JPG' },
  sulamadaha:     { main: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Ternate_in_sight.jpg' },
  sentani:        { main: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Sentani_Lake.jpg' },
  pegarfak:       { main: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg' },
  wasur:          { main: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Wasur_Rainbow_1994.jpg' },
  puncakjaya:     { main: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Carstenzs_Piramida.jpg' },
  baliem:         { main: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/20170903_Papouasie_Vallee_de_la_Baliem.jpg' },
  rajaampat:      { main: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands.jpg' },
  // Villages
  penglipuran:    { main: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/ID-bali-penglipuran.jpg' },
  waerebo:        { main: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Wae_Rebo_Village.jpg' },
  pentingsari:    { main: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Desa_Wisata_Pentingsari.jpg' },
  nglanggeran:    { main: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Nglanggeran_volcano.jpg' },
  sade:           { main: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Sade_village_Lombok.jpg' },
  pujonkidul:     { main: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Pujon_Kidul_village.jpg' },
  liangndara:     { main: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Liang_Ndara_village_Manggarai.jpg' },
  ketekesu:       { main: 'https://upload.wikimedia.org/wikipedia/commons/6/65/Kete_Kesu_Toraja.jpg' },
};

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
  console.log('=== TESTING VERIFIED DICT IMAGES ===');
  for (const [id, item] of Object.entries(VERIFIED)) {
    await delay(1500); // 1.5s delay to prevent 429
    const res = await testUrl(item.main);
    console.log(`- ${id.padEnd(16)}: ${res.ok ? '✅' : '❌'} status=${res.status} url=${item.main}`);
  }
}

main().catch(console.error);
