import type { Lang } from "./i18n";

export type Category =
  | "village"
  | "beach"
  | "mountain"
  | "volcano"
  | "ecotourism"
  | "heritage"
  | "culture"
  | "marine"
  | "park";

export interface Bilingual {
  en: string;
  id: string;
}

export interface Destination {
  id: string;
  name: string;
  region: string;
  island: string;
  category: Category;
  coords: [number, number];
  image: string;
  gallery: string[];
  ambience: "beach" | "mountain" | "village" | "forest" | "culture";
  youtubeId: string;
  summary: Bilingual;
  description: Bilingual;
  history: Bilingual;
  culture: Bilingual;
  activities: Bilingual[];
  culinary: Bilingual[];
  tips: Bilingual;
  bestSeason: Bilingual;
}

export const destinations: Destination[] = [
  {
    "id": "baiturrahman",
    "name": "Baiturrahman Grand Mosque",
    "region": "Aceh",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      95.3193,
      5.5536
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/4/47/Meuseujid_Raya_Baiturrahman_.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "u9tDJqgZosI",
    "summary": {
      "en": "Mosque in Banda Aceh, Aceh, Indonesia",
      "id": "masjid Indonesia"
    },
    "description": {
      "en": "Baiturrahman Grand Mosque \r\nis a mosque located in Banda Aceh, Aceh, Indonesia. The Baiturrahman Grand Mosque is a symbol of religion, culture, spirit, strength, struggle, and nationalism of the Acehnese people. The mosque is a landmark in Banda Aceh and has survived the 2004 Indian Ocean earthquake and tsunami.",
      "id": "Masjid Raya Baiturrahman Banda Aceh atau yang lebih dikenal dengan Masjid Raya Baiturrahman atau Masjid Kesultanan Aceh adalah sebuah masjid bersejarah yang berada di Kota Banda Aceh, Provinsi Aceh, Indonesia. Masjid ini dibangun pada tahun 1879 dan merupakan simbol agama, budaya, semangat, kekuatan, perjuangan dan nasionalisme rakyat Aceh. Kemudian masjid ini adalah landmark Kota Banda Aceh sejak era Kesultanan Aceh dan Aceh saat ini. Masjid ini juga dikenal karena menjadi salah satu bangunan yang selamat dari gempa bumi dan tsunami tahun 2004."
    },
    "history": {
      "en": "Rebuilt by the Dutch in 1879 after being destroyed during the Aceh War.",
      "id": "Dibangun kembali oleh Belanda pada tahun 1879 setelah hancur selama Perang Aceh."
    },
    "culture": {
      "en": "Reflects the deep Islamic heritage and resilience of the Acehnese people.",
      "id": "Mencerminkan warisan Islam yang mendalam dan ketangguhan masyarakat Aceh."
    },
    "activities": [
      {
        "en": "Admire Islamic architecture",
        "id": "Kagumi arsitektur Islam"
      },
      {
        "en": "Learn history",
        "id": "Pelajari sejarah"
      }
    ],
    "culinary": [
      {
        "en": "Timphan cake",
        "id": "Kue Timphan"
      },
      {
        "en": "Aceh noodles",
        "id": "Mie Aceh"
      }
    ],
    "tips": {
      "en": "Dress modestly with full headcover for women.",
      "id": "Berpakaianlah dengan sopan dengan penutup kepala bagi wanita."
    },
    "bestSeason": {
      "en": "Dry Season (May – October)",
      "id": "Musim Kemarau (Mei – Oktober)"
    }
  },
  {
    "id": "tobalake",
    "name": "Lake Toba",
    "region": "North Sumatra",
    "island": "Sumatra",
    "category": "ecotourism",
    "coords": [
      98.8538,
      2.6845
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lake_Toba_and_the_surrounding_hills.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Lake_Toba_and_the_surrounding_hills.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "WW5CGjvrQN0",
    "summary": {
      "en": "Volcanic lake located in North Sumatra Province, Indonesia",
      "id": "danau vulkanik di Sumatera Utara, Indonesia"
    },
    "description": {
      "en": "Lake Toba is a large natural lake in North Sumatra and Indonesia. The lake is the massive caldera of the Toba supervolcano. The lake is located in the middle of the northern part of the island of Sumatra, with a surface elevation of about 900 metres (2,953 ft), the lake stretches from 2.88°N 98.52°E to 2.35°N 99.1°E. The lake is about 100 kilometres long, 30 kilometres (19 mi) wide, and up to 505 metres (1,657 ft) deep. It is the largest lake in Indonesia and the largest volcanic lake in the world. Toba Caldera is one of twenty geoparks in Indonesia, and was recognised in July 2020 as one of the UNESCO Global Geoparks.",
      "id": "Danau Toba adalah danau alami terbesar di Sumatera Utara, Indonesia yang terletak di kaldera gunung supervulkan. Danau ini memiliki panjang 100 kilometer, lebar 30 kilometer (19 mi), dan kedalaman 508 meter (1.667 ft). Danau ini terletak di tengah pulau Sumatra bagian utara dengan ketinggian permukaan sekitar 900 meter (2.953 ft). Danau ini membentang dari 2.88°N 98.52°E sampai 2.35°N 99.1°E. Danau Toba merupakan danau terbesar di Indonesia sekaligus danau vulkanik terbesar di dunia."
    },
    "history": {
      "en": "The Toba catastrophe nearly drove early humans to extinction; today the caldera is a UNESCO Global Geopark.",
      "id": "Bencana Toba hampir membuat manusia purba punah; kini kaldera menjadi UNESCO Global Geopark."
    },
    "culture": {
      "en": "Batak music dance and traditional Rumah Bolon houses with sweeping saddle roofs.",
      "id": "Musik dan tari Batak serta rumah tradisional Bolon dengan atap pelana melengkung."
    },
    "activities": [
      {
        "en": "Cycle Samosir",
        "id": "Bersepeda di Samosir"
      },
      {
        "en": "Tomok royal tombs",
        "id": "Makam raja Tomok"
      }
    ],
    "culinary": [
      {
        "en": "Arsik fish",
        "id": "Ikan arsik"
      },
      {
        "en": "Batak grill",
        "id": "Panggang Batak"
      }
    ],
    "tips": {
      "en": "Take the ferry from Parapat.",
      "id": "Naik feri dari Parapat."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "harau",
    "name": "Harau Valley",
    "region": "West Sumatra",
    "island": "Sumatra",
    "category": "ecotourism",
    "coords": [
      100.6723,
      -0.0984
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/f/fe/Lembah_harau_50_kota.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "Mt6u-opvj8s",
    "summary": {
      "en": "Spectacular canyon bordered by steep granite cliffs.",
      "id": "lembah di Indonesia"
    },
    "description": {
      "en": "A lush green valley flanked by towering vertical granite cliffs and dramatic waterfalls.",
      "id": "Lembah Harau adalah sebuah ngarai dekat Kota Payakumbuh di Kabupaten Lima Puluh Kota, provinsi Sumatera Barat. Lembah Harau diapit dua bukit cadas terjal dengan ketinggian mencapai 150 meter berupa batu pasir yang terjal berwarna-warni, dengan ketinggian 100 sampai 500 meter. Topografi Cagar Alam Harau adalah berbukit-bukit dan bergelombang. Tinggi dari permukaan laut adalah 500 sampai 850 meter, bukit tersebut antara lain adalah Bukit Air Putih, Bukit Jambu, Bukit Singkarak, dan Bukit Tarantang. Berjalan menuju Lembah Harau amat menyenangkan. Dengan udara yang masih segar, anda bisa melihat keindahan alam sekitarnya. Tebing-tebing granit yang menjulang tinggi dengan bentuknya yang unik mengelilingi lembah. Tebing-tebing granit yang terjal ini mempunyai ketinggian 80 meter hingga 300 meter."
    },
    "history": {
      "en": "Inhabited for generations by the Minangkabau people it became a nature reserve in 1993.",
      "id": "Dihuni selama beberapa generasi oleh suku Minangkabau diresmikan sebagai cagar alam tahun 1993."
    },
    "culture": {
      "en": "Minangkabau traditions traditional agriculture and cultural architecture with Horned roofs.",
      "id": "Tradisi Minangkabau pertanian tradisional dan arsitektur budaya dengan atap Bagonjong."
    },
    "activities": [
      {
        "en": "Cliff photography",
        "id": "Fotografi tebing"
      },
      {
        "en": "Waterfall trekking",
        "id": "Trekking air terjun"
      }
    ],
    "culinary": [
      {
        "en": "Rendang",
        "id": "Rendang"
      },
      {
        "en": "Sate Padang",
        "id": "Sate Padang"
      }
    ],
    "tips": {
      "en": "Hire a local guide to find the hidden waterfalls.",
      "id": "Sewa pemandu lokal untuk menemukan air terjun tersembunyi."
    },
    "bestSeason": {
      "en": "June – September",
      "id": "Juni – September"
    }
  },
  {
    "id": "siak",
    "name": "Siak Palace",
    "region": "Riau",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      102.0494,
      0.7984
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/89/Istana_Kerajaan_Siak_(2).jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Istana_Kerajaan_Siak_(2).jpg"
    ],
    "ambience": "culture",
    "youtubeId": "xMj6gva87hM",
    "summary": {
      "en": "Palace in Riau, Indonesia",
      "id": "Istana di Indonesia"
    },
    "description": {
      "en": "Siak Sri Indrapura Palace or Siak Palace is an istana of the Sultanate of Siak Sri Indrapura that is located in Siak Regency, Riau Province, on the island of Sumatra, Indonesia. The palace is now transformed into a museum.",
      "id": "Istana Siak Sri Indrapura atau Istana Asserayah Hasyimiah atau Istana Matahari Timur merupakan kediaman resmi Sultan Siak yang mulai dibangun pada tahun 1889, yaitu pada masa pemerintahan Sultan Syarif Hasyim. Istana ini merupakan peninggalan Kesultanan Siak Sri Indrapura yang selesai dibangun pada tahun 1893. Kini istana ini masuk wilayah administrasi pemerintahan Kabupaten Siak."
    },
    "history": {
      "en": "Built in 1889 by Sultan Syarif Hasyim blending Malay Arabic and European architecture.",
      "id": "Dibangun pada 1889 oleh Sultan Syarif Hasyim memadukan arsitektur Melayu Arab dan Eropa."
    },
    "culture": {
      "en": "Malay customs and royal Islamic heritage of Sumatra.",
      "id": "Adat istiadat Melayu dan warisan sejarah Islam kerajaan Sumatra."
    },
    "activities": [
      {
        "en": "Explore royal rooms",
        "id": "Jelajahi ruang kerajaan"
      },
      {
        "en": "View Komet music instrument",
        "id": "Lihat alat musik Komet"
      }
    ],
    "culinary": [
      {
        "en": "Roti Jala",
        "id": "Roti Jala"
      },
      {
        "en": "Pondok Patin fish",
        "id": "Ikan Patin Pondok"
      }
    ],
    "tips": {
      "en": "Take a scenic river boat trip from Pekanbaru.",
      "id": "Lakukan perjalanan perahu sungai yang indah dari Pekanbaru."
    },
    "bestSeason": {
      "en": "Dry Season (May – October)",
      "id": "Musim Kemarau (Mei – Oktober)"
    }
  },
  {
    "id": "penyengat",
    "name": "Penyengat Island",
    "region": "Riau Islands",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      104.4172,
      0.9284
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pulau_Penyengat.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Pulau_Penyengat.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "MamwPngKku0",
    "summary": {
      "en": "Island in Riau Islands, Indonesia",
      "id": "pulau di Kota Tanjung Pinang, Kepulauan Riau"
    },
    "description": {
      "en": "Penyengat Island is an island close to Tanjung Pinang, capital of the Riau Islands, Indonesia.",
      "id": "Pulau Penyengat atau Pulau Penyengat Inderasakti adalah sebuah pulau di Kota Tanjungpinang, Kepulauan Riau, yang berjarak kurang lebih 2 km dari pusat kota. Pulau ini berukuran panjang 2.000 m dan lebar 850 m, berjarak lebih kurang 35 km dari Pulau Batam. Pulau ini dapat ditempuh dari pusat Kota Tanjungpinang dengan menggunakan perahu bermotor atau lebih dikenal pompong yang memerlukan waktu tempuh kurang lebih 15 menit."
    },
    "history": {
      "en": "Crucial fortress during the Dutch-Malay wars of the 18th and 19th centuries.",
      "id": "Benteng penting selama perang Belanda-Melayu pada abad ke-18 dan ke-19."
    },
    "culture": {
      "en": "Birthplace of Raja Ali Haji a pioneer who wrote the Gurindam Dua Belas.",
      "id": "Tempat lahir Raja Ali Haji pelopor yang menulis Gurindam Dua Belas."
    },
    "activities": [
      {
        "en": "Visit historic ruins",
        "id": "Kunjungi reruntuhan bersejarah"
      },
      {
        "en": "Rent a becak tour",
        "id": "Sewa becak untuk tur"
      }
    ],
    "culinary": [
      {
        "en": "Otak-Otak",
        "id": "Otak-Otak"
      },
      {
        "en": "Gonggong sea snail",
        "id": "Siput laut Gonggong"
      }
    ],
    "tips": {
      "en": "Respect the sacred grounds and dress appropriately near the royal tombs.",
      "id": "Hormati tanah suci dan berpakaianlah dengan sopan di dekat makam kerajaan."
    },
    "bestSeason": {
      "en": "March – October",
      "id": "Maret – Oktober"
    }
  },
  {
    "id": "muarojambi",
    "name": "Muaro Jambi Temple",
    "region": "Jambi",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      103.7194,
      -1.4832
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Megah_nya_Candi_Muaro_Jambi.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Megah_nya_Candi_Muaro_Jambi.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "l6XCSk_l6Pg",
    "summary": {
      "en": "Vast ancient Buddhist temple complex built in red brick.",
      "id": "Kompleks candi Budha kuno yang luas dibangun dari batu bata merah."
    },
    "description": {
      "en": "One of the largest archaeological temple sites in Southeast Asia dating back to the Melayu Kingdom.",
      "id": "Salah satu situs candi arkeologi terbesar di Asia Tenggara berasal dari Kerajaan Melayu."
    },
    "history": {
      "en": "Dating from the 7th to 12th centuries serving as a center of Buddhist learning.",
      "id": "Berasal dari abad ke-7 hingga ke-12 berfungsi sebagai pusat pembelajaran agama Buddha."
    },
    "culture": {
      "en": "Reflects the ancient Hindu-Buddhist civilization along the Batanghari river.",
      "id": "Mencerminkan peradaban Hindu-Buddha kuno di sepanjang sungai Batanghari."
    },
    "activities": [
      {
        "en": "Rent a bicycle",
        "id": "Sewa sepeda"
      },
      {
        "en": "Explore temple ruins",
        "id": "Jelajahi reruntuhan candi"
      }
    ],
    "culinary": [
      {
        "en": "Tempoyak Jambi",
        "id": "Tempoyak Jambi"
      },
      {
        "en": "Nasi Gemuk",
        "id": "Nasi Gemuk"
      }
    ],
    "tips": {
      "en": "Rent a bicycle at the entrance to explore the sprawling park easily.",
      "id": "Sewa sepeda di pintu masuk untuk menjelajahi taman yang luas dengan mudah."
    },
    "bestSeason": {
      "en": "Dry Season (June – September)",
      "id": "Musim Kemarau (Juni – September)"
    }
  },
  {
    "id": "ampera",
    "name": "Ampera Bridge",
    "region": "South Sumatra",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      104.7621,
      -2.9912
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/76/Ampera_Bridge_at_Night%2C_Palembang.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/7/76/Ampera_Bridge_at_Night%2C_Palembang.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "P32epa1FvKQ",
    "summary": {
      "en": "Vertical-lift bridge in Palembang, Indonesia",
      "id": "jembatan di Indonesia"
    },
    "description": {
      "en": "Ampera Bridge, formerly Bung Karno Bridge between its opening and the 1966 De-Sukarnoization campaign, is a vertical-lift bridge in the city of Palembang, South Sumatra, Indonesia. It connects Seberang Ulu and Seberang Ilir, two regions of Palembang. It can no longer be opened to allow ships to pass.",
      "id": "Jembatan Ampera  adalah sebuah jembatan di Kota Palembang, Sumatera Selatan, Indonesia. Jembatan Ampera, yang telah menjadi semacam lambang kota, terletak di tengah-tengah Kota Palembang, menghubungkan daerah Seberang Ulu dan Seberang Ilir yang dipisahkan oleh Sungai Musi. Jembatan Ampera merupakan salah satu ikon Kota Palembang yang paling terkenal."
    },
    "history": {
      "en": "Opened in 1965 built using Japanese war reparations and initially named after President Sukarno.",
      "id": "Dibuka pada 1965 dibangun menggunakan dana rampasan perang Jepang dan awalnya dinamai Bung Karno."
    },
    "culture": {
      "en": "Symbolizes the modernization of Palembang and the pride of South Sumatra.",
      "id": "Melambangkan modernisasi Palembang dan kebanggaan Sumatera Selatan."
    },
    "activities": [
      {
        "en": "View night lights",
        "id": "Lihat lampu malam"
      },
      {
        "en": "Musi river boat tour",
        "id": "Tur perahu sungai Musi"
      }
    ],
    "culinary": [
      {
        "en": "Pempek Palembang",
        "id": "Pempek Palembang"
      },
      {
        "en": "Tekwan",
        "id": "Tekwan"
      }
    ],
    "tips": {
      "en": "Visit around sunset to see the bridge glow beautifully with color lights.",
      "id": "Kunjungi sekitar matahari terbenam untuk melihat jembatan bersinar indah dengan lampu warna."
    },
    "bestSeason": {
      "en": "Dry Season (May – September)",
      "id": "Musim Kemarau (Mei – September)"
    }
  },
  {
    "id": "belitung",
    "name": "Tanjung Tinggi Beach",
    "region": "Bangka Belitung",
    "island": "Sumatra",
    "category": "beach",
    "coords": [
      107.9123,
      -2.8832
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cc/Belitung_Topography.png",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/cc/Belitung_Topography.png"
    ],
    "ambience": "beach",
    "youtubeId": "taohczN_UAk",
    "summary": {
      "en": "Island in Indonesia",
      "id": "pulau di Indonesia"
    },
    "description": {
      "en": "Belitung is an island on the east coast of Sumatra, Indonesia in the Java Sea. It covers 4,859 km2 (1,876.1 sq mi), and had a population of 309,097 at the 2020 Census; the official estimate as at mid 2023 was 320,500. Administratively, it forms two regencies within the province of Bangka-Belitung Islands. The island is known for its pepper and for its tin. It was in the possession of the United Kingdom from 1812 until Britain ceded control of the island to the Netherlands in the Anglo-Dutch Treaty of 1824. Its main town is Tanjung Pandan. The United Nations Educational, Scientific and Cultural Organization has declared 17 tourist attractions in the Belitung Geopark as a world geopark.",
      "id": "Pulau Belitung, atau Belitong, dulunya dikenal sebagai Billiton adalah sebuah pulau di lepas pantai timur Sumatra, Indonesia, diapit oleh Selat Gaspar dan Selat Karimata. Pulau ini terkenal dengan lada putih (Piper sp.) yang dalam bahasa setempat disebut sahang, dan bahan tambang tipe galian-C seperti timah putih (Stannuum), pasir kuarsa, tanah liat putih (kaolin), dan granit. Serta akhir-akhir ini menjadi tujuan wisata alam alternatif. Pulau ini dahulu dimiliki Britania Raya (1812), sebelum akhirnya ditukar kepada Belanda, bersama-sama Bengkulu, dengan Singapura dan New Amsterdam. Kota utamanya adalah Tanjung Pandan."
    },
    "history": {
      "en": "Gained national fame as the primary filming location of the movie Laskar Pelangi.",
      "id": "Meraih ketenaran nasional sebagai lokasi syuting utama film Laskar Pelangi."
    },
    "culture": {
      "en": "Reflects the local coastal Malay fisherman culture and geopark identity.",
      "id": "Mencerminkan budaya nelayan Melayu pesisir lokal dan identitas geopark."
    },
    "activities": [
      {
        "en": "Snorkeling",
        "id": "Snorkeling"
      },
      {
        "en": "Island hopping",
        "id": "Jelajah pulau"
      },
      {
        "en": "granite climbing",
        "id": "memanjat granit"
      }
    ],
    "culinary": [
      {
        "en": "Belitung noodles",
        "id": "Mie Belitung"
      },
      {
        "en": "Gangan fish soup",
        "id": "Sup ikan Gangan"
      }
    ],
    "tips": {
      "en": "Wear water shoes as the granite stones can be slippery.",
      "id": "Kenakan sepatu air karena batu granit bisa menjadi licin."
    },
    "bestSeason": {
      "en": "April – October",
      "id": "April – Oktober"
    }
  },
  {
    "id": "marlborough",
    "name": "Fort Marlborough",
    "region": "Bengkulu",
    "island": "Sumatra",
    "category": "heritage",
    "coords": [
      102.2514,
      -3.7878
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/59/Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/5/59/Front_gate_of_Fort_Marlborough%2C_Bengkulu_2015-04-19_02.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "4H14MyCu6Fs",
    "summary": {
      "en": "Fort in Bengkulu, Indonesia",
      "id": "bangunan kuil di Indonesia"
    },
    "description": {
      "en": "Fort Marlborough is a former East India Company fort located in Bengkulu City, Sumatra. It was built between 1713 and 1719 by the East India Company under the leadership of Governor Joseph Collett as a defensive fort for the British East India Company's Residency there. It was one of the strongest British forts in the eastern region, second only to Fort St. George in Madras, India.",
      "id": "Benteng Marlborough, juga dikenal sebagai Malabero, adalah bekas benteng Perusahaan Hindia Timur yang terletak di Kota Bengkulu, Sumatra. Dibangun antara tahun 1713 dan 1719 oleh Perusahaan Hindia Timur di bawah kepemimpinan Gubernur Joseph Collett sebagai benteng pertahanan Keresidenan Perusahaan Hindia Timur di sana. Itu adalah salah satu benteng Inggris terkuat di wilayah timur, kedua setelah Benteng St. George di Madras, India."
    },
    "history": {
      "en": "Built by the British East India Company in 1714 under Governor Joseph Collett.",
      "id": "Dibangun oleh Kongsi Dagang Hindia Timur Inggris tahun 1714 di bawah Gubernur Joseph Collett."
    },
    "culture": {
      "en": "Showcases British colonial history and the local struggle for independence.",
      "id": "Menampilkan sejarah kolonial Inggris dan perjuangan lokal untuk kemerdekaan."
    },
    "activities": [
      {
        "en": "Explore historic jail cells",
        "id": "Jelajahi sel penjara bersejarah"
      },
      {
        "en": "Sunset photography",
        "id": "Fotografi matahari terbenam"
      }
    ],
    "culinary": [
      {
        "en": "Pendap Bengkulu",
        "id": "Pendap Bengkulu"
      },
      {
        "en": "Lema",
        "id": "Lema"
      }
    ],
    "tips": {
      "en": "Read the historic English tombstones inside the fort yard for historical context.",
      "id": "Baca batu nisan Inggris bersejarah di halaman benteng untuk konteks sejarah."
    },
    "bestSeason": {
      "en": "June – September",
      "id": "Juni – September"
    }
  },
  {
    "id": "waykambas",
    "name": "Way Kambas National Park",
    "region": "Lampung",
    "island": "Sumatra",
    "category": "park",
    "coords": [
      105.7892,
      -4.9231
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_Way_Kambas_2008.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Sumatran_Rhinoceros_Way_Kambas_2008.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "FRYIG949mGE",
    "summary": {
      "en": "National park in Sumatra, Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Way Kambas National Park is a national park covering 1,300 km2 (500 sq mi) in Lampung province of southern Sumatra, Indonesia. It consists of swamp forest and lowland rain forest, mostly of secondary growth as result of extensive logging in the 1960s and 1970s. Despite decreasing populations, the park still has a few critically endangered Sumatran tigers, Sumatran elephants and Sumatran rhinoceroses. It also hosts over 400 bird species.",
      "id": "Taman Nasional Way Kambas (TNWK) adalah taman nasional perlindungan gajah yang terletak di daerah Lampung tepatnya di Kecamatan Labuhan Ratu, Lampung Timur, Indonesia. Selain di Way Kambas, sekolah gajah (Pusat Latihan Gajah) juga bisa ditemui di Minas, Riau. Gajah Sumatra (Elephas maximus sumatranus) yang hidup di kawasan ini semakin berkurang jumlahnya."
    },
    "history": {
      "en": "Established in 1985 to protect the endangered Sumatran elephants and rhinos.",
      "id": "Didirikan tahun 1985 untuk melindungi gajah dan badak Sumatera yang terancam punah."
    },
    "culture": {
      "en": "The park integrates wildlife conservation with education for local communities.",
      "id": "Taman ini mengintegrasikan konservasi satwa liar dengan pendidikan bagi masyarakat lokal."
    },
    "activities": [
      {
        "en": "Elephant center tour",
        "id": "Tur pusat gajah"
      },
      {
        "en": "Bird watching",
        "id": "Mengamati burung"
      }
    ],
    "culinary": [
      {
        "en": "Seruit fish",
        "id": "Ikan Seruit"
      },
      {
        "en": "Serabi Lampung",
        "id": "Serabi Lampung"
      }
    ],
    "tips": {
      "en": "Hire an official park ranger for wildlife safety.",
      "id": "Sewa ranger taman resmi demi keselamatan satwa liar."
    },
    "bestSeason": {
      "en": "June – October",
      "id": "Juni – Oktober"
    }
  },
  {
    "id": "monas",
    "name": "Monas",
    "region": "DKI Jakarta",
    "island": "Java",
    "category": "heritage",
    "coords": [
      106.8272,
      -6.1754
    ],
    "image": "https://upload.wikimedia.org/wikipedia/en/a/a2/Jakarta_Indonesia_National-Monument-02.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Jakarta_Indonesia_National-Monument-02.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "RcLM1aJ8lIs",
    "summary": {
      "en": "National monument and architectural icon of Jakarta, Indonesia",
      "id": "monumen di Indonesia"
    },
    "description": {
      "en": "The National Monument is a 132 m (433 ft) obelisk in the centre of Merdeka Square, Central Jakarta. It is the national monument of the Republic of Indonesia, built to commemorate the struggle for Indonesian independence. This monument is crowned with a flame covered in gold leaf which symbolizes the burning spirit of struggle of the Indonesian people.",
      "id": "Monumen Nasional yang disingkat dengan Monas atau Tugu Monas adalah monumen peringatan setinggi 132 meter, terletak tepat di tengah Lapangan Medan Merdeka, Jakarta Pusat. Monas didirikan untuk mengenang perlawanan dan perjuangan rakyat Indonesia dalam merebut kemerdekaan dari pemerintahan kolonial Kerajaan Belanda. Pembangunan dimulai pada 17 Agustus 1961 di bawah perintah Presiden Soekarno dan diresmikan hingga dibuka untuk umum pada 12 Juli 1975 oleh Presiden Soeharto. Tugu ini dimahkotai lidah api yang dilapisi lembaran emas yang melambangkan semangat perjuangan dari rakyat Indonesia."
    },
    "history": {
      "en": "Commissioned by President Sukarno built in 1961 and opened to the public in 1975.",
      "id": "Diprakarsai oleh Presiden Soekarno dibangun tahun 1961 dan dibuka untuk umum tahun 1975."
    },
    "culture": {
      "en": "Symbolizes the struggle for freedom and unity of Indonesia.",
      "id": "Melambangkan perjuangan untuk kebebasan dan persatuan Indonesia."
    },
    "activities": [
      {
        "en": "Visit National History Museum",
        "id": "Kunjungi Museum Sejarah Nasional"
      },
      {
        "en": "Climb observation deck",
        "id": "Naik ke dek observasi"
      }
    ],
    "culinary": [
      {
        "en": "Kerak Telor",
        "id": "Kerak Telor"
      },
      {
        "en": "Ketoprak",
        "id": "Ketoprak"
      }
    ],
    "tips": {
      "en": "Go early in the morning to avoid long lines at the observation deck lift.",
      "id": "Pergilah pagi-pagi sekali untuk menghindari antrean panjang lift dek observasi."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "kawahputih",
    "name": "Kawah Putih",
    "region": "West Java",
    "island": "Java",
    "category": "volcano",
    "coords": [
      107.4021,
      -7.1662
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/3/35/Kawah_Putih_Lake_from_the_viewing_platform%2C_Bandung_Regency%2C_2014-08-21.jpg"
    ],
    "ambience": "mountain",
    "youtubeId": "Gad8RfBucac",
    "summary": {
      "en": "Crater lake in Indonesia",
      "id": "kawah vulkanik di Ciwidey, Jawa Barat, Indonesia"
    },
    "description": {
      "en": "Kawah Putih is a crater lake and tourist spot in a volcanic crater about 50 kilometres (31 mi) south of Bandung, West Java, Indonesia.",
      "id": "Kawah Putih adalah sebuah tempat wisata di Jawa Barat yang terletak di Desa Alam Endah, Kecamatan Rancabali, Kabupaten Bandung, Jawa Barat yang terletak di kaki Gunung Patuha. Kawah putih merupakan sebuah danau yang terbentuk dari letusan Gunung Patuha. Tanah yang bercampur belerang di sekitar kawah ini berwarna putih, lalu warna air yang berada di kawah ini berwarna putih kehijauan, yang unik dari kawah ini adalah airnya kadang berubah warna. Danau Kawah Putih sendiri berada pada ketinggian 2194 m tapi luas total Danau Kawah Putih 25 ha yang dipakai wisata 5 ha dan lokasi kawah sendiri 3 ha."
    },
    "history": {
      "en": "First documented by German botanist Dr. Franz Wilhelm Junghuhn in 1837.",
      "id": "Pertama kali didokumentasikan oleh botanis Jerman Dr. Franz Wilhelm Junghuhn tahun 1837."
    },
    "culture": {
      "en": "The surrounding hills have tea plantations and beautiful mountain views.",
      "id": "Perbukitan sekitar memiliki perkebunan teh dan pemandangan gunung yang indah."
    },
    "activities": [
      {
        "en": "Walk the floating bridge",
        "id": "Berjalan di jembatan apung"
      },
      {
        "en": "Take crater photos",
        "id": "Ambil foto kawah"
      }
    ],
    "culinary": [
      {
        "en": "Bandrek",
        "id": "Bandrek"
      },
      {
        "en": "Nasi Timbel",
        "id": "Nasi Timbel"
      }
    ],
    "tips": {
      "en": "Bring a mask as the sulfur fumes can be strong at times.",
      "id": "Bawa masker karena bau belerang bisa sangat menyengat sewaktu-waktu."
    },
    "bestSeason": {
      "en": "June – September",
      "id": "Juni – September"
    }
  },
  {
    "id": "tanjunglesung",
    "name": "Tanjung Lesung",
    "region": "Banten",
    "island": "Java",
    "category": "beach",
    "coords": [
      105.6562,
      -6.4742
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d6/Tanjung_Lesung_in_the_Morning.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Tanjung_Lesung_in_the_Morning.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "0mFH5j1JBb8",
    "summary": {
      "en": "Beach in Java, Indonesia",
      "id": "Semenanjung pasir putih murni menghadap Selat Sunda."
    },
    "description": {
      "en": "Tanjung Lesung is a beach in Pandeglang Regency, Banten, western tip of Java. It is 160 kilometres (99 mi) from the capital city of Indonesia, Jakarta, and can be reached by car or public bus in about a 3-4-hour drive. It is known as a beach resort with sea views, having a 15-kilometre (9.3 mi) white sand coastline and also marine life where visitors can enjoy snorkeling, diving as well as fishing. The area has been declared as a \"cultural heritage\" since the location is near Ujung Kulon National Park, Mount Krakatau and Umang Island.",
      "id": "Kawasan resor pesisir mewah yang menawarkan air jernih terumbu karang dan olahraga air."
    },
    "history": {
      "en": "Designated as a Special Economic Zone for tourism to develop Banten coast.",
      "id": "Ditetapkan sebagai Kawasan Ekonomi Khusus pariwisata untuk memajukan pesisir Banten."
    },
    "culture": {
      "en": "Reflects the local Sundanese coastal culture and fishing activities.",
      "id": "Mencerminkan budaya pesisir Sunda lokal dan kegiatan penangkapan ikan."
    },
    "activities": [
      {
        "en": "Jet skiing",
        "id": "Jet ski"
      },
      {
        "en": "Snorkeling",
        "id": "Snorkeling"
      },
      {
        "en": "Beach cycling",
        "id": "Bersepeda di pantai"
      }
    ],
    "culinary": [
      {
        "en": "Rabeg Banten",
        "id": "Rabeg Banten"
      },
      {
        "en": "Sate Bandeng",
        "id": "Sate Bandeng"
      }
    ],
    "tips": {
      "en": "Great weekend getaway from Jakarta; book hotels ahead during public holidays.",
      "id": "Liburan akhir pekan yang menyenangkan dari Jakarta; pesan hotel terlebih dahulu selama hari libur nasional."
    },
    "bestSeason": {
      "en": "April – October",
      "id": "April – Oktober"
    }
  },
  {
    "id": "borobudur",
    "name": "Borobudur",
    "region": "Central Java",
    "island": "Java",
    "category": "heritage",
    "coords": [
      110.2038,
      -7.6079
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/2/25/Pradaksina.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/2/25/Pradaksina.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "txujqGtB_6g",
    "summary": {
      "en": "9th-century Buddhist temple in Java, Indonesia",
      "id": "Bangunan kuil di Jawa Tengah Indonesia"
    },
    "description": {
      "en": "Borobudur, also transcribed Barabudur, is a 9th-century Mahayana Buddhist temple in Magelang Regency, near the town of Muntilan, northwest of the city of Yogyakarta, in Central Java, Indonesia.",
      "id": "Candi Borobudur adalah sebuah candi Buddha yang terletak di Borobudur, Magelang, Jawa Tengah, Indonesia. Candi ini terletak kurang lebih 100 km di sebelah barat daya Semarang, 86 km di sebelah barat Surakarta, dan 40 km di sebelah barat laut Yogyakarta. Candi dengan banyak stupa ini didirikan oleh para penganut agama Buddha Mahayana sekitar tahun 800-an Masehi pada masa pemerintahan wangsa Syailendra, dan diperkirakan baru rampung sekitar tahun 825 M. Borobudur adalah candi atau kuil Buddha terbesar di dunia, sekaligus salah satu monumen Buddha terbesar di dunia."
    },
    "history": {
      "en": "Constructed by the Sailendra dynasty abandoned for centuries then rediscovered in 1814.",
      "id": "Dibangun oleh dinasti Sailendra ditinggalkan selama berabad-abad kemudian ditemukan kembali pada 1814."
    },
    "culture": {
      "en": "Site of Waisak celebrations where thousands of monks gather to honor Buddha's birth.",
      "id": "Lokasi perayaan Waisak di mana ribuan biksu berkumpul untuk menghormati kelahiran Buddha."
    },
    "activities": [
      {
        "en": "Sunrise temple tour",
        "id": "Tur candi matahari terbit"
      },
      {
        "en": "Relief storytelling walk",
        "id": "Jelajah cerita relief"
      }
    ],
    "culinary": [
      {
        "en": "Gudeg Jogja",
        "id": "Gudeg Jogja"
      },
      {
        "en": "Bakpia Pathok",
        "id": "Bakpia Pathok"
      }
    ],
    "tips": {
      "en": "Book sunrise tickets in advance; modest dress required.",
      "id": "Pesan tiket matahari terbit jauh hari; wajib berpakaian sopan."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "yogyakarta",
    "name": "Yogyakarta Palace & Malioboro",
    "region": "DI Yogyakarta",
    "island": "Java",
    "category": "culture",
    "coords": [
      110.3695,
      -7.7956
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_(2025)_-_img_02.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/6/69/Jogja_-_Kraton_Yogyakarta_-_Donopratono_gate_(2025)_-_img_02.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "z4p8Oih8xZs",
    "summary": {
      "en": "Royal palace complex in Yogyakarta, Indonesia",
      "id": "bangunan istana di Indonesia"
    },
    "description": {
      "en": "The Royal Palace of Yogyakarta is a palace complex in the city of Yogyakarta, Yogyakarta Special Region, Indonesia. It is the seat of the reigning Sultan of Yogyakarta and his family. The complex is a center of Javanese culture and contains a museum displaying royal artifacts. It is guarded by the Yogyakarta Kraton Guards.",
      "id": "Keraton Ngayogyakarta Hadiningrat atau Kraton Jogja ) merupakan istana resmi Kesultanan Ngayogyakarta Hadiningrat yang kini berlokasi di Kota Yogyakarta. Keraton ini didirikan oleh Sri Sultan Hamengkubuwana I pada tahun 1755 sebagai Istana/Keraton Yogyakarta yang baru berdiri akibat perpecahan Mataram Islam dengan adanya Perjanjian Giyanti. Keraton ini adalah pecahan dari Keraton Surakarta Hadiningrat dari Mataram Islam Surakarta. Sehingga dinasti Mataram diteruskan oleh 2 Kerajaan yakni Kesultanan Yogyakarta dan Kesunanan Surakarta. Total luas wilayah keseluruhan keraton yogyakarta mencapai 144 hektar, yakni meliputi seluruh area di dalam benteng Baluwarti, alun-alun Lor, alun-alun Kidul, gapura Gladak, dan kompleks Masjid Gedhe Yogyakarta. Sementara luas dari kedhaton mencapai 13 hektar."
    },
    "history": {
      "en": "Founded in 1755 Yogyakarta retains a constitutional monarchy within Indonesia.",
      "id": "Didirikan tahun 1755 Yogyakarta mempertahankan monarki konstitusional dalam Indonesia."
    },
    "culture": {
      "en": "Wayang shadow puppetry batik tulis and classical Javanese dance.",
      "id": "Wayang kulit batik tulis dan tari klasik Jawa."
    },
    "activities": [
      {
        "en": "Kraton tour",
        "id": "Tur Kraton"
      },
      {
        "en": "Shop at Malioboro",
        "id": "Belanja di Malioboro"
      }
    ],
    "culinary": [
      {
        "en": "Gudeg",
        "id": "Gudeg"
      },
      {
        "en": "Bakpia",
        "id": "Bakpia"
      }
    ],
    "tips": {
      "en": "Try batik workshops in Kotagede.",
      "id": "Ikuti workshop batik di Kotagede."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "bromo",
    "name": "Mount Bromo",
    "region": "East Java",
    "island": "Java",
    "category": "volcano",
    "coords": [
      112.953,
      -7.942
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/8/8e/Bromo-Semeru-Batok-Widodaren.jpg"
    ],
    "ambience": "mountain",
    "youtubeId": "QbweRSMoQbI",
    "summary": {
      "en": "Somma volcano in Indonesia",
      "id": "gunung berapi di Indonesia"
    },
    "description": {
      "en": "The Bromo, or Mount Bromo, is an active somma volcano, a Hindu pilgrimage site, and part of the Tengger mountains, in East Java, Indonesia. At 2,329 meters (7,641 ft), it is not the highest peak of the massif, but is the most active and famous. The area is one of the most visited tourist destinations in East Java, and the volcano is included in the Bromo Tengger Semeru National Park. The name Bromo comes from the Javanese pronunciation of Brahma, the Hindu god of creation. At the mouth of the crater, there is an idol of Ganesha, the Hindu god of wisdom, which is worshipped by Javanese Hindus. Mount Bromo is located in the middle of a plain called \"Sea of Sand\", a nature reserve that has been protected since 1919.",
      "id": "Gunung Bromo atau dalam bahasa Tengger dieja \"Brama\", juga disebut Kaldera Tengger, adalah sebuah gunung berapi aktif di Jawa Timur, Indonesia. Gunung ini memiliki ketinggian 2.614 meter di atas permukaan laut dan berada dalam empat wilayah kabupaten, yakni Kabupaten Probolinggo, Kabupaten Pasuruan, Kabupaten Lumajang, dan Kabupaten Malang. Gunung Bromo terkenal sebagai objek wisata utama di Jawa Timur. Sebagai sebuah objek wisata, Bromo menjadi menarik karena statusnya sebagai gunung berapi yang masih aktif. Gunung Bromo termasuk dalam kawasan Taman Nasional Bromo Tengger Semeru."
    },
    "history": {
      "en": "Sacred to the Tenggerese people Bromo hosts the annual Yadnya Kasada ceremony.",
      "id": "Disakralkan oleh masyarakat Tengger Bromo menjadi tempat upacara tahunan Yadnya Kasada."
    },
    "culture": {
      "en": "The Tenggerese maintain Hindu traditions in a Muslim-majority region.",
      "id": "Masyarakat Tengger mempertahankan tradisi Hindu di wilayah mayoritas Muslim."
    },
    "activities": [
      {
        "en": "Sunrise jeep tour",
        "id": "Tur jeep matahari terbit"
      },
      {
        "en": "Crater rim hike",
        "id": "Pendakian tepi kawah"
      }
    ],
    "culinary": [
      {
        "en": "Nasi Aron",
        "id": "Nasi Aron"
      },
      {
        "en": "Pokak ginger drink",
        "id": "Minuman jahe Pokak"
      }
    ],
    "tips": {
      "en": "Bring warm layers — pre-dawn temperatures drop to 5°C.",
      "id": "Bawa pakaian hangat — suhu sebelum fajar bisa turun hingga 5°C."
    },
    "bestSeason": {
      "en": "April – October",
      "id": "April – Oktober"
    }
  },
  {
    "id": "tanahlot",
    "name": "Tanah Lot",
    "region": "Bali",
    "island": "Bali",
    "category": "culture",
    "coords": [
      115.0867,
      -8.6212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8d/TanahLot_2014.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/TanahLot_2014.JPG"
    ],
    "ambience": "beach",
    "youtubeId": "enwvM0D34sc",
    "summary": {
      "en": "Rock formation off the coast of Bali, Indonesia",
      "id": "bangunan kuil di Indonesia"
    },
    "description": {
      "en": "Tanah Lot is a rock formation off the Indonesian island of Bali. It is home to the ancient Hindu pilgrimage temple Pura Tanah Lot, a popular tourist and cultural icon for photography.",
      "id": "Pura Tanah Lot adalah salah satu Pura yang sangat disucikan di Bali, Indonesia. Nama Tanah Lot berasal dari kata \"tanah\" yang artinya tanah atau pulau dan \"lot\" atau lod yang artinya laut. Sehingga nama Tanah Lot dapat diartikan sebagai sebuah tanah atau pulau yang terletak di laut. Di sini ada dua Pura yang terletak di atas batu besar. Satu terletak di atas bongkahan batu dan satunya terletak di atas tebing mirip dengan Pura Uluwatu. Pura Tanah Lot ini merupakan bagian dari Pura Dang Kahyangan. Pura Tanah Lot merupakan Pura laut tempat pemujaan dewa-dewa penjaga laut. Tanah Lot terkenal sebagai tempat yang indah untuk melihat matahari terbenam."
    },
    "history": {
      "en": "Founded by the priest Dang Hyang Nirartha during his journey along the Balinese coast.",
      "id": "Didirikan oleh pendeta Dang Hyang Nirartha dalam perjalanannya di pesisir Bali."
    },
    "culture": {
      "en": "An important pilgrimage site honoring sea deities.",
      "id": "Situs ziarah penting yang menghormati dewa laut."
    },
    "activities": [
      {
        "en": "Sunset photography",
        "id": "Fotografi matahari terbenam"
      },
      {
        "en": "Kecak fire dance",
        "id": "Tari kecak api"
      }
    ],
    "culinary": [
      {
        "en": "Babi guling",
        "id": "Babi guling"
      },
      {
        "en": "Sate Lilit",
        "id": "Sate Lilit"
      }
    ],
    "tips": {
      "en": "Arrive 90 minutes before sunset for the best vantage.",
      "id": "Datang 90 menit sebelum matahari terbenam untuk titik terbaik."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "rinjani",
    "name": "Mount Rinjani",
    "region": "Nusa Tenggara Barat",
    "island": "Lesser Sunda",
    "category": "volcano",
    "coords": [
      116.4578,
      -8.4115
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4c/KAGAGAHAN_RIJANI.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/KAGAGAHAN_RIJANI.jpg"
    ],
    "ambience": "mountain",
    "youtubeId": "B8coTTVD-FU",
    "summary": {
      "en": "Active volcano in Lombok, Indonesia",
      "id": "gunung di Indonesia"
    },
    "description": {
      "en": "Mount Rinjani is an active stratovolcano situated in regencial North Lombok of West Nusa Tenggara province on the Indonesian island of Lombok. It reaches an elevation of 3,726 metres (12,224 ft), making it the second-highest volcano in Indonesia and the highest point in the province of West Nusa Tenggara.",
      "id": "Gunung Rinjani adalah gunung berapi stratovulkano aktif yang terletak di wilayah Lombok Utara, Nusa Tenggara Barat, di pulau Lombok, Indonesia. Gunung ini mencapai ketinggian 3.726 meter (12.224 ft), menjadikannya gunung berapi tertinggi kedua di Indonesia dan titik tertinggi di provinsi Nusa Tenggara Barat."
    },
    "history": {
      "en": "The massive eruption of Samalas in 1257 triggered global climate cooling.",
      "id": "Letusan dahsyat Samalas pada tahun 1257 memicu pendinginan iklim global."
    },
    "culture": {
      "en": "Sacred to Sasak Muslims and Balinese Hindus who leave offerings.",
      "id": "Disakralkan oleh umat Sasak dan Hindu Bali yang meninggalkan sesaji."
    },
    "activities": [
      {
        "en": "Summit climb",
        "id": "Pendakian puncak"
      },
      {
        "en": "Camping at Segara Anak lake",
        "id": "Berkemah di danau Segara Anak"
      }
    ],
    "culinary": [
      {
        "en": "Ayam Taliwang",
        "id": "Ayam Taliwang"
      },
      {
        "en": "Pelecing Kangkung",
        "id": "Pelecing Kangkung"
      }
    ],
    "tips": {
      "en": "Prepare proper hiking gear; hiring a local guide is mandatory.",
      "id": "Siapkan peralatan mendaki yang memadai; menyewa pemandu wajib."
    },
    "bestSeason": {
      "en": "April – October",
      "id": "April – Oktober"
    }
  },
  {
    "id": "komodo",
    "name": "Komodo Island",
    "region": "Nusa Tenggara Timur",
    "island": "Lesser Sunda",
    "category": "park",
    "coords": [
      119.4914,
      -8.5485
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Komodo_dragon_at_Komodo_National_Park.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "bSvQ4ZYwJH8",
    "summary": {
      "en": "National park in Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Komodo National Park is a national park in Indonesia located within the Lesser Sunda Islands in the border region between the provinces of East Nusa Tenggara and West Nusa Tenggara. The park includes the three larger islands Komodo, Padar and Rinca, and 26 smaller ones, with a total area of 1,733 km2 (669 sq mi), with 603 km2 (233 sq mi) of it land. The national park was founded in 1980 to protect the Komodo dragon, the world's largest lizard. Later it was dedicated to protecting other species, including marine species. In 1991 the national park was declared a UNESCO World Heritage Site and a Man and Biosphere Reserve. It is considered one of the world's 25 biodiversity hotspots.",
      "id": "Taman Nasional Komodo adalah kawasan konservasi yang terletak di daerah administrasi Provinsi Nusa Tenggara Timur, Indonesia. Taman nasional ini dapat diakses melalui Labuan Bajo yang merupakan pintu gerbang utama menuju kawasan ini."
    },
    "history": {
      "en": "Komodo dragons evolved here in isolation over millions of years.",
      "id": "Komodo berevolusi di sini secara terisolasi selama jutaan tahun."
    },
    "culture": {
      "en": "The Ata Modo people share ancestral stories of being descendants of a dragon princess.",
      "id": "Suku Ata Modo mewariskan kisah leluhur sebagai keturunan putri naga."
    },
    "activities": [
      {
        "en": "Dragon ranger trek",
        "id": "Trek ranger naga"
      },
      {
        "en": "Padar Island hike",
        "id": "Pendakian Pulau Padar"
      },
      {
        "en": "Pink Beach snorkel",
        "id": "Snorkeling Pantai Pink"
      }
    ],
    "culinary": [
      {
        "en": "Se'i smoked fish",
        "id": "Ikan asap Se'i"
      },
      {
        "en": "Golo fish",
        "id": "Ikan Golo"
      }
    ],
    "tips": {
      "en": "Always hike with a ranger.",
      "id": "Selalu mendaki dengan ranger."
    },
    "bestSeason": {
      "en": "April – December",
      "id": "April – Desember"
    }
  },
  {
    "id": "khatulistiwa",
    "name": "Equator Monument",
    "region": "West Kalimantan",
    "island": "Kalimantan",
    "category": "heritage",
    "coords": [
      109.3192,
      0.0012
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/ce/Eksterior_Tugu_Khatulistiwa_Pontianak_(2026).jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/ce/Eksterior_Tugu_Khatulistiwa_Pontianak_(2026).jpg"
    ],
    "ambience": "culture",
    "youtubeId": "UT4hhCPNje8",
    "summary": {
      "en": "Historic monument marking the Earth equator line.",
      "id": "monumen di Indonesia"
    },
    "description": {
      "en": "A historic monument located in Pontianak exactly on the Earth equator line.",
      "id": "Tugu Khatulistiwa adalah sebuah bangunan yang berfungsi sebagai penanda area atau titik yang dilewati garis khatulistiwa. Tugu ini juga merupakan salah satu tempat bersejarah yang terdapat di Kalimantan Barat, serta menjadi objek wisata di Kota Pontianak. Selain sebagai tempat wisata, tugu ini berfungsi sebagai sumber pembelajaran karena merupakan lokasi penelitian astronomi dan juga untuk wisata edukasi."
    },
    "history": {
      "en": "First built in 1928 by a Dutch geographer reconstructed multiple times since.",
      "id": "Pertama kali dibangun pada tahun 1928 oleh geograf Belanda direkonstruksi beberapa kali."
    },
    "culture": {
      "en": "Represents the geographic pride of Pontianak the Equator City.",
      "id": "Melambangkan kebanggaan geografis kota Pontianak sebagai Kota Khatulistiwa."
    },
    "activities": [
      {
        "en": "View shadows disappear on equinox",
        "id": "Lihat bayangan menghilang saat ekuinoks"
      },
      {
        "en": "Explore museum",
        "id": "Jelajahi museum"
      }
    ],
    "culinary": [
      {
        "en": "Chai Kue",
        "id": "Chai Kue"
      },
      {
        "en": "Pontianak orange juice",
        "id": "Es jeruk Pontianak"
      }
    ],
    "tips": {
      "en": "Visit during March 21-23 or September 21-23 to see shadowless phenomena.",
      "id": "Kunjungi selama 21-23 Maret atau 21-23 September untuk melihat fenomena tanpa bayangan."
    },
    "bestSeason": {
      "en": "March – September",
      "id": "Maret – September"
    }
  },
  {
    "id": "tanjungputing",
    "name": "Tanjung Puting National Park",
    "region": "Central Kalimantan",
    "island": "Kalimantan",
    "category": "park",
    "coords": [
      111.9312,
      -2.9015
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6c/Tanjung-Puting90153.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/6/6c/Tanjung-Puting90153.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "m0EY-GFn6Rc",
    "summary": {
      "en": "National park in Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Tanjung Puting National Park is a national park in Indonesia located along the Sekonyer River in the southeast part of West Kotawaringin Regency in the Indonesian province of Central Kalimantan. The nearest main town is the capital of the Regency, Pangkalan Bun. The park is famous for its orangutan conservation.",
      "id": "Taman Nasional Tanjung Puting adalah sebuah taman nasional yang terletak di semenanjung barat daya provinsi Kalimantan Tengah."
    },
    "history": {
      "en": "Camp Leakey was established in 1971 by Dr. Biruté Galdikas.",
      "id": "Camp Leakey didirikan tahun 1971 oleh Dr. Biruté Galdikas."
    },
    "culture": {
      "en": "Dayak and Malay communities maintain deep forestry customs.",
      "id": "Komunitas Dayak dan Melayu menjaga adat istiadat kehutanan yang mendalam."
    },
    "activities": [
      {
        "en": "Klotok houseboat cruise",
        "id": "Pelayaran perahu klotok"
      },
      {
        "en": "Camp Leakey feeding visit",
        "id": "Kunjungan pemberian makan Camp Leakey"
      }
    ],
    "culinary": [
      {
        "en": "Soto Banjar",
        "id": "Soto Banjar"
      },
      {
        "en": "Sweet river prawn",
        "id": "Udang galah sungai"
      }
    ],
    "tips": {
      "en": "Mosquito repellent is essential for forest walks.",
      "id": "Cairan anti-nyamuk sangat penting untuk jalan-jalan di hutan."
    },
    "bestSeason": {
      "en": "June – September",
      "id": "Juni – September"
    }
  },
  {
    "id": "lokbaintan",
    "name": "Lok Baintan Floating Market",
    "region": "South Kalimantan",
    "island": "Kalimantan",
    "category": "culture",
    "coords": [
      114.6732,
      -3.2912
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Floating_Market_Lok_Baintan%2C_Lok_Baintan_Port.JPG"
    ],
    "ambience": "village",
    "youtubeId": "MQv7PEchnuY",
    "summary": {
      "en": "Traditional market on boats since the Banjar Sultanate.",
      "id": "pusat perbelanjaan di Indonesia"
    },
    "description": {
      "en": "A vibrant floating market where traders sell agricultural goods from wooden boats called jukung.",
      "id": "Pasar Terapung Lok Baintan atau Pasar Terapung Sungai Martapura adalah sebuah pasar terapung tradisional yang berlokasi di desa Sungai Pinang, kecamatan Sungai Tabuk, Banjar. Secara umum, Pasar Terapung Lok Baintan tak beda dengan Pasar Terapung di muara Sungai Kuin/Sungai Barito. Keduanya sama-sama pasar tradisional di atas perahu atau dalam bahasa Banjar disebut jukung yang menjual beragam dagangan, seperti hasil produksi pertanian/perkebunan dan berlangsung tidak terlalu lama, paling lama sekitar tiga hingga empat jam. Pasar terapung ini sudah ada sejak zaman Kesultanan Banjar."
    },
    "history": {
      "en": "Has operated since the Banjar Sultanate era representing centuries of river trade.",
      "id": "Telah beroperasi sejak era Kesultanan Banjar mewakili perdagangan sungai berabad-abad."
    },
    "culture": {
      "en": "Reflects the Banjar people's river life and trading tradition.",
      "id": "Mencerminkan kehidupan sungai suku Banjar dan tradisi perdagangan."
    },
    "activities": [
      {
        "en": "Ride a traditional jukung",
        "id": "Naik jukung tradisional"
      },
      {
        "en": "Buy fresh tropical fruits",
        "id": "Beli buah-buahan segar"
      }
    ],
    "culinary": [
      {
        "en": "Soto Banjar",
        "id": "Soto Banjar"
      },
      {
        "en": "Ketupat Kandangan",
        "id": "Ketupat Kandangan"
      }
    ],
    "tips": {
      "en": "Arrive early by 6:00 AM as the market finishes by mid-morning.",
      "id": "Datanglah pagi-pagi pukul 06.00 karena pasar selesai pada pertengahan pagi."
    },
    "bestSeason": {
      "en": "Dry Season (June – September)",
      "id": "Musim Kemarau (Juni – September)"
    }
  },
  {
    "id": "derawan",
    "name": "Derawan Islands",
    "region": "East Kalimantan",
    "island": "Kalimantan",
    "category": "beach",
    "coords": [
      118.2562,
      2.2842
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/4e/Derawan_Island_East_Kalimantan.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Derawan_Island_East_Kalimantan.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "oTygxbBggYE",
    "summary": {
      "en": "Island group in Indonesia",
      "id": "kepulauan di Indonesia"
    },
    "description": {
      "en": "The Derawan Islands are in the province of East Kalimantan in Indonesia. They consist of 31 islands, most well known among these are the islands of Derawan, Kakaban, Maratua, and Sangalaki. There are also numerous submerged reefs and islets. They are located in the Sulawesi Sea, on the coastal shelf of East Kalimantan. The islands are part of the Berau Regency.",
      "id": "Kepulauan Derawan adalah sebuah kepulauan yang berada di Kabupaten Berau, Kalimantan Timur. Di kepulauan ini terdapat sejumlah objek wisata bahari menawan, salah satunya Taman Bawah Laut yang diminati wisatawan mancanegara terutama para penyelam kelas dunia."
    },
    "history": {
      "en": "Protected as a marine sanctuary to preserve vital nesting grounds.",
      "id": "Dilindungi sebagai suaka margasatwa laut untuk menjaga tempat peneluran vital."
    },
    "culture": {
      "en": "Home to Bajau Laut (Sea Gypsies) communities known for free-diving.",
      "id": "Rumah bagi komunitas Bajau Laut (Gipsi Laut) yang dikenal karena free-diving."
    },
    "activities": [
      {
        "en": "Swim in Kakaban jellyfish lake",
        "id": "Berenang di danau ubur-ubur Kakaban"
      },
      {
        "en": "Turtle nesting observation",
        "id": "Pengamatan peneluran penyu"
      }
    ],
    "culinary": [
      {
        "en": "Tehe-tehe stuffed sea urchin",
        "id": "Tehe-tehe bulu babi isi ketan"
      },
      {
        "en": "Elai tropical fruit",
        "id": "Buah Elai"
      }
    ],
    "tips": {
      "en": "Do not wear sunscreen when swimming in Kakaban lake to protect jellyfish.",
      "id": "Jangan memakai tabir surya saat berenang di danau Kakaban untuk menjaga ubur-ubur."
    },
    "bestSeason": {
      "en": "April – October",
      "id": "April – Oktober"
    }
  },
  {
    "id": "kayanmentarang",
    "name": "Kayan Mentarang National Park",
    "region": "North Kalimantan",
    "island": "Kalimantan",
    "category": "park",
    "coords": [
      115.9123,
      3.4212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/03/Gas_Station_A.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/0/03/Gas_Station_A.JPG"
    ],
    "ambience": "forest",
    "youtubeId": "oIVjfPNvUnI",
    "summary": {
      "en": "National park in Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Kayan Mentarang National Park is a densely forested national park located in the Indonesian province of North Kalimantan, on the island of Borneo. The national park is named after a great dispersed Mentarang mountain trails plateau of Apau Kayan which covers the entire park from Datadian area in south region to Apau Ping area in mid region until Long Bawan in north region.",
      "id": "Taman Nasional Kayan Mentarang (TNKM), ditetapkan pertama kali pada tahun 1980 sebagai Cagar Alam oleh Menteri Pertanian Indonesia. Kemudian pada tahun 1996, atas desakan masyarakat lokal (adat) dan rekomendasi dari WWF, kawasan ini diubah statusnya menjadi Taman Nasional agar kepentingan masyarakat lokal dapat diakomodasikan. TNKM memiliki kawasan hutan primer dan skunder tua terbesar yang masih tersisa di Pulau Borneo dan kawasan Asia Tenggara."
    },
    "history": {
      "en": "Declared a national park in 1996 protecting vital endemic species of Borneo.",
      "id": "Dinyatakan sebagai taman nasional pada tahun 1996 melindungi spesies endemik Kalimantan."
    },
    "culture": {
      "en": "Preserves ancestral Dayak archaeological sites and cultural stone monuments.",
      "id": "Melestarikan situs arkeologi Dayak leluhur dan monumen batu budaya."
    },
    "activities": [
      {
        "en": "Jungle hiking",
        "id": "Hiking hutan"
      },
      {
        "en": "Visit Dayak village",
        "id": "Kunjungi desa Dayak"
      }
    ],
    "culinary": [
      {
        "en": "Dayak rice wrapped in leaves",
        "id": "Nasi bungkus daun Dayak"
      },
      {
        "en": "Smoked jungle boar",
        "id": "Babi hutan asap"
      }
    ],
    "tips": {
      "en": "Permits are required in advance; hiring a local guide is mandatory.",
      "id": "Izin diperlukan terlebih dahulu; menyewa pemandu lokal adalah wajib."
    },
    "bestSeason": {
      "en": "May – October",
      "id": "May – Oktober"
    }
  },
  {
    "id": "bunaken",
    "name": "Bunaken Marine Park",
    "region": "North Sulawesi",
    "island": "Sulawesi",
    "category": "marine",
    "coords": [
      124.7612,
      1.6231
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bunaken01.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bunaken01.JPG"
    ],
    "ambience": "beach",
    "youtubeId": "ERkxRLFVQwg",
    "summary": {
      "en": "Marine park in the north of Sulawesi island, Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Bunaken National Park is a marine park in the north of Sulawesi Island, Indonesia. The park is located near the centre of the Coral Triangle, providing habitat to 390 species of coral as well as many fish, mollusks, reptiles and marine mammal species. The park is representative of Indonesian tropical water ecosystems, consisting of seagrass plains, coral reefs and coastal ecosystems.",
      "id": "Taman Nasional Bunaken adalah taman laut yang terletak di Sulawesi Utara, Indonesia. Taman ini terletak di Segitiga Terumbu Karang yang menjadi habitat bagi 390 spesies terumbu karang dan juga berbagai spesies ikan, moluska, reptil, dan mamalia laut. Taman Nasional Bunaken merupakan perwakilan ekosistem laut Indonesia, meliputi padang rumput laut, terumbu karang, dan ekosistem pantai."
    },
    "history": {
      "en": "Established in 1991 Bunaken was one of Indonesia's first marine national parks.",
      "id": "Didirikan tahun 1991 Bunaken adalah salah satu taman nasional laut pertama di Indonesia."
    },
    "culture": {
      "en": "Minahasa communities maintain fishing traditions and sustainable tourism.",
      "id": "Masyarakat Minahasa mempertahankan tradisi menangkap ikan dan pariwisata berkelanjutan."
    },
    "activities": [
      {
        "en": "Deep wall diving",
        "id": "Penyelaman dinding dalam"
      },
      {
        "en": "Dolphin watching boat tour",
        "id": "Tur melihat lumba-lumba"
      }
    ],
    "culinary": [
      {
        "en": "Tinutuan porridge",
        "id": "Bubur Tinutuan"
      },
      {
        "en": "Grilled fish with Dabu-Dabu",
        "id": "Ikan bakar Dabu-Dabu"
      }
    ],
    "tips": {
      "en": "Dry season offers visibility exceeding 30 meters.",
      "id": "Musim kemarau menawarkan visibilitas melebihi 30 meter."
    },
    "bestSeason": {
      "en": "May – October",
      "id": "Mei – Oktober"
    }
  },
  {
    "id": "togean",
    "name": "Togean Islands",
    "region": "Central Sulawesi",
    "island": "Sulawesi",
    "category": "marine",
    "coords": [
      121.8294,
      -0.4212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8d/TogianIslandMap.svg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/8/8d/TogianIslandMap.svg"
    ],
    "ambience": "beach",
    "youtubeId": "R2O8DCevSLY",
    "summary": {
      "en": "Island group in Indonesia",
      "id": "kepulauan di Indonesia"
    },
    "description": {
      "en": "The Togian Islands are an archipelago of 56 islands and many offshore islets, situated in the Gulf of Tomini, off the coast of Central Sulawesi, in Indonesia. The largest islands are Batudaka, Togean, Talatako, Una-Una, Walea Bahi, Walea Kodi and Malenge. There are 59 villages on the islands, with one settled by the Bajau people, more commonly known as the sea gypsies.",
      "id": "Kepulauan Togean merupakan sebuah kepulauan yang terletak di Kabupaten Tojo Una-Una, Provinsi Sulawesi Tengah, Indonesia. Panjang Kepulauan Togean sekurangnya 90 km."
    },
    "history": {
      "en": "Declared a marine national park in 2004 to protect pristine coral ecosystems.",
      "id": "Dinyatakan sebagai taman nasional laut tahun 2004 untuk melindungi ekosistem karang."
    },
    "culture": {
      "en": "Home to Bajau communities living in stilt villages over the ocean.",
      "id": "Rumah bagi komunitas Bajau yang tinggal di desa panggung di atas laut."
    },
    "activities": [
      {
        "en": "Snorkeling at Reef 1",
        "id": "Snorkeling di Terumbu Karang 1"
      },
      {
        "en": "Swim with stingless jellyfish",
        "id": "Berenang dengan ubur-ubur tanpa sengat"
      }
    ],
    "culinary": [
      {
        "en": "Traditional sago pancakes",
        "id": "Sagu lempeng tradisional"
      },
      {
        "en": "Seafood grill",
        "id": "Olahan laut bakar"
      }
    ],
    "tips": {
      "en": "Bring cash as there are no ATMs on the remote islands.",
      "id": "Bawa uang tunai karena tidak ada ATM di pulau-pulau terpencil."
    },
    "bestSeason": {
      "en": "August – October",
      "id": "Agustus – Oktober"
    }
  },
  {
    "id": "toraja",
    "name": "Tana Toraja",
    "region": "South Sulawesi",
    "island": "Sulawesi",
    "category": "culture",
    "coords": [
      119.8821,
      -3.0562
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ke'te'_Kesu'_1.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ke'te'_Kesu'_1.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "X46F0Q0X3Eo",
    "summary": {
      "en": "Regency in South Sulawesi, Indonesia",
      "id": "kabupaten di Provinsi Sulawesi Selatan"
    },
    "description": {
      "en": "Tana Toraja Regency is a landlocked regency (kabupaten) of South Sulawesi Province of Indonesia, and home to the Toraja ethnic group. It covers an area of 2,043.62 km2 (789.05 sq mi) and had a population of 221,081 at the 2010 census and 280,794 at the 2020 census; the official estimate as at mid 2022 was 291,046, but the total then fell and the official figure for mid 2025 was a much reduced total of 256,780.",
      "id": "Kabupaten Tana Toraja adalah salah satu kabupaten yang berada di Provinsi Sulawesi Selatan, Indonesia. Ibu kota dari kabupaten ini ada di kecamatan Makale. Tana Toraja memiliki luas wilayah 2.054,30 km² dan pada tahun 2023 memiliki penduduk sebanyak 257.901 jiwa dengan kepadatan 130 jiwa/km². Dan pada pertengahan 2024, penduduk Tana Teraja sebanyak 258.257 jiwa."
    },
    "history": {
      "en": "Maintained isolation in mountainous highlands for centuries.",
      "id": "Mempertahankan isolasi di dataran tinggi pegunungan selama berabad-abad."
    },
    "culture": {
      "en": "Rambu Solo death ceremony is a feast of buffalo sacrifices and sacred dances",
      "id": "Upacara kematian Rambu Solo adalah perayaan kurban kerbau dan tari sakral"
    },
    "activities": [
      {
        "en": "Visit Londa cliff graves",
        "id": "Mengunjungi makam tebing Londa"
      },
      {
        "en": "Explore Kete Kesu village",
        "id": "Menjelajahi desa Kete Kesu"
      }
    ],
    "culinary": [
      {
        "en": "Pa'piong meat",
        "id": "Pa'piong daging"
      },
      {
        "en": "Toraja coffee",
        "id": "Kopi Toraja"
      }
    ],
    "tips": {
      "en": "Wear modest clothing and act respectfully at grave sites.",
      "id": "Kenakan pakaian sopan dan bersikaplah hormat di situs makam."
    },
    "bestSeason": {
      "en": "June – September",
      "id": "Juni – September"
    }
  },
  {
    "id": "wakatobi",
    "name": "Wakatobi Marine Park",
    "region": "Southeast Sulawesi",
    "island": "Sulawesi",
    "category": "marine",
    "coords": [
      123.5821,
      -5.3212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wakatobi_beach_2006.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wakatobi_beach_2006.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "8_DhUi5rlA8",
    "summary": {
      "en": "Marine park in Southeast Sulawesi, Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "Wakatobi National Park is a marine national park in Southeast Sulawesi, Indonesia. It was established in 2002. The name of Wakatobi is a portmanteau of the four main Tukangbesi Islands: Wangi-wangi, Kaledupa, Tomia, and Binongko. Since 2005 the park is listed as a tentative World Heritage Site.",
      "id": "Taman Nasional Wakatobi adalah salah satu taman nasional di Indonesia. Letaknya di Kabupaten Wakatobi, Sulawesi Tenggara. Taman nasional ini ditetapkan pada tanggal 19 Agustus tahun 2002 berdasarkan Surat Keputusan Menteri kehutanan Nomor 7661/Kpts-II/2002. Lahan yang dipakai seluas 1,39 juta hektare. Sebelumnya, taman nasional ini juga telah ditetapkan oleh Surat Keputusan Menteri Kehutanan Nomor 393/Kpts-V/1996. Taman Nasional Wakatobi terdiri dari 25 gugusan terumbu karang sepanjang 600 km. Wakatobi merupakan akronim dari nama empat pulau besar, yaitu Pulau Wangi-wangi, Pulau Kaledupa, Pulau Tomia dan Pulau Binongko. Perairan lautnya beragam mulai dari yang datar, melandai ke arah laut, dan bertubir curam. Kedalaman airnya bervariasi dengan bagian terdalam 1.044 meter. Permukaan laut ini berpasir dan berkarang. Di taman nasional ini ada 112 jenis karang dari 13 famili."
    },
    "history": {
      "en": "Formed as a national park in 1996 conserving the heart of the Coral Triangle.",
      "id": "Dibentuk sebagai taman nasional tahun 1996 melestarikan jantung Segitiga Terumbu Karang."
    },
    "culture": {
      "en": "Local Bajo people possess legendary diving capabilities and ocean connection.",
      "id": "Masyarakat Bajo setempat memiliki kemampuan menyelam dan koneksi laut yang legendaris."
    },
    "activities": [
      {
        "en": "Diving at Tomia wall",
        "id": "Menyelam di dinding Tomia"
      },
      {
        "en": "Explore Bajo stilt village",
        "id": "Jelajahi desa panggung Bajo"
      }
    ],
    "culinary": [
      {
        "en": "Kasoami cassava bread",
        "id": "Kasoami roti singkong"
      },
      {
        "en": "Grilled fish",
        "id": "Ikan bakar"
      }
    ],
    "tips": {
      "en": "Perfect destination for scuba diving; check diving gears before departure.",
      "id": "Destinasi sempurna untuk scuba diving; periksa alat selam sebelum berangkat."
    },
    "bestSeason": {
      "en": "April – June & October – December",
      "id": "April – Juni & Oktober – Desember"
    }
  },
  {
    "id": "olele",
    "name": "Olele Marine Park",
    "region": "Gorontalo",
    "island": "Sulawesi",
    "category": "marine",
    "coords": [
      123.1532,
      0.4012
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/07/Teluk_Tomini.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Teluk_Tomini.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "e--C3KPx1no",
    "summary": {
      "en": "Unique marine park featuring Salvador Dali sponge corals.",
      "id": "Taman laut unik yang memiliki karang spons Salvador Dali."
    },
    "description": {
      "en": "A coastal marine reserve famous for Salvador Dali sponge corals unique only to this bay.",
      "id": "Cagar alam laut pesisir yang terkenal dengan karang spons Salvador Dali unik di teluk ini."
    },
    "history": {
      "en": "Established in 2005 to protect local marine environment in Tomini Gulf.",
      "id": "Didirikan tahun 2005 untuk melindungi lingkungan laut setempat di Teluk Tomini."
    },
    "culture": {
      "en": "Reflects the local Gorontalo fisherman custom and diving conservation efforts.",
      "id": "Mencerminkan adat nelayan Gorontalo setempat dan upaya konservasi penyelaman."
    },
    "activities": [
      {
        "en": "Snorkeling",
        "id": "Snorkeling"
      },
      {
        "en": "Glass-bottom boat ride",
        "id": "Naik perahu dasar kaca"
      }
    ],
    "culinary": [
      {
        "en": "Binthe Biluhuta soup",
        "id": "Sup Binthe Biluhuta"
      },
      {
        "en": "Ikan bakar Gorontalo",
        "id": "Ikan bakar Gorontalo"
      }
    ],
    "tips": {
      "en": "Snorkel gently to avoid damaging the rare sponge corals.",
      "id": "Snorkelinglah secara perlahan untuk menghindari kerusakan karang spons langka."
    },
    "bestSeason": {
      "en": "November – April",
      "id": "November – April"
    }
  },
  {
    "id": "pantaidato",
    "name": "Dato Beach",
    "region": "West Sulawesi",
    "island": "Sulawesi",
    "category": "beach",
    "coords": [
      118.9812,
      -3.5212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dato_Beach%2C_Majene.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dato_Beach%2C_Majene.JPG"
    ],
    "ambience": "beach",
    "youtubeId": "QhpPYOAqg1k",
    "summary": {
      "en": "Regency in West Sulawesi, Indonesia",
      "id": "Pantai berpasir dengan formasi batu kapur yang indah."
    },
    "description": {
      "en": "Majene Regency is one of the six regencies which comprise West Sulawesi Province, Indonesia, on the island of Sulawesi. The Regency covers a land area of 947.84 km2, and had a population of 151,197 at the 2010 Census and 174,407 at the 2020 Census; the official estimate as at mid 2025 was 191,626. The town of Majene in the far south of the regency is the administrative capital, and consists of two administrative districts - Banggae and Banggae Timur - with over 43% of the regency population between them.",
      "id": "Pantai pasir putih indah yang terbagi oleh tebing batu kapur menjulang unik."
    },
    "history": {
      "en": "Formed naturally through erosion presenting geological heritage of Majene.",
      "id": "Terbentuk secara alami melalui erosi menyajikan warisan geologi Majene."
    },
    "culture": {
      "en": "Reflects Mandar maritime culture and local fish trading activities.",
      "id": "Mencerminkan budaya maritim Mandar dan aktivitas perdagangan ikan setempat."
    },
    "activities": [
      {
        "en": "Climb limestone cliffs",
        "id": "Panjat tebing batu kapur"
      },
      {
        "en": "Sunset viewing",
        "id": "Melihat matahari terbenam"
      }
    ],
    "culinary": [
      {
        "en": "Jepa cassava flatbread",
        "id": "Roti pipih singkong Jepa"
      },
      {
        "en": "Grilled flying fish",
        "id": "Ikan terbang bakar"
      }
    ],
    "tips": {
      "en": "Climb the stairs up the cliff to get a panoramic view of the bay.",
      "id": "Naiki tangga ke atas tebing untuk menikmati pemandangan panorama teluk."
    },
    "bestSeason": {
      "en": "May – September",
      "id": "Mei – September"
    }
  },
  {
    "id": "bandaneira",
    "name": "Banda Neira",
    "region": "Maluku",
    "island": "Maluku",
    "category": "heritage",
    "coords": [
      129.9032,
      -4.5242
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/aa/Bandaneira-0039.JPG",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/a/aa/Bandaneira-0039.JPG"
    ],
    "ambience": "beach",
    "youtubeId": "sTVKCe8reio",
    "summary": {
      "en": "Island in Indonesia",
      "id": "pulau di Kabupaten Maluku Tengah, Maluku"
    },
    "description": {
      "en": "Banda Neira is an island in the Banda Islands, Indonesia. It is administered as part of the administrative Banda Islands District within the Central Maluku Regency in the province of Maluku. To the south is the main town of the same name, which is the largest town in the archipelago with around 7,000 inhabitants.",
      "id": "Banda Neira adalah salah satu pulau di Kepulauan Banda yang berfungsi sebagai pusat administratif Kecamatan Banda, Kabupaten Maluku Tengah, Maluku. Secara administratif, wilayah ini terdiri dari 12 Negeri, meliputi Dwiwarna, Kampung Baru, Merdeka, Nusantara, Rajawali, Tanah Rata, Lonthoir, Walang, Katoro, Kumber, Selamon, Dender, Waer, dan Pulau Hatta."
    },
    "history": {
      "en": "Fort Belgica was built in 1611 as the nutmeg trade headquarters.",
      "id": "Benteng Belgica dibangun tahun 1611 sebagai markas perdagangan pala."
    },
    "culture": {
      "en": "Banda culture blends Arab Dutch Chinese and native Melanesian heritage.",
      "id": "Budaya Banda memadukan warisan Arab Belanda Tionghoa dan Melanesia asli."
    },
    "activities": [
      {
        "en": "Explore Fort Belgica",
        "id": "Jelajahi Benteng Belgica"
      },
      {
        "en": "Snorkeling at Lava Flow",
        "id": "Snorkeling di Lava Flow"
      }
    ],
    "culinary": [
      {
        "en": "Nutmeg jam",
        "id": "Selai pala"
      },
      {
        "en": "Banda fish soup",
        "id": "Sup ikan Banda"
      }
    ],
    "tips": {
      "en": "Plan travel dates with room for seasonal weather delays.",
      "id": "Jadwalkan perjalanan dengan toleransi waktu untuk penundaan cuaca."
    },
    "bestSeason": {
      "en": "September – November & March – April",
      "id": "September – November & Maret – April"
    }
  },
  {
    "id": "sulamadaha",
    "name": "Sulamadaha Beach",
    "region": "North Maluku",
    "island": "Maluku",
    "category": "beach",
    "coords": [
      127.3292,
      0.8412
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ternate_in_sight.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ternate_in_sight.jpg"
    ],
    "ambience": "beach",
    "youtubeId": "KFANkXE_p-o",
    "summary": {
      "en": "Largest city in North Maluku, Indonesia",
      "id": "halaman disambiguasi Wikimedia"
    },
    "description": {
      "en": "Ternate, also known as the City of Ternate, is the \r\ncity with the largest population in the province of North Maluku and an island in the Maluku Islands, Indonesia. It was the de facto provincial capital of North Maluku before Sofifi on the nearby coast of Halmahera became the capital in 2010. It is off the west coast of Halmahera, and is composed of five islands: Ternate, the biggest and main island of the city, and Moti, Hiri, Tifure and Mayau. In total, the city has a land area of 162.20 square kilometres and had a total population of 185,705 according to the 2010 census, and 205,001 according to the 2020 census, with a density of 1,264 people per square kilometre; the official estimate as at mid 2024 was 210,836.",
      "id": "Ternate dapat mengacu pada beberapa hal berikut:Bahasa Ternate\r\nKesultanan Ternate\r\nKota Ternate\r\nSuku Ternate\r\nPulau Ternate"
    },
    "history": {
      "en": "Formerly a quiet shelter for local fishing boats now a marine eco geopark.",
      "id": "Dahulu pelabuhan tenang perahu nelayan setempat sekarang menjadi geopark laut."
    },
    "culture": {
      "en": "Local Moluccan maritime culture with bamboo rowboats and traditional fishing.",
      "id": "Budaya maritim Maluku setempat dengan perahu dayung bambu dan nelayan tradisional."
    },
    "activities": [
      {
        "en": "Rent a rowboat",
        "id": "Sewa perahu dayung"
      },
      {
        "en": "Snorkel in crystal water",
        "id": "Snorkeling di air kristal"
      }
    ],
    "culinary": [
      {
        "en": "Air Guraka ginger tea",
        "id": "Teh jahe Air Guraka"
      },
      {
        "en": "Grilled banana",
        "id": "Pisang goreng"
      }
    ],
    "tips": {
      "en": "Take a rowboat to Saomadaha cove nearby for the clearest glass-water experience.",
      "id": "Naik perahu dayung ke teluk Saomadaha terdekat untuk air kaca paling jernih."
    },
    "bestSeason": {
      "en": "October – April",
      "id": "Oktober – April"
    }
  },
  {
    "id": "sentani",
    "name": "Lake Sentani",
    "region": "Papua",
    "island": "Papua",
    "category": "ecotourism",
    "coords": [
      140.5292,
      -2.6012
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1a/Sentani_Lake.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/1/1a/Sentani_Lake.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "iugeUWtKE6I",
    "summary": {
      "en": "Lake in Papua, Indonesia",
      "id": "salah satu danau di dunia"
    },
    "description": {
      "en": "Lake Sentani is a tropical, shallow, and at low-altitude open lake located at the northeast extremity of the Jayapura Regency in the Indonesian province of Papua, about 20 kilometres (12 mi) from the provincial capital, Jayapura City. It is located just to the south of the town of Sentani.",
      "id": "Danau Sentani adalah danau yang terletak di Pulau Papua, Indonesia. Danau Sentani berada di bawah lereng selatan Pegunungan Cycloop yang merupakan Cagar Alam Pegunungan Cycloop dengan luas mencapai 22.500 ha (225 km2). Danau ini terbentang antara Kabupaten Jayapura dan Kota Jayapura, Provinsi Papua, Indonesia. Danau Sentani yang berada pada ketinggian 73 mdpl ini memiliki luas permukaan sekitar 104 km2 (10.400 ha) dan kedalaman mencapai 52 meter. Danau Sentani merupakan danau terluas di Papua dengan luas daerah tangkapan air (DTA) sekitar 74.100 ha (741 km2)."
    },
    "history": {
      "en": "Inhabited by native Sentani tribes preserving traditional lake dwelling and customs.",
      "id": "Dihuni oleh suku Sentani asli melestarikan rumah panggung dan adat danau."
    },
    "culture": {
      "en": "Sentani bark paintings and traditional war dances.",
      "id": "Lukisan kulit kayu Sentani dan tarian perang tradisional."
    },
    "activities": [
      {
        "en": "Take a lake boat tour",
        "id": "Ikuti tur perahu danau"
      },
      {
        "en": "Explore Asei island",
        "id": "Jelajahi pulau Asei"
      }
    ],
    "culinary": [
      {
        "en": "Papeda with yellow fish",
        "id": "Papeda kuah kuning"
      },
      {
        "en": "Sago caterpillars",
        "id": "Ulat sagu"
      }
    ],
    "tips": {
      "en": "Visit during the annual Lake Sentani Festival in June for rich cultural events.",
      "id": "Kunjungi festival tahunan Danau Sentani di bulan Juni untuk acara budaya kaya."
    },
    "bestSeason": {
      "en": "June – August",
      "id": "Juni – Agustus"
    }
  },
  {
    "id": "pegarfak",
    "name": "Arfak Mountains",
    "region": "Papua Barat",
    "island": "Papua",
    "category": "ecotourism",
    "coords": [
      133.9123,
      -1.3512
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/0/01/Arfak_Mountains.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "667gV_VFCxE",
    "summary": {
      "en": "Mountain range in Indonesia",
      "id": "pegunungan di Indonesia"
    },
    "description": {
      "en": "The Arfak Mountains is a mountain range found on the Bird's Head Peninsula in the Province of West Papua, Indonesia.",
      "id": "Pegunungan Arfak merupakan pegunungan yang terletak di Provinsi Papua Barat. Pegunungan ini terletak di sisi timur laut dari Semenanjung Kepala Burung. Pegunungan ini adalah daerah populer untuk pendakian dan puncak tertingginya adalah Gunung Arfak. Dari puncak-puncaknya, Kota Manokwari dapat terlihat. Puncak Pegunungan Arfak beriklim sedang dan kering dengan sangat panas, suhu musim panas kering yang rata-rata di bawah 35 °C dan ringan, suhu musim dingin lembap yang rata-rata di atas 3 °C. Selama musim dingin, puncak gunung es biasanya ada dan kadang-kadang bisa sampai 0,5 °C sesekali. Kadang-kadang salju dapat jatuh di puncak, tetapi tidak setiap tahun. Rata-rata jumlah hujan per tahun sekitar 45 inci."
    },
    "history": {
      "en": "Inhabited by the Arfak people who have deep customary forest protection laws.",
      "id": "Dihuni oleh suku Arfak yang memiliki hukum adat perlindungan hutan yang mendalam."
    },
    "culture": {
      "en": "The traditional houses are built on stilts and called 'kaki seribu'.",
      "id": "Rumah tradisional dibangun di atas panggung dan disebut kaki seribu."
    },
    "activities": [
      {
        "en": "Bird watching",
        "id": "Mengamati burung"
      },
      {
        "en": "Highland hiking",
        "id": "Mendaki dataran tinggi"
      }
    ],
    "culinary": [
      {
        "en": "Roasted sweet potato",
        "id": "Ubi jalar bakar"
      },
      {
        "en": "Jungle honey",
        "id": "Madu hutan"
      }
    ],
    "tips": {
      "en": "Warm clothing is necessary as temperature drops significantly at night.",
      "id": "Pakaian hangat diperlukan karena suhu turun drastis pada malam hari."
    },
    "bestSeason": {
      "en": "May – October",
      "id": "Mei – Oktober"
    }
  },
  {
    "id": "wasur",
    "name": "Wasur National Park",
    "region": "Papua Selatan",
    "island": "Papua",
    "category": "park",
    "coords": [
      140.7292,
      -8.4212
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Wasur_Rainbow_1994.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Wasur_Rainbow_1994.jpg"
    ],
    "ambience": "forest",
    "youtubeId": "3rdxwdADpro",
    "summary": {
      "en": "National park in Indonesia",
      "id": "taman nasional di Indonesia"
    },
    "description": {
      "en": "The Wasur National Park forms part of the largest wetland in Merauke Regency, South Papua, Indonesia and has been one of the least disturbed by human activity. The high value of its biodiversity has led to the park being dubbed the \"Serengeti of Papua\". The vast open wetland, in particular Rawa Biru Lake, attracts a very rich fauna.",
      "id": "Taman Nasional Wasur adalah salah satu taman nasional yang ada di Indonesia. Letaknya berada di bagian tenggara Provinsi Papua Selatan. Namanya merupakan nama salah satu desa di dalamnya. Nama tersebut berasal dari kata bahasa Marori yaitu Waisol yang berarti kebun. Taman Nasional Wasur merupakan lahan basah yang tergenang air selama 4 - 6 bulan dalam setahun. Di dalamnya terdapat habitat burung migran. Keseimbangan ekosistem di dalam Taman Nasional Wasur dipengaruhi oleh siklus air. Pada musim kemarau, rawa-rawa terbentuk karena air surut melalui parit-parit alami yang terhubung ke laut. Dalam sistem koordinat geografi, kawasan Taman Nasional Wasur terletak antara 140o 29' – 141o 00' Bujur Timur dan 08o 04' – 09o 07' Lintang Selatan. Dalam pembagian administratif Indonesia, Taman Nasional Wasur masuk dalam wilayah Kabupaten Merauke di 4 kecamatan."
    },
    "history": {
      "en": "Declared a national park in 1997 to protect the wetlands from agricultural sprawl.",
      "id": "Dinyatakan sebagai taman nasional pada tahun 1997 untuk melindungi lahan basah."
    },
    "culture": {
      "en": "Dayak Kanume tribe maintains traditional hunting and forest lore.",
      "id": "Suku Dayak Kanume menjaga perburuan tradisional dan adat hutan."
    },
    "activities": [
      {
        "en": "See Musamus termite mounds",
        "id": "Lihat sarang rayap Musamus"
      },
      {
        "en": "View migratory birds",
        "id": "Lihat burung migran"
      }
    ],
    "culinary": [
      {
        "en": "Sago porridge",
        "id": "Bubur sagu"
      },
      {
        "en": "Roast venison",
        "id": "Daging rusa bakar"
      }
    ],
    "tips": {
      "en": "Keep a safe distance from wild animals; follow ranger instructions.",
      "id": "Jaga jarak aman dari hewan liar; ikuti instruksi ranger."
    },
    "bestSeason": {
      "en": "July – November",
      "id": "Juli – November"
    }
  },
  {
    "id": "puncakjaya",
    "name": "Carstensz Pyramid",
    "region": "Papua Tengah",
    "island": "Papua",
    "category": "mountain",
    "coords": [
      137.1892,
      -4.0832
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Carstenzs_Piramida_Mountain.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Carstenzs_Piramida_Mountain.jpg"
    ],
    "ambience": "mountain",
    "youtubeId": "SLemquaAt-g",
    "summary": {
      "en": "Highest mountain in Indonesia and Oceania",
      "id": "gunung di Indonesia"
    },
    "description": {
      "en": "Puncak Jaya or Carstensz Pyramid on the island of New Guinea, with an elevation of 4,884 m (16,024 ft), is the highest mountain peak of an island on Earth, and the highest peak in Indonesia and within Oceania. The mountain is located in the Sudirman Range of the highlands of Mimika Regency, Central Papua, Indonesia. Puncak Jaya is ranked 5th in the world by topographic isolation.",
      "id": "Puncak Jaya adalah puncak tertinggi yang menjadi bagian dari Pegunungan Barisan Sudirman yang terdapat di Kabupaten Mimika, Provinsi Papua Tengah, Indonesia. Puncak Jaya atau Piramida Carstensz mempunyai ketinggian 4.884 mdpl dan di sekitarnya terdapat gletser dengan nama yang sama yakni gletser Carstensz, satu-satunya gletser tropika di Indonesia, yang tersisa dan secara perlahan mulai menipis akibat pemanasan global."
    },
    "history": {
      "en": "First climbed by Austrian mountaineer Heinrich Harrer in 1962.",
      "id": "Pertama kali didaki oleh pendaki Austria Heinrich Harrer tahun 1962."
    },
    "culture": {
      "en": "Inhabited by the Amungme people who hold the mountain as sacred ancestor origin.",
      "id": "Dihuni oleh suku Amungme yang menganggap gunung sebagai asal usul leluhur suci."
    },
    "activities": [
      {
        "en": "Glacier trekking",
        "id": "Trekking gletser"
      },
      {
        "en": "High altitude mountaineering",
        "id": "Pendakian gunung tinggi"
      }
    ],
    "culinary": [
      {
        "en": "Sago bread",
        "id": "Roti sagu"
      },
      {
        "en": "Wild boar",
        "id": "Babi hutan"
      }
    ],
    "tips": {
      "en": "Only for highly experienced climbers; requires special permits and preparation.",
      "id": "Hanya untuk pendaki berpengalaman; memerlukan izin khusus dan persiapan."
    },
    "bestSeason": {
      "en": "May – November",
      "id": "Mei – November"
    }
  },
  {
    "id": "baliem",
    "name": "Baliem Valley",
    "region": "Papua Pegunungan",
    "island": "Papua",
    "category": "culture",
    "coords": [
      138.9212,
      -4.0912
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b6/20170903_Papouasie_Baliem_valley_15.jpg",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/b/b6/20170903_Papouasie_Baliem_valley_15.jpg"
    ],
    "ambience": "culture",
    "youtubeId": "YXz8ze1QTF0",
    "summary": {
      "en": "Valley in western New Guinea",
      "id": "lembah di Indonesia"
    },
    "description": {
      "en": "The Baliem Valley is a valley of the Central Highlands in Western New Guinea, specifically in the province of Highland Papua, Indonesia. The main town in the valley is Wamena, which lies on the Baliem River. The valley is about 80 km in length by 20 km in width and lies at an altitude of about 1,600–1,700 metres (5,200–5,600 ft), with a population of over 200,000.",
      "id": "Lembah Baliem adalah lembah di wilayah Pegunungan Jayawijaya dan juga merupakan lokasi ibu kota Provinsi Papua Pegunungan, yaitu Kabupaten Jayawijaya. Lembah Baliem berada di ketinggian 1.600 meter dari permukaan laut yang dikelilingi pegunungan dengan pemandangannya yang indah dan masih alami. Suhu bisa mencapai 10-15 derajat celcius pada waktu malam."
    },
    "history": {
      "en": "Yali",
      "id": "dan Lani."
    },
    "culture": {
      "en": "A high valley in the Star Mountains preserving deep tribal customs and traditional farming.",
      "id": "Lembah tinggi di Pegunungan Bintang menjaga adat suku dan pertanian tradisional."
    },
    "activities": [
      {
        "en": "First documented in 1938 by Richard Archbold during his exploration flight.",
        "id": "Pertama kali didokumentasikan tahun 1938 oleh Richard Archbold dalam penerbangan eksplorasi."
      }
    ],
    "culinary": [
      {
        "en": "The Dani people maintain unique stone age traditions agricultural sweet potatoes.",
        "id": "Suku Dani mempertahankan tradisi zaman batu pertanian ubi jalar."
      }
    ],
    "tips": {
      "en": "Observe Dani festival;Walk traditional village",
      "id": "Saksikan festival Dani;Jalan di desa tradisional"
    },
    "bestSeason": {
      "en": "Sweet potato bake;Boiled pork",
      "id": "Bakar batu ubi jalar;Daging babi rebus"
    }
  },
  {
    "id": "rajaampat",
    "name": "Raja Ampat",
    "region": "Papua Barat Daya",
    "island": "Papua",
    "category": "marine",
    "coords": [
      130.5236,
      -0.2333
    ],
    "image": "https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png",
    "gallery": [
      "https://upload.wikimedia.org/wikipedia/commons/a/a1/Raja_Ampat_Islands_-_journal.pbio.1001457.g001.png"
    ],
    "ambience": "beach",
    "youtubeId": "QvCOu0FZ6Dg",
    "summary": {
      "en": "Archipelago in Southwest Papua, Indonesia",
      "id": "kepulauan di Indonesia"
    },
    "description": {
      "en": "Raja Ampat, or the Four Kings, is an archipelago located off of the northwest tip of Bird's Head Peninsula, Southwest Papua province, Indonesia. It comprises over 1,500 small islands, cays, and shoals around the four main islands of Misool, Salawati, Batanta, and Waigeo, and the smaller island of Kofiau.",
      "id": "Kepulauan Raja Ampat adalah gugusan kepulauan yang berlokasi di barat bagian Semenanjung Kepala Burung (Vogelkoop) Pulau Papua. Secara administrasi, gugusan ini berada di bawah Kabupaten Raja Ampat dan Kota Sorong, Provinsi Papua Barat Daya. Kepulauan ini sekarang menjadi tujuan para penyelam yang tertarik akan keindahan pemandangan bawah lautnya. Empat gugusan pulau yang menjadi anggotanya dinamakan menurut empat pulau terbesarnya, yaitu Pulau Waigeo, Pulau Misool, Pulau Salawati, dan Pulau Batanta. Perairan Kepulauan Raja Ampat memiliki sebaran 574 spesies terumbu karang dan 553 jenis ikan karang (bullseye) dan diketahui sebagai kawasan laut terkaya dengan keanekaragaman hayati tertinggi di dunia."
    },
    "history": {
      "en": "Named Four Kings after a legend of a woman who found seven eggs.",
      "id": "Disebut Empat Raja dari legenda seorang wanita yang menemukan tujuh telur."
    },
    "culture": {
      "en": "Home to Papuan communities preserving ancestral marine conservation tradition.",
      "id": "Rumah bagi komunitas Papua yang menjaga tradisi konservasi bahari leluhur."
    },
    "activities": [
      {
        "en": "Diving Misool & Wayag",
        "id": "Menyelam di Misool & Wayag"
      },
      {
        "en": "Karst viewpoints",
        "id": "Pemandangan pulau karst"
      },
      {
        "en": "Snorkel with mantas",
        "id": "Snorkeling pari manta"
      }
    ],
    "culinary": [
      {
        "en": "Papeda with yellow fish soup",
        "id": "Papeda dengan ikan kuning"
      },
      {
        "en": "Grilled reef fish",
        "id": "Ikan karang bakar"
      }
    ],
    "tips": {
      "en": "Bring reef-safe sunscreen.",
      "id": "Bawa tabir surya ramah karang."
    },
    "bestSeason": {
      "en": "October – April",
      "id": "Oktober – April"
    }
  }
];

export interface Village {
  id: string;
  name: string;
  region: string;
  image: string;
  about: Bilingual;
  highlights: Bilingual[];
  food: Bilingual;
  wisdom: Bilingual;
  destinationId?: string;
  youtubeId: string;
}

export const villages: Village[] = [
  {
    "id": "penglipuran",
    "name": "Penglipuran",
    "region": "Bali",
    "image": "https://upload.wikimedia.org/wikipedia/commons/8/8d/ID-bali-penglipuran-2.jpg",
    "about": {
      "en": "Penglipuran is one of the traditional villages or kampung located in Bangli Regency, Bali Province, Indonesia. The village is famous as a tourist destination in Bali because the villagers still preserve their traditional culture in their daily lives. The architecture of buildings and land processing still follow the concept of Tri Hita Karana, the philosophy of Balinese society regarding the balance of relations between God, humans and their environment. Penglipuran succeeded in building tourism that benefited all of its community without losing its culture and traditions. In 1995, Penglipuran also received a Kalpataru award from the Indonesian government for its efforts to protect the bamboo forest in their local ecosystem.",
      "id": "Penglipuran adalah salah satu desa adat dari Kabupaten Bangli, Provinsi Bali, Indonesia. Desa ini terkenal sebagai salah satu destinasi wisata di Bali karena masyarakatnya yang masih menjalankan dan melestarikan budaya tradisional Bali dalam kehidupan mereka sehari-hari. Arsitektur bangunan dan pengolahan lahan masih mengikuti konsep Tri Hita Karana, filosofi masyarakat Bali mengenai keseimbangan hubungan antara Tuhan, manusia, dan lingkungannya. Mereka berhasil membangun pariwisata yang menguntungkan seluruh masyarakatnya tanpa menghilangkan budaya dan tradisi mereka. Pada tahun 1995, desa Penglipuran juga mendapatkan penghargaan Kalpataru dari pemerintah Indonesia atas usahanya melindungi hutan bambu di ekosistem lokal mereka."
    },
    "highlights": [
      {
        "en": "Traditional Balinese architecture",
        "id": "Arsitektur tradisional Bali"
      },
      {
        "en": "Bamboo forest walk",
        "id": "Jelajah hutan bambu"
      },
      {
        "en": "Loloh Cemcem herbal drink",
        "id": "Minuman herbal Loloh Cemcem"
      }
    ],
    "food": {
      "en": "Loloh Cemcem drink",
      "id": "Loloh Cemcem"
    },
    "wisdom": {
      "en": "Tri Hita Karana — harmony between humans nature and the divine.",
      "id": "Tri Hita Karana — harmoni manusia alam dan Tuhan."
    },
    "youtubeId": "z1H6yeUmwng"
  },
  {
    "id": "waerebo",
    "name": "Wae Rebo",
    "region": "Flores",
    "image": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Wae_Rebo_di_Pagi_Hari.jpg",
    "about": {
      "en": "Waerebo or Wae Rebo is a village situated in the Manggarai Regency, East Nusa Tenggara. Located at 1,200 meters above sea level, the village is composed of 7 main houses, known as mbaru niang. In 2012, it was given Cultural Heritage Conservation status by UNESCO Asia Pacific. It is one of the cultural tourism destinations in Manggarai Regency, Indonesia.",
      "id": "Wae Rebo atau Waerebo adalah sebuah desa adat terpencil di Kabupaten Manggarai, Nusa Tenggara Timur. Wae Rebo merupakan salah satu destinasi wisata budaya di Kabupaten Manggarai. Terletak di ketinggian 1.200 meter di atas permukaan laut. Di kampung ini hanya terdapat 7 rumah utama atau yang disebut sebagai Mbaru Niang. Wae Rebo dinyatakan UNESCO sebagai Warisan Budaya Dunia pada Agustus 2012 dengan menyisihkan 42 negara lainnya. Wae sendiri dalam bahasa manggarai artinya ialah \"air\". Penulisan waerebo menggunakan 1 kata dan tidak memakai spasi seperti yang ditulis media. Desa Waerebo sendiri sudah berumur 1200 tahun dan sudah memasuki generasi ke 20. Dimana 1 generasi berusia 60 tahun lamanya."
    },
    "highlights": [
      {
        "en": "Three-hour jungle trek",
        "id": "Trek hutan tiga jam"
      },
      {
        "en": "Stay inside a Mbaru Niang",
        "id": "Menginap di Mbaru Niang"
      },
      {
        "en": "Manggarai coffee ritual",
        "id": "Ritual kopi Manggarai"
      }
    ],
    "food": {
      "en": "Manggarai coffee;Jagung bose",
      "id": "Kopi Manggarai;Jagung bose"
    },
    "wisdom": {
      "en": "Communal living and reverence for ancestors.",
      "id": "Hidup bersama dan penghormatan kepada leluhur."
    },
    "youtubeId": "SPQ7xIgeWGk"
  },
  {
    "id": "pentingsari",
    "name": "Pentingsari",
    "region": "Yogyakarta",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Joglo_Suyadi_%282%29.jpg",
    "about": {
      "en": "Pentingsari is an eco-tourism village located on the slopes of Mount Merapi in Sleman Regency, Yogyakarta. The village offers an authentic Javanese rural experience with traditional farming activities, Javanese cooking classes, gamelan music performances, and homestay packages in traditional Javanese houses (Joglo). Situated at 600 meters above sea level with views of Mount Merapi, it was awarded as one of the best tourism villages in Indonesia.",
      "id": "Pentingsari adalah desa wisata eko-wisata yang terletak di lereng Gunung Merapi, Kabupaten Sleman, Yogyakarta. Desa ini menawarkan pengalaman pedesaan Jawa yang autentik dengan kegiatan bertani tradisional, kelas memasak Jawa, pertunjukan musik gamelan, dan paket homestay di rumah Joglo tradisional. Berada pada ketinggian 600 meter di atas permukaan laut dengan pemandangan Gunung Merapi."
    },
    "highlights": [
      {
        "en": "Home-stay with farmers",
        "id": "Menginap bersama petani"
      },
      {
        "en": "Gamelan and batik classes",
        "id": "Kelas gamelan dan batik"
      },
      {
        "en": "Volcanic spring bathing",
        "id": "Mandi mata air vulkanik"
      }
    ],
    "food": {
      "en": "Sego godhog;Jadah tempe",
      "id": "Sego godhog;Jadah tempe"
    },
    "wisdom": {
      "en": "Living gently in the shadow of an active volcano.",
      "id": "Hidup selaras di bawah bayang gunung berapi aktif."
    },
    "youtubeId": "lx6cwqKLmSg"
  },
  {
    "id": "nglanggeran",
    "name": "Nglanggeran",
    "region": "Yogyakarta",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Embung_Nglanggeran.jpg",
    "about": {
      "en": "Nglanggeran is a village in Gunungkidul Regency, Yogyakarta, famous for its ancient volcano (Gunung Api Purba Nglanggeran), a 60-million-year-old extinct volcanic rock formation rising dramatically from the plain. The village offers trekking, camping, and cultural experiences amid breathtaking rock pillars. It has won the ASEAN Community-Based Tourism Award and is a model of sustainable community tourism.",
      "id": "Nglanggeran adalah sebuah desa di Kabupaten Gunungkidul, Yogyakarta, yang terkenal dengan gunung api purbanya (Gunung Api Purba Nglanggeran), formasi batu vulkanik berusia 60 juta tahun yang menjulang dari dataran. Desa ini menawarkan trekking, berkemah, dan pengalaman budaya di antara pilar batu yang menakjubkan. Desa ini telah meraih Penghargaan Pariwisata Berbasis Komunitas ASEAN."
    },
    "highlights": [
      {
        "en": "Sunrise at Nglanggeran peak",
        "id": "Matahari terbit di puncak Nglanggeran"
      },
      {
        "en": "Cacao chocolate workshop",
        "id": "Workshop coklat kakao"
      },
      {
        "en": "Embung reservoir overlook",
        "id": "Pemandangan embung"
      }
    ],
    "food": {
      "en": "Cacao chocolate;Gatot tiwul",
      "id": "Coklat kakao;Gatot tiwul"
    },
    "wisdom": {
      "en": "Community-led conservation of ancient geology.",
      "id": "Konservasi geologi purba oleh masyarakat."
    },
    "youtubeId": "VoUhmpfX5Pw"
  },
  {
    "id": "sade",
    "name": "Desa Sade",
    "region": "Lombok",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/43/Desa_Sade%2C_Lombok.jpg",
    "about": {
      "en": "Sade is a traditional Sasak village in Lombok, Nusa Tenggara Barat, preserving the indigenous culture of the Sasak people. The village consists of traditional cylindrical bamboo houses with buffalo dung-polished floors, and the community still practices traditional weaving (tenun) and ceremonies. Sade is one of the last authentic Sasak hamlets open to visitors, offering a window into pre-Islamic Lombok culture.",
      "id": "Sade adalah desa tradisional Sasak di Lombok, Nusa Tenggara Barat, yang melestarikan budaya asli suku Sasak. Desa ini terdiri dari rumah-rumah bambu silindris tradisional dengan lantai yang dipoles kotoran kerbau, dan komunitasnya masih mempraktikkan tenun tradisional dan upacara adat. Sade adalah salah satu dusun Sasak autentik terakhir yang terbuka untuk pengunjung."
    },
    "highlights": [
      {
        "en": "Songket weaving demonstration",
        "id": "Demonstrasi tenun Songket"
      },
      {
        "en": "Explore thatch-roofed Bale Tani",
        "id": "Jelajah rumah jerami Bale Tani"
      },
      {
        "en": "Gendang Beleq dance",
        "id": "Tarian Gendang Beleq"
      }
    ],
    "food": {
      "en": "Plecing Kangkung",
      "id": "Plecing Kangkung"
    },
    "wisdom": {
      "en": "Preserving heritage in simplicity and Sasak identity.",
      "id": "Menjaga warisan dalam kesederhanaan dan identitas Sasak."
    },
    "youtubeId": "mUvmrEw8WcM"
  },
  {
    "id": "pujonkidul",
    "name": "Desa Wisata Pujon Kidul",
    "region": "Malang",
    "image": "https://upload.wikimedia.org/wikipedia/commons/4/41/CAFE_SAWAH_PUJON_KIDUL.jpg",
    "about": {
      "en": "Pujon Kidul is an award-winning agro-tourism village in Malang Regency, East Java, known for its innovative community-based tourism model. The village sits at 1,200 meters above sea level amidst dairy farms, vegetable gardens, and stunning mountain scenery. Visitors can milk cows, pick fresh vegetables, enjoy café with panoramic views, and experience traditional Javanese farming life. It has been recognized as one of the best tourism villages in Indonesia by the Ministry of Tourism.",
      "id": "Pujon Kidul adalah desa agrowisata pemenang penghargaan di Kabupaten Malang, Jawa Timur, yang terkenal dengan model pariwisata berbasis komunitas yang inovatif. Desa ini berada pada ketinggian 1.200 meter di atas permukaan laut di antara peternakan sapi perah, kebun sayuran, dan pemandangan pegunungan yang menakjubkan. Pengunjung dapat memerah susu sapi, memetik sayuran segar, dan menikmati kehidupan pertanian Jawa tradisional."
    },
    "highlights": [
      {
        "en": "Organic farming crop harvesting",
        "id": "Panen tanaman organik"
      },
      {
        "en": "Sawah cafe dining",
        "id": "Makan di Cafe Sawah"
      },
      {
        "en": "Dairy farm milk processing",
        "id": "Pengolahan susu peternakan sapi"
      }
    ],
    "food": {
      "en": "Fresh milk;Steamed cassava",
      "id": "Susu sapi segar;Singkong kukus"
    },
    "wisdom": {
      "en": "Agro-forestry and self-sufficient economy led by local village youth.",
      "id": "Agro-forestry dan ekonomi mandiri yang dipimpin pemuda desa setempat."
    },
    "youtubeId": "wE8gKCST8aU"
  },
  {
    "id": "liangndara",
    "name": "Desa Liang Ndara",
    "region": "Flores",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/70/Caci_Dance.jpg",
    "about": {
      "en": "Liang Ndara is a traditional Manggarai village in West Manggarai Regency, Flores, located near the famous Wae Rebo. The village preserves authentic Manggarai culture including the traditional circular communal house (Mbaru Niang), traditional weaving (songket), and the caci whip-fighting ritual. The surrounding landscape features terraced rice fields, tropical forests, and mountain scenery characteristic of inland Flores.",
      "id": "Liang Ndara adalah sebuah desa tradisional Manggarai di Kabupaten Manggarai Barat, Flores, yang terletak dekat Wae Rebo yang terkenal. Desa ini melestarikan budaya Manggarai yang autentik termasuk rumah komunal melingkar tradisional (Mbaru Niang), tenun tradisional (songket), dan ritual adu cambuk caci. Lanskapnya menampilkan sawah terasering, hutan tropis, dan pemandangan gunung khas pedalaman Flores."
    },
    "highlights": [
      {
        "en": "Observe Caci whip dance",
        "id": "Saksikan tarian cambuk Caci"
      },
      {
        "en": "Traditional bamboo weaving workshop",
        "id": "Workshop anyaman bambu"
      },
      {
        "en": "Moke beverage tasting",
        "id": "Mencicipi minuman Moke"
      }
    ],
    "food": {
      "en": "Ubi nuabosi;Roast pork",
      "id": "Ubi nuabosi;Babi bakar"
    },
    "wisdom": {
      "en": "Caci is a dance of respect courage and spiritual offering.",
      "id": "Caci adalah tarian penghormatan keberanian dan persembahan spiritual."
    },
    "youtubeId": "tBiVQgON-Z0"
  },
  {
    "id": "ketekesu",
    "name": "Desa Kete Kesu",
    "region": "Toraja",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Ke%27te%27_Kesu%27.jpg",
    "about": {
      "en": "Ke'te' Kesu' is a traditional Toraja village and cultural heritage site in Tana Toraja, South Sulawesi. It is one of the most complete and well-preserved examples of a traditional Torajan settlement, featuring rows of stately Tongkonan clan houses with distinctive boat-shaped roofs, rice barns (alang), and elaborate wood carvings. Behind the village lies ancient cliff graves (liang) and hanging graves, some over 500 years old. The site is a UNESCO tentative world heritage listing.",
      "id": "Ke'te' Kesu' adalah sebuah desa tradisional Toraja dan situs warisan budaya di Tana Toraja, Sulawesi Selatan. Ini adalah salah satu contoh pemukiman Toraja tradisional yang paling lengkap dan terawat, menampilkan deretan rumah adat Tongkonan yang megah dengan atap berbentuk perahu, lumbung padi (alang), dan ukiran kayu yang rumit. Di belakang desa terdapat makam tebing kuno (liang) dan makam gantung, beberapa berusia lebih dari 500 tahun."
    },
    "highlights": [
      {
        "en": "Examine ancient Tongkonan",
        "id": "Amati Tongkonan kuno"
      },
      {
        "en": "Visit cliffhanging graves",
        "id": "Kunjungi kuburan tebing"
      },
      {
        "en": "Observe wood effigies Tau-Tau",
        "id": "Melihat patung kayu Tau-Tau"
      }
    ],
    "food": {
      "en": "Pa'piong;Toraja coffee",
      "id": "Pa'piong;Kopi Toraja"
    },
    "wisdom": {
      "en": "Reverence for the deceased viewing death as a transition.",
      "id": "Penghormatan kepada orang meninggal melihat kematian sebagai transisi."
    },
    "youtubeId": "J1cxByW9Arg"
  }
];

export interface Achievement {
  id: string;
  icon: string;
  title: Bilingual;
  description: Bilingual;
  requirement: (visited: string[]) => boolean;
}

const byIsland = (island: string, n: number) => (visited: string[]) =>
  destinations.filter((d) => d.island === island && visited.includes(d.id)).length >= n;

export const achievements: Achievement[] = [
  {
    id: "first-step",
    icon: "🌱",
    title: { en: "First Step", id: "Langkah Pertama" },
    description: { en: "Collect your first passport stamp.", id: "Kumpulkan cap paspor pertama." },
    requirement: (v) => v.length >= 1,
  },
  {
    id: "java-explorer",
    icon: "🛕",
    title: { en: "Java Explorer", id: "Penjelajah Jawa" },
    description: { en: "Visit 2 destinations in Java.", id: "Kunjungi 2 destinasi di Jawa." },
    requirement: byIsland("Java", 2),
  },
  {
    id: "bali-explorer",
    icon: "🌺",
    title: { en: "Bali Explorer", id: "Penjelajah Bali" },
    description: { en: "Visit 1 destination in Bali.", id: "Kunjungi 1 destinasi di Bali." },
    requirement: byIsland("Bali", 1),
  },
  {
    id: "sumatra-explorer",
    icon: "🐯",
    title: { en: "Sumatra Explorer", id: "Penjelajah Sumatra" },
    description: { en: "Visit 1 destination in Sumatra.", id: "Kunjungi 1 destinasi di Sumatra." },
    requirement: byIsland("Sumatra", 1),
  },
  {
    id: "marine-master",
    icon: "🐠",
    title: { en: "Marine Adventure Master", id: "Master Petualangan Bahari" },
    description: { en: "Stamp 2 marine destinations.", id: "Cap 2 destinasi bahari." },
    requirement: (v) =>
      destinations.filter((d) => d.category === "marine" && v.includes(d.id)).length >= 2,
  },
  {
    id: "grand-explorer",
    icon: "🏆",
    title: { en: "Indonesia Grand Explorer", id: "Penjelajah Agung Indonesia" },
    description: { en: "Collect 6 stamps.", id: "Kumpulkan 6 cap." },
    requirement: (v) => v.length >= 6,
  },
];

export interface QuizQuestion {
  q: Bilingual;
  options: Bilingual[];
  answer: number;
}

export const quiz: QuizQuestion[] = [
  {
    q: {
      en: "Which destination is known as the Island of the Gods?",
      id: "Destinasi mana yang dikenal sebagai Pulau Dewata?",
    },
    options: [
      { en: "Bali", id: "Bali" },
      { en: "Java", id: "Jawa" },
      { en: "Papua", id: "Papua" },
      { en: "Sumatra", id: "Sumatra" },
    ],
    answer: 0,
  },
  {
    q: {
      en: "Borobudur was built during which century?",
      id: "Borobudur dibangun pada abad ke berapa?",
    },
    options: [
      { en: "6th", id: "ke-6" },
      { en: "9th", id: "ke-9" },
      { en: "12th", id: "ke-12" },
      { en: "15th", id: "ke-15" },
    ],
    answer: 1,
  },
  {
    q: {
      en: "Raja Ampat is home to what percentage of known coral species?",
      id: "Raja Ampat adalah rumah bagi berapa persen spesies karang dunia?",
    },
    options: [
      { en: "25%", id: "25%" },
      { en: "50%", id: "50%" },
      { en: "75%", id: "75%" },
      { en: "95%", id: "95%" },
    ],
    answer: 2,
  },
  {
    q: {
      en: "Which lake is the largest volcanic lake in the world?",
      id: "Danau mana yang merupakan danau vulkanik terbesar di dunia?",
    },
    options: [
      { en: "Lake Maninjau", id: "Danau Maninjau" },
      { en: "Lake Toba", id: "Danau Toba" },
      { en: "Lake Singkarak", id: "Danau Singkarak" },
      { en: "Lake Kelimutu", id: "Danau Kelimutu" },
    ],
    answer: 1,
  },
  {
    q: {
      en: "Wae Rebo village is famous for its houses called?",
      id: "Desa Wae Rebo terkenal dengan rumah bernama?",
    },
    options: [
      { en: "Rumah Gadang", id: "Rumah Gadang" },
      { en: "Mbaru Niang", id: "Mbaru Niang" },
      { en: "Tongkonan", id: "Tongkonan" },
      { en: "Joglo", id: "Joglo" },
    ],
    answer: 1,
  },
];

export function t<T extends Bilingual>(obj: T, lang: Lang) {
  return obj[lang];
}
