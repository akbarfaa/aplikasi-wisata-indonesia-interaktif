import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { TourismMapLazy } from "@/components/site/TourismMapLazy";
import { DestinationCard } from "@/components/site/DestinationCard";
import { type Category } from "@/lib/data";
import { useDestinations } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore — Wisata Indonesia" },
      { name: "description", content: "Browse Indonesian destinations on the interactive map." },
    ],
  }),
  component: ExplorePage,
});

const ALL: (Category | "all")[] = [
  "all",
  "village",
  "beach",
  "mountain",
  "volcano",
  "ecotourism",
  "heritage",
  "culture",
  "marine",
  "park",
];

function ExplorePage() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");
  const { data: destinations } = useDestinations();
  const list = useMemo(
    () => (filter === "all" ? destinations : destinations.filter((d) => d.category === filter)),
    [filter, destinations],
  );
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-xs uppercase tracking-[0.3em] text-tropical">Atlas</div>
        <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.nav.explore} Indonesia</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{t.sections.mapSub}</p>
      </motion.div>

      <div className="mt-8">
        <TourismMapLazy height={520} />
      </div>

      <div className="mt-12 flex flex-wrap gap-2">
        {ALL.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors",
              filter === c
                ? "border-tropical bg-tropical text-midnight"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {c === "all" ? "All" : t.categories[c]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d, i) => (
          <DestinationCard key={d.id} d={d} index={i} />
        ))}
      </div>
    </div>
  );
}