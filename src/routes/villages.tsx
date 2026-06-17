import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { t as tr } from "@/lib/data";
import { useVillages } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";
import { Soup } from "lucide-react";

export const Route = createFileRoute("/villages")({
  head: () => ({
    meta: [
      { title: "Tourism Villages — Wisata Indonesia" },
      { name: "description", content: "Authentic life in Indonesia's heritage villages." },
    ],
  }),
  component: VillagesPage,
});

function VillagesPage() {
  const { lang, t } = useLang();
  const { data: villages } = useVillages();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">Desa Wisata</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.sections.villages}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t.sections.villagesSub}</p>

      <div className="mt-10 space-y-10">
        {villages.map((v, i) => (
          <motion.article
            key={v.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`grid gap-6 overflow-hidden rounded-3xl border border-border bg-card shadow-cinema md:grid-cols-[1.1fr_1fr] ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <img src={v.image} alt={v.name} className="h-72 w-full object-cover md:h-full" />
            <div className="p-6 [direction:ltr]">
              <div className="text-xs uppercase tracking-widest text-tropical">{v.region}</div>
              <h2 className="font-serif text-3xl">{v.name}</h2>
              <p className="mt-3 text-muted-foreground">{tr(v.about, lang)}</p>
              <div className="mt-4">
                <div className="text-xs font-bold uppercase tracking-widest">Highlights</div>
                <ul className="mt-2 grid gap-1 text-sm">
                  {v.highlights.map((h, j) => (
                    <li key={j}>✦ {tr(h, lang)}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/40 p-3 text-sm flex items-center gap-1.5">
                  <Soup className="size-4 text-tropical shrink-0" />
                  <span>{tr(v.food, lang)}</span>
                </div>
                <div className="rounded-2xl bg-muted/40 p-3 text-sm italic">
                  “{tr(v.wisdom, lang)}”
                </div>
              </div>
              {v.youtubeId && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-border/40 aspect-video">
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
                    title={v.name}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}