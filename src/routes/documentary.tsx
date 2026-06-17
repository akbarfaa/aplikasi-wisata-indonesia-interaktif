import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DocumentaryPlayer } from "@/components/site/DocumentaryPlayer";
import { useDestinations } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";
import { t as tr } from "@/lib/data";

export const Route = createFileRoute("/documentary")({
  head: () => ({
    meta: [
      { title: "Documentary — Wisata Indonesia" },
      { name: "description", content: "Cinematic Indonesian tourism documentaries." },
    ],
  }),
  component: DocumentaryPage,
});

function DocumentaryPage() {
  const { lang, t } = useLang();
  const { data: destinations } = useDestinations();
  const [activeId, setActiveId] = useState(destinations[0]?.id || "baiturrahman");
  const [searchQuery, setSearchQuery] = useState("");

  const active = destinations.find((d) => d.id === activeId) || destinations[0];

  // Filter destinations based on search query (by name or region)
  const filteredDestinations = useMemo(() => {
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [destinations, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* HEADER */}
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-tropical">Documentary Hub</div>
        <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.nav.documentary}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Immersive cinematic documentaries showcasing the nature, culture, and wonders of Indonesia.
        </p>
      </div>

      {/* ACTIVE VIDEO THEATER */}
      <div className="mt-8">
        {active && <DocumentaryPlayer key={active.id} d={active} />}
      </div>

      {/* ACTIVE VIDEO DETAILS */}
      {active && (
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl border border-border bg-card/30 p-6 md:p-8 backdrop-blur"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-tropical/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-tropical">
              {t.categories[active.category]}
            </span>
            <span className="text-xs text-muted-foreground">
              {active.region} · {active.island}
            </span>
          </div>
          
          <h2 className="mt-3 font-serif text-2xl md:text-3xl font-bold">{active.name}</h2>
          <p className="mt-3 max-w-4xl text-sm md:text-base leading-relaxed text-muted-foreground">
            {tr(active.description, lang)}
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 border-t border-border/40 pt-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-tropical font-bold">Local Culinary</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {active.culinary.map((c, idx) => (
                  <span key={idx} className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs">
                    {tr(c, lang)}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-tropical font-bold">Travel Tip</div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                💡 {tr(active.tips, lang)}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* FILTER & GALLERY HEADER */}
      <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/30 pb-4">
        <div>
          <h3 className="font-serif text-xl md:text-2xl font-bold font-semibold">Explore More Documentaries</h3>
          <p className="text-xs text-muted-foreground">Select another destination below to begin watching</p>
        </div>
        
        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search destination or province..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-border bg-card/50 py-2 pl-9 pr-4 text-sm text-foreground placeholder-muted-foreground focus:border-tropical focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* HORIZONTAL CAROUSEL LIST */}
      <div className="mt-6">
        {filteredDestinations.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-12 text-center text-muted-foreground">
            No documentaries found matching your search.
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-tropical/20 scrollbar-track-card/10 pr-2">
            {filteredDestinations.map((d) => (
              <motion.button
                key={d.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setActiveId(d.id);
                  // Scroll window to player area smoothly
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`flex-none w-64 overflow-hidden rounded-2xl border p-2 text-left transition-all ${
                  activeId === d.id
                    ? "border-tropical bg-card shadow-cinema ring-1 ring-tropical/20"
                    : "border-border bg-card/40 hover:bg-card hover:border-pearl/20"
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                  <img src={d.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/10" />
                  {activeId === d.id && (
                    <div className="absolute inset-0 bg-tropical/15 grid place-items-center">
                      <span className="rounded-full bg-tropical px-2.5 py-1 text-midnight text-[10px] font-bold uppercase tracking-wider">
                        Watching
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 px-1">
                  <div className="text-xs uppercase tracking-widest text-tropical/80 font-semibold">
                    {t.categories[d.category]}
                  </div>
                  <div className="text-sm font-bold line-clamp-1 mt-0.5">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.region}</div>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}