import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiPlus, HiX, HiPaperAirplane } from "react-icons/hi";
import { t as tr } from "@/lib/data";
import { useDestinations } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";

function haversine([lon1, lat1]: [number, number], [lon2, lat2]: [number, number]) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function FlightRouteSystem() {
  const { lang, t } = useLang();
  const { data: destinations } = useDestinations();
  const [route, setRoute] = useState<string[]>(["yogyakarta", "bromo", "tanahlot"]);

  const items = route
    .map((id) => destinations.find((d) => d.id === id))
    .filter(Boolean) as typeof destinations;
  const totalKm = useMemo(() => {
    let sum = 0;
    for (let i = 1; i < items.length; i++) sum += haversine(items[i - 1].coords, items[i].coords);
    return Math.round(sum);
  }, [items]);
  const hours = (totalKm / 750).toFixed(1);

  const remaining = destinations.filter((d) => !route.includes(d.id));

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-cinema">
      <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
        <div className="relative bg-cinema p-6">
          <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_30%,oklch(0.78_0.18_60/0.6),transparent_50%)]" />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.3em] text-tropical">Flight Plan</div>
            <h3 className="mt-1 text-2xl font-bold">{t.sections.flight}</h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">{t.sections.flightSub}</p>

            <ol className="relative mt-6 space-y-4 border-l-2 border-dashed border-tropical/40 pl-6">
              {items.length === 0 && (
                <li className="text-sm text-muted-foreground">No stops yet — add one →</li>
              )}
              {items.map((d, i) => (
                <motion.li
                  key={d.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative flex items-center justify-between gap-3"
                >
                  <span className="absolute -left-[34px] grid h-6 w-6 place-items-center rounded-full bg-tropical text-[10px] font-bold text-midnight">
                    {i + 1}
                  </span>
                  <div>
                    <div className="font-semibold">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.region}</div>
                  </div>
                  <button
                    onClick={() => setRoute((r) => r.filter((x) => x !== d.id))}
                    className="grid h-7 w-7 place-items-center rounded-full bg-muted text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <HiX />
                  </button>
                </motion.li>
              ))}
            </ol>

            <div className="mt-6 flex items-center gap-2">
              <HiPaperAirplane className="rotate-45 text-tropical" />
              <div className="text-sm">
                <span className="font-bold">{totalKm.toLocaleString()} km</span>
                <span className="text-muted-foreground"> · ~{hours} h flight</span>
              </div>
              <button
                onClick={() => setRoute([])}
                className="ml-auto rounded-full border border-border px-3 py-1 text-xs hover:bg-muted"
              >
                {t.actions.clear}
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {t.actions.addStop}
          </div>
          <div className="mt-3 max-h-[420px] space-y-2 overflow-auto pr-2">
            {remaining.map((d) => (
              <button
                key={d.id}
                onClick={() => setRoute((r) => [...r, d.id])}
                className="flex w-full items-center gap-3 rounded-xl border border-border bg-background/30 p-2 text-left transition-colors hover:bg-muted"
              >
                <img src={d.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.categories[d.category]} · {tr(d.summary, lang).slice(0, 40)}…
                  </div>
                </div>
                <HiPlus className="text-tropical" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}