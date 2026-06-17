import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import type { Destination } from "@/lib/data";
import { t as tr } from "@/lib/data";
import { useLang, useProgress } from "@/lib/contexts";

export function DestinationCard({ d, index = 0 }: { d: Destination; index?: number }) {
  const { lang, t } = useLang();
  const { has } = useProgress();
  const stamped = has(d.id);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
    >
      <Link
        to="/destination/$id"
        params={{ id: d.id }}
        className="group relative block overflow-hidden rounded-3xl border border-border bg-card shadow-cinema"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={d.image}
            alt={d.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-card/70 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-tropical" />
            {t.categories[d.category]}
          </div>
          {stamped && (
            <div className="absolute right-4 top-4 rounded-full bg-sunset/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-midnight">
              ✓ {t.actions.stamped}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="text-xs uppercase tracking-[0.2em] text-pearl/70">{d.region}</div>
            <h3 className="mt-1 text-2xl font-bold text-pearl">{d.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-pearl/80">{tr(d.summary, lang)}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-tropical">
              {t.actions.explore} <HiArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}