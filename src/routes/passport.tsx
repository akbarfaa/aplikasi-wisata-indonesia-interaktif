import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PassportProgress } from "@/components/site/PassportProgress";
import { useDestinations } from "@/hooks/useData";
import { useLang, useProgress } from "@/lib/contexts";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Travel Passport — Wisata Indonesia" },
      { name: "description", content: "Collect stamps as you explore Indonesia." },
    ],
  }),
  component: PassportPage,
});

function PassportPage() {
  const { visited, reset } = useProgress();
  const { t } = useLang();
  const { data: destinations } = useDestinations();
  const stamps = destinations.filter((d) => visited.includes(d.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">Paspor</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.passport.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t.passport.subtitle}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr]">
        <PassportProgress />
        <div className="rounded-3xl border border-border bg-card p-6 shadow-cinema">
          <div className="text-xs uppercase tracking-[0.3em] text-tropical">Manage</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Your passport is stored locally on this device.
          </p>
          <button
            onClick={reset}
            className="mt-4 rounded-full border border-border px-4 py-2 text-sm hover:bg-muted"
          >
            Reset Passport
          </button>
        </div>
      </div>

      <h2 className="mt-12 font-serif text-3xl">Collected Stamps</h2>
      {stamps.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-border p-10 text-center text-muted-foreground">
          {t.passport.empty}
          <div className="mt-4">
            <Link
              to="/explore"
              className="inline-flex rounded-full bg-tropical px-5 py-2 text-sm font-bold text-midnight"
            >
              {t.nav.explore}
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stamps.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="relative overflow-hidden rounded-3xl border-2 border-dashed border-tropical/50 bg-card p-5"
            >
              <div className="text-xs uppercase tracking-[0.3em] text-tropical">
                {d.region}
              </div>
              <div className="mt-1 font-serif text-2xl">{d.name}</div>
              <div className="mt-3 inline-block rotate-[-8deg] rounded-full border-2 border-sunset px-4 py-2 font-bold uppercase tracking-widest text-sunset">
                ✓ Visited
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}