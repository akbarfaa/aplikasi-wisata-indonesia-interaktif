import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { HiCheckCircle, HiArrowLeft } from "react-icons/hi";
import { Utensils } from "lucide-react";
import { DocumentaryPlayer } from "@/components/site/DocumentaryPlayer";
import { destinations, t as tr, type Destination } from "@/lib/data";
import { useAudio, useLang, useProgress } from "@/lib/contexts";

export const Route = createFileRoute("/destination/$id")({
  loader: async ({ params }) => {
    if (typeof window === "undefined") {
      const { destinations } = await import("@/lib/data");
      const d = destinations.find((x) => x.id === params.id);
      if (!d) throw notFound();
      return d;
    } else {
      const origin = window.location.origin;
      const res = await fetch(`${origin}/api/destinations?id=${params.id}`);
      if (!res.ok) throw notFound();
      const list = await res.json();
      const d = list.find((x: any) => x.id === params.id);
      if (!d) throw notFound();
      return d;
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Wisata Indonesia` },
          { name: "description", content: loaderData.summary.en },
          { property: "og:title", content: `${loaderData.name} — Wisata Indonesia` },
          { property: "og:description", content: loaderData.summary.en },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  component: DestinationPage,
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center">Destination not found.</div>
  ),
  errorComponent: ({ reset }) => (
    <div className="grid min-h-[60vh] place-items-center">
      <button onClick={reset} className="rounded-full bg-tropical px-4 py-2 text-midnight">
        Retry
      </button>
    </div>
  ),
});

function DestinationPage() {
  const d = Route.useLoaderData() as Destination;
  const { lang, t } = useLang();
  const { has, toggle } = useProgress();
  const stamped = has(d.id);
  const { play, enabled } = useAudio();

  useEffect(() => {
    if (enabled) play(d.ambience);
  }, [d.ambience, enabled, play]);

  return (
    <article className="relative">
      <section className="relative h-[70svh] min-h-[440px] overflow-hidden">
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src={d.image}
          alt={d.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-midnight/30" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-12">
          <Link
            to="/explore"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-card/60 px-3 py-1.5 text-xs backdrop-blur"
          >
            <HiArrowLeft /> {t.nav.explore}
          </Link>
          <div className="mt-4 text-xs uppercase tracking-[0.3em] text-tropical">
            {t.categories[d.category]} · {d.region}, {d.island}
          </div>
          <h1 className="mt-2 font-serif text-5xl md:text-7xl">{d.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-pearl/80">{tr(d.summary, lang)}</p>
          <button
            onClick={() => toggle(d.id)}
            className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              stamped
                ? "bg-sunset text-midnight"
                : "bg-tropical text-midnight hover:scale-105"
            }`}
          >
            <HiCheckCircle /> {stamped ? t.actions.stamped : t.actions.stamp}
          </button>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <Block title="Description">{tr(d.description, lang)}</Block>
          <Block title="History">{tr(d.history, lang)}</Block>
          <Block title="Local Culture">{tr(d.culture, lang)}</Block>

          <div>
            <H2>Activities</H2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {d.activities.map((a, i) => (
                <li
                  key={i}
                  className="rounded-2xl border border-border bg-card p-4 text-sm"
                >
                  ✦ {tr(a, lang)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <H2>Culinary</H2>
            <div className="mt-4 flex flex-wrap gap-2">
              {d.culinary.map((c, i) => (
                <span
                  key={i}
                  className="rounded-full border border-border bg-card px-4 py-1.5 text-sm flex items-center gap-1.5"
                >
                  <Utensils className="size-3.5 text-tropical shrink-0" />
                  <span>{tr(c, lang)}</span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <H2>Documentary</H2>
            <div className="mt-4">
              <DocumentaryPlayer d={d} />
            </div>
          </div>

          <div>
            <H2>Gallery</H2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.gallery.map((g, i) => (
                <motion.img
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  src={g}
                  alt=""
                  className="aspect-[4/3] w-full rounded-2xl object-cover shadow-cinema"
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <SideCard title="Best Season">{tr(d.bestSeason, lang)}</SideCard>
          <SideCard title="Travel Tips">{tr(d.tips, lang)}</SideCard>
          <SideCard title="Coordinates">
            {d.coords[1].toFixed(3)}°, {d.coords[0].toFixed(3)}°
          </SideCard>
        </aside>
      </div>
    </article>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-3xl">{children}</h2>;
}
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <H2>{title}</H2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">{title}</div>
      <div className="mt-2 text-sm">{children}</div>
    </div>
  );
}