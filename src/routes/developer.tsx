import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/lib/contexts";
import { HiTerminal, HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { Database, Home } from "lucide-react";

export const Route = createFileRoute("/developer")({
  head: () => ({
    meta: [
      { title: "Open API Portal — Wisata Indonesia" },
      { name: "description", content: "Developer documentation for the Indonesian Tourism Open API." },
    ],
  }),
  component: DeveloperPage,
});

function DeveloperPage() {
  const { lang, t } = useLang();
  const [destResult, setDestResult] = useState<string | null>(null);
  const [villResult, setVillResult] = useState<string | null>(null);
  const [destLoading, setDestLoading] = useState(false);
  const [villLoading, setVillLoading] = useState(false);
  const [copiedDest, setCopiedDest] = useState(false);
  const [copiedVill, setCopiedVill] = useState(false);

  // Filter states
  const [destIsland, setDestIsland] = useState("");
  const [destCategory, setDestCategory] = useState("");
  const [villRegion, setVillRegion] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:8081";

  const destUrl = `${origin}/api/destinations${
    destIsland || destCategory
      ? `?${[
          destIsland ? `island=${destIsland}` : "",
          destCategory ? `category=${destCategory}` : "",
        ]
          .filter(Boolean)
          .join("&")}`
      : ""
  }`;

  const villUrl = `${origin}/api/villages${villRegion ? `?region=${villRegion}` : ""}`;

  async function testDestinations() {
    setDestLoading(true);
    try {
      const res = await fetch(destUrl);
      const data = await res.json();
      // limit displayed results for preview
      setDestResult(JSON.stringify(data.slice(0, 2), null, 2) + `\n\n// ... showing 2 of ${data.length} destinations`);
    } catch (err) {
      setDestResult("// Error fetching data: " + String(err));
    } finally {
      setDestLoading(false);
    }
  }

  async function testVillages() {
    setVillLoading(true);
    try {
      const res = await fetch(villUrl);
      const data = await res.json();
      setVillResult(JSON.stringify(data.slice(0, 2), null, 2) + `\n\n// ... showing 2 of ${data.length} villages`);
    } catch (err) {
      setVillResult("// Error fetching data: " + String(err));
    } finally {
      setVillLoading(false);
    }
  }

  function copyText(text: string, setCopied: (b: boolean) => void) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-xs uppercase tracking-[0.3em] text-tropical">Developer Resources</div>
        <h1 className="mt-2 font-serif text-4xl md:text-6xl">Open API Portal</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {lang === "id"
            ? "Integrasikan data pariwisata 38 provinsi dan desa wisata tradisional Indonesia yang lengkap dan akurat ke dalam aplikasi Anda secara gratis."
            : "Integrate complete, accurate tourism data of 38 Indonesian provinces and traditional villages into your applications for free."}
        </p>
      </motion.div>

      {/* Raw Datasets (CSV) Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/45 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-tropical/10 text-tropical">
              <Database className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm">Destinations Dataset (CSV)</h3>
              <p className="text-xs text-muted-foreground">38 Provinces, Coordinates, Descriptions, Culinary, Tips</p>
            </div>
          </div>
          <a 
            href="/destinations.csv" 
            download="destinations.csv"
            className="rounded-full bg-tropical/10 hover:bg-tropical px-3 py-1.5 text-xs font-bold text-tropical hover:text-midnight transition-colors"
          >
            Download CSV
          </a>
        </div>
        
        <div className="flex items-center justify-between rounded-2xl border border-border bg-card/45 p-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-tropical/10 text-tropical">
              <Home className="size-5" />
            </span>
            <div>
              <h3 className="font-bold text-sm">Tourist Villages Dataset (CSV)</h3>
              <p className="text-xs text-muted-foreground">8 Villages, About, Highlights, Food, Local Wisdom</p>
            </div>
          </div>
          <a 
            href="/villages.csv" 
            download="villages.csv"
            className="rounded-full bg-tropical/10 hover:bg-tropical px-3 py-1.5 text-xs font-bold text-tropical hover:text-midnight transition-colors"
          >
            Download CSV
          </a>
        </div>
      </motion.div>


      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {/* ENDPOINT 1: Destinations */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-cinema relative overflow-hidden">
          <div className="absolute right-4 top-4 text-xs font-bold uppercase tracking-widest text-tropical/30 flex items-center gap-1">
            <HiTerminal /> GET
          </div>
          <h2 className="font-serif text-2xl">1. Destinations API</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "id"
              ? "Mengembalikan daftar destinasi wisata Indonesia lengkap dengan koordinat koordinat, deskripsi bilingual, kuliner, dan tips."
              : "Returns list of Indonesian destinations complete with coords, bilingual descriptions, culinary, and tips."}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                API Endpoint URL
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-background/50 border border-border p-3 text-xs font-mono select-all overflow-x-auto">
                <span className="text-muted-foreground">GET</span>
                <span className="text-foreground">{destUrl}</span>
              </div>
            </div>

            {/* Filter Params */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Filter Island (Pulau)
                </label>
                <select
                  value={destIsland}
                  onChange={(e) => setDestIsland(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-2 text-xs text-foreground focus:border-tropical focus:outline-none"
                >
                  <option value="">All Islands</option>
                  <option value="Java">Java</option>
                  <option value="Sumatra">Sumatra</option>
                  <option value="Bali">Bali</option>
                  <option value="Lesser Sunda">Lesser Sunda (Nusa Tenggara)</option>
                  <option value="Sulawesi">Sulawesi</option>
                  <option value="Kalimantan">Kalimantan</option>
                  <option value="Maluku">Maluku</option>
                  <option value="Papua">Papua</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                  Filter Category
                </label>
                <select
                  value={destCategory}
                  onChange={(e) => setDestCategory(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background p-2 text-xs text-foreground focus:border-tropical focus:outline-none"
                >
                  <option value="">All Categories</option>
                  <option value="volcano">Volcano</option>
                  <option value="heritage">Heritage</option>
                  <option value="marine">Marine</option>
                  <option value="park">National Park</option>
                  <option value="culture">Culture</option>
                  <option value="ecotourism">Ecotourism</option>
                  <option value="beach">Beach</option>
                </select>
              </div>
            </div>

            {/* Console and actions */}
            <div className="flex gap-2">
              <button
                onClick={testDestinations}
                disabled={destLoading}
                className="rounded-full bg-tropical px-4 py-2 text-xs font-bold text-midnight shadow-cinema hover:scale-105 transition-transform disabled:opacity-50"
              >
                {destLoading ? "Fetching..." : "Try API Call"}
              </button>
              <button
                onClick={() => copyText(destUrl, setCopiedDest)}
                className="rounded-full border border-border px-4 py-2 text-xs hover:bg-muted flex items-center gap-1"
              >
                {copiedDest ? <HiCheck className="text-tropical" /> : <HiOutlineClipboardCopy />}
                {copiedDest ? "Copied" : "Copy URL"}
              </button>
            </div>

            {/* Console Output */}
            {destResult && (
              <div className="rounded-2xl border border-border bg-cinema p-4 font-mono text-xs overflow-auto max-h-[300px]">
                <div className="text-[10px] text-muted-foreground border-b border-border/40 pb-2 mb-2 uppercase tracking-widest">
                  Response Console
                </div>
                <pre className="text-pearl/90">{destResult}</pre>
              </div>
            )}
          </div>
        </section>

        {/* ENDPOINT 2: Villages */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-cinema relative overflow-hidden">
          <div className="absolute right-4 top-4 text-xs font-bold uppercase tracking-widest text-tropical/30 flex items-center gap-1">
            <HiTerminal /> GET
          </div>
          <h2 className="font-serif text-2xl">2. Villages API</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "id"
              ? "Mengembalikan daftar desa wisata tradisional dengan profil budaya, kuliner khas, dan kearifan lokal (*local wisdom*)."
              : "Returns list of traditional tourist villages with cultural profiles, traditional food, and local wisdom."}
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                API Endpoint URL
              </label>
              <div className="flex items-center gap-2 rounded-xl bg-background/50 border border-border p-3 text-xs font-mono select-all overflow-x-auto">
                <span className="text-muted-foreground">GET</span>
                <span className="text-foreground">{villUrl}</span>
              </div>
            </div>

            {/* Filter Params */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                Filter Region (Provinsi/Wilayah)
              </label>
              <select
                value={villRegion}
                onChange={(e) => setVillRegion(e.target.value)}
                className="w-full rounded-xl border border-border bg-background p-2 text-xs text-foreground focus:border-tropical focus:outline-none"
              >
                <option value="">All Regions</option>
                <option value="Bali">Bali</option>
                <option value="Flores">Flores (NTT)</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Lombok">Lombok (NTB)</option>
                <option value="Malang">Malang (Jawa Timur)</option>
                <option value="Toraja">Toraja (Sulawesi Selatan)</option>
              </select>
            </div>

            {/* Console and actions */}
            <div className="flex gap-2">
              <button
                onClick={testVillages}
                disabled={villLoading}
                className="rounded-full bg-tropical px-4 py-2 text-xs font-bold text-midnight shadow-cinema hover:scale-105 transition-transform disabled:opacity-50"
              >
                {villLoading ? "Fetching..." : "Try API Call"}
              </button>
              <button
                onClick={() => copyText(villUrl, setCopiedVill)}
                className="rounded-full border border-border px-4 py-2 text-xs hover:bg-muted flex items-center gap-1"
              >
                {copiedVill ? <HiCheck className="text-tropical" /> : <HiOutlineClipboardCopy />}
                {copiedVill ? "Copied" : "Copy URL"}
              </button>
            </div>

            {/* Console Output */}
            {villResult && (
              <div className="rounded-2xl border border-border bg-cinema p-4 font-mono text-xs overflow-auto max-h-[300px]">
                <div className="text-[10px] text-muted-foreground border-b border-border/40 pb-2 mb-2 uppercase tracking-widest">
                  Response Console
                </div>
                <pre className="text-pearl/90">{villResult}</pre>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Code Snippets Section */}
      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-cinema">
        <h2 className="font-serif text-2xl">Usage Example</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {lang === "id"
            ? "Contoh cara melakukan request API pariwisata menggunakan JavaScript Fetch API:"
            : "Example on how to fetch the tourism API using the JavaScript Fetch API:"}
        </p>

        <div className="mt-4 rounded-2xl border border-border bg-cinema p-4 font-mono text-xs overflow-x-auto text-pearl/80">
          <pre>{`// Fetch all destinations in Bali
fetch("${origin}/api/destinations?island=Bali")
  .then(response => response.json())
  .then(data => {
    console.log("Found " + data.length + " destinations in Bali:");
    console.log(data);
  })
  .catch(error => console.error("Error fetching destinations:", error));`}</pre>
        </div>
      </section>
    </div>
  );
}
