import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { HiArrowRight, HiPlay } from "react-icons/hi";
import { HeroSceneLazy } from "@/components/three/HeroSceneLazy";
import { TourismMapLazy } from "@/components/site/TourismMapLazy";
import { DestinationCard } from "@/components/site/DestinationCard";
import { FlightRouteSystem } from "@/components/site/FlightRouteSystem";
import { FloatingParticles } from "@/components/site/FloatingParticles";
import { t as tr } from "@/lib/data";
import { useDestinations, useVillages } from "@/hooks/useData";
import { useLang } from "@/lib/contexts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wisata Indonesia — Cinematic Tourism Universe" },
      {
        name: "description",
        content:
          "Begin a cinematic journey across Indonesia: villages, volcanoes, oceans and culture.",
      },
      { property: "og:title", content: "Wisata Indonesia — Cinematic Tourism Universe" },
      {
        property: "og:description",
        content: "17,508 islands, 38 provinces, 700+ languages — explore an interactive archipelago.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { lang, t } = useLang();
  const { data: destinations } = useDestinations();
  const { data: villages } = useVillages();
  const featured = destinations.slice(0, 6);

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <div className="absolute inset-0">
          <HeroSceneLazy />
        </div>
        <FloatingParticles count={40} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/40 via-transparent to-midnight" />
        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-auto max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-tropical/40 bg-card/40 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-tropical backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-tropical" />
              {t.hero.kicker}
            </div>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl lg:text-8xl">
              {t.hero.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-gradient-cinema">{t.hero.title.split(" ").slice(-1)}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-pearl/80 md:text-lg">{t.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/explore"
                className="group inline-flex items-center gap-2 rounded-full bg-tropical px-6 py-3 text-sm font-bold text-midnight shadow-cinema transition-transform hover:scale-105"
              >
                {t.hero.cta}
                <HiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/documentary"
                className="inline-flex items-center gap-2 rounded-full border border-pearl/30 bg-card/30 px-6 py-3 text-sm font-bold text-pearl backdrop-blur hover:bg-card/60"
              >
                <HiPlay /> {t.hero.ctaSecondary}
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {t.hero.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-pearl/60">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAP */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader kicker="Atlas" title={t.sections.map} subtitle={t.sections.mapSub} />
        <div className="mt-8">
          <TourismMapLazy height={560} />
        </div>
      </section>

      {/* FEATURED */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeader
            kicker="Destinations"
            title={t.sections.featured}
            subtitle={t.sections.featuredSub}
          />
          <Link
            to="/explore"
            className="hidden text-sm font-semibold text-tropical hover:underline md:inline-flex"
          >
            {t.actions.viewAll} →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d, i) => (
            <DestinationCard key={d.id} d={d} index={i} />
          ))}
        </div>
      </section>

      {/* FLIGHT */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader kicker="Journey" title={t.sections.flight} subtitle={t.sections.flightSub} />
        <div className="mt-8">
          <FlightRouteSystem />
        </div>
      </section>

      {/* VILLAGES */}
      <section className="relative mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          kicker="Desa Wisata"
          title={t.sections.villages}
          subtitle={t.sections.villagesSub}
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {villages.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-cinema"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs uppercase tracking-widest text-pearl/80">
                  {v.region}
                </div>
              </div>
              <div className="p-5">
                <div className="text-lg font-bold">{v.name}</div>
                <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
                  {tr(v.about, lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">{kicker}</div>
      <h2 className="mt-2 font-serif text-3xl md:text-5xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
    </div>
  );
}
