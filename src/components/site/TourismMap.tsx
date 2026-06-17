import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "@tanstack/react-router";
import { t as tr, type Destination } from "@/lib/data";
import { useDestinations } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";
import { cn } from "@/lib/utils";

const GEO_URL = "/indonesia-provinces.json";


const CATEGORY_COLOR: Record<Destination["category"], string> = {
  village: "#06D6A0",
  beach: "#118AB2",
  mountain: "#F4E1C1",
  volcano: "#FF9F1C",
  ecotourism: "#06D6A0",
  heritage: "#FF9F1C",
  culture: "#FF9F1C",
  marine: "#118AB2",
  park: "#06D6A0",
};

export function TourismMap({ height = 520 }: { height?: number }) {
  const navigate = useNavigate();
  const { lang, t } = useLang();
  const [hovered, setHovered] = useState<Destination | null>(null);
  const { data: destinations } = useDestinations();

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border bg-cinema shadow-cinema"
      style={{ height }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_30%_30%,oklch(0.55_0.13_230/0.6),transparent_60%)]" />
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1100, center: [118, -2.5] }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup maxZoom={6}>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "oklch(0.32 0.05 220)",
                      stroke: "oklch(0.55 0.08 200 / 0.6)",
                      strokeWidth: 0.4,
                      outline: "none",
                    },
                    hover: { fill: "oklch(0.4 0.07 220)", outline: "none" },
                    pressed: { fill: "oklch(0.4 0.07 220)", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {destinations.map((d) => (
            <Marker
              key={d.id}
              coordinates={d.coords}
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered(null)}
            >
              <g
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate({
                    to: "/destination/$id",
                    params: { id: d.id },
                  });
                }}
              >
                <circle
                  r={8}
                  fill={CATEGORY_COLOR[d.category]}
                  opacity={0.25}
                  className="animate-pulse"
                />
                <circle r={3.5} fill={CATEGORY_COLOR[d.category]} stroke="#FAFAFA" strokeWidth={0.8} />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      <div className="absolute left-4 top-4 max-w-[220px] rounded-2xl border border-border bg-card/80 p-3 text-xs backdrop-blur">
        <div className="mb-2 font-bold uppercase tracking-wider">{t.sections.map}</div>
        <p className="text-muted-foreground">{t.sections.mapSub}</p>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 right-4 w-72 overflow-hidden rounded-2xl border border-border bg-card/95 shadow-cinema backdrop-blur"
          >
            <img src={hovered.image} alt={hovered.name} className="h-32 w-full object-cover" />
            <div className="p-3">
              <div className="text-[10px] uppercase tracking-widest text-tropical">
                {t.categories[hovered.category]} · {hovered.region}
              </div>
              <div className="mt-1 text-lg font-bold">{hovered.name}</div>
              <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                {tr(hovered.summary, lang)}
              </p>
              <Link
                to="/destination/$id"
                params={{ id: hovered.id }}
                className="mt-3 inline-flex rounded-full bg-tropical px-3 py-1 text-xs font-bold text-midnight"
              >
                {t.actions.explore} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-1 text-[10px]">
        {(Object.keys(CATEGORY_COLOR) as Destination["category"][]).map((c) => (
          <span
            key={c}
            className={cn(
              "inline-flex items-center gap-1 rounded-full bg-card/70 px-2 py-1 backdrop-blur",
            )}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: CATEGORY_COLOR[c] }} />
            {t.categories[c]}
          </span>
        ))}
      </div>
    </div>
  );
}