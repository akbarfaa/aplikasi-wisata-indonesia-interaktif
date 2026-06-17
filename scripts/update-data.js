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

function generateTS() {
  const csvDir = path.join(__dirname, "../data");
  const destCSV = fs.readFileSync(path.join(csvDir, "destinations.csv"), "utf8");
  const villCSV = fs.readFileSync(path.join(csvDir, "villages.csv"), "utf8");

  const rawDests = parseCSV(destCSV);
  const rawVills = parseCSV(villCSV);

  const formattedDests = rawDests.map((d) => {
    const activities_en = d.activities_en ? d.activities_en.split(";").map(x => x.trim()) : [];
    const activities_id = d.activities_id ? d.activities_id.split(";").map(x => x.trim()) : [];
    const activities = activities_en.map((act, idx) => ({
      en: act,
      id: activities_id[idx] || act,
    }));

    const culinary_en = d.culinary_en ? d.culinary_en.split(";").map(x => x.trim()) : [];
    const culinary_id = d.culinary_id ? d.culinary_id.split(";").map(x => x.trim()) : [];
    const culinary = culinary_en.map((cul, idx) => ({
      en: cul,
      id: culinary_id[idx] || cul,
    }));

    const gallery = d.gallery ? d.gallery.split(";").map(x => x.trim()) : [];

    return {
      id: d.id,
      name: d.name,
      region: d.region,
      island: d.island,
      category: d.category,
      coords: [parseFloat(d.longitude), parseFloat(d.latitude)],
      image: d.image,
      gallery: gallery,
      ambience: d.ambience,
      youtubeId: d.youtubeId,
      summary: { en: d.summary_en, id: d.summary_id },
      description: { en: d.description_en, id: d.description_id },
      history: { en: d.history_en, id: d.history_id },
      culture: { en: d.culture_en, id: d.culture_id },
      activities: activities,
      culinary: culinary,
      tips: { en: d.tips_en, id: d.tips_id },
      bestSeason: { en: d.bestSeason_en, id: d.bestSeason_id },
    };
  });

  const formattedVills = rawVills.map((v) => {
    const highlights_en = v.highlights_en ? v.highlights_en.split(";").map(x => x.trim()) : [];
    const highlights_id = v.highlights_id ? v.highlights_id.split(";").map(x => x.trim()) : [];
    const highlights = highlights_en.map((hl, idx) => ({
      en: hl,
      id: highlights_id[idx] || hl,
    }));

    return {
      id: v.id,
      name: v.name,
      region: v.region,
      image: v.image,
      about: { en: v.about_en, id: v.about_id },
      highlights: highlights,
      food: { en: v.food_en, id: v.food_id },
      wisdom: { en: v.wisdom_en, id: v.wisdom_id },
      youtubeId: v.youtubeId || "",
    };
  });

  const codeContent = `import type { Lang } from "./i18n";

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

export const destinations: Destination[] = ${JSON.stringify(formattedDests, null, 2)};

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

export const villages: Village[] = ${JSON.stringify(formattedVills, null, 2)};

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
`;
  fs.writeFileSync(path.join(__dirname, "../src/lib/data.ts"), codeContent, "utf8");
  console.log("Successfully generated src/lib/data.ts from CSV datasets.");

  // Sync CSV files to public folder for open-source API download
  const publicDir = path.join(__dirname, "../public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  fs.copyFileSync(
    path.join(csvDir, "destinations.csv"),
    path.join(publicDir, "destinations.csv")
  );
  fs.copyFileSync(
    path.join(csvDir, "villages.csv"),
    path.join(publicDir, "villages.csv")
  );
  console.log("Successfully synchronized CSV datasets to public/ folder.");
}

generateTS();
