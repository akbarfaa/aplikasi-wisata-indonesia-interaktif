import { motion } from "framer-motion";
import { useDestinations } from "@/hooks/useData";
import { useLang, useProgress } from "@/lib/contexts";

export function PassportProgress() {
  const { visited } = useProgress();
  const { t } = useLang();
  const { data: destinations } = useDestinations();
  const pct = Math.round((visited.length / destinations.length) * 100);
  const regions = new Set(
    destinations.filter((d) => visited.includes(d.id)).map((d) => d.island),
  ).size;

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-cinema">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-tropical">Passport</div>
          <div className="text-2xl font-bold">{t.passport.progress}</div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{pct}%</div>
          <div className="text-xs text-muted-foreground">
            {visited.length}/{destinations.length} {t.passport.stampsCollected}
          </div>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-tropical"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        {regions} {t.passport.regionsVisited}
      </div>
    </div>
  );
}