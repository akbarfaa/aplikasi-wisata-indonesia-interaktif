import { createFileRoute } from "@tanstack/react-router";
import { AchievementBadge } from "@/components/site/AchievementBadge";
import { achievements } from "@/lib/data";
import { useLang, useProgress } from "@/lib/contexts";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Wisata Indonesia" },
      { name: "description", content: "Unlock badges as you travel across Indonesia." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { visited } = useProgress();
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">Badges</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.achievements.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t.achievements.subtitle}</p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {achievements.map((a, i) => (
          <AchievementBadge key={a.id} a={a} unlocked={a.requirement(visited)} index={i} />
        ))}
      </div>
    </div>
  );
}