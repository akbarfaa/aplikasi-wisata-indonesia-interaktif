import { motion } from "framer-motion";
import { Compass, Landmark, Palmtree, Trees, Waves, Trophy } from "lucide-react";
import type { Achievement } from "@/lib/data";
import { t as tr } from "@/lib/data";
import { useLang } from "@/lib/contexts";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  compass: Compass,
  landmark: Landmark,
  palmtree: Palmtree,
  trees: Trees,
  waves: Waves,
  trophy: Trophy,
};

export function AchievementBadge({
  a,
  unlocked,
  index = 0,
}: {
  a: Achievement;
  unlocked: boolean;
  index?: number;
}) {
  const { lang, t } = useLang();
  const IconComponent = ICON_MAP[a.icon] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-3xl border p-5 shadow-cinema transition-all ${
        unlocked
          ? "border-tropical/60 bg-gradient-to-br from-card to-tropical/10"
          : "border-border bg-card grayscale"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`grid h-14 w-14 place-items-center rounded-2xl ${
            unlocked ? "bg-tropical/20 text-tropical animate-pulse-glow" : "bg-muted text-muted-foreground"
          }`}
        >
          <IconComponent className="size-7" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {unlocked ? t.achievements.unlocked : t.achievements.locked}
          </div>
          <div className="text-lg font-bold">{tr(a.title, lang)}</div>
          <p className="mt-1 text-sm text-muted-foreground">{tr(a.description, lang)}</p>
        </div>
      </div>
    </motion.div>
  );
}