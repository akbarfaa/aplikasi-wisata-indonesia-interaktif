import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/contexts";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Wisata Indonesia" },
      { name: "description", content: "About the Wisata Indonesia immersive experience." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">{t.nav.about}</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">An archipelago in motion</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Wisata Indonesia is an interactive tourism universe designed to bring the soul of the
        archipelago to life — from the smoking caldera of Bromo to the manta-filled waters of Raja
        Ampat, and the seven cone-shaped houses of Wae Rebo. Built as a cinematic, bilingual,
        immersive showcase of Wonderful Indonesia.
      </p>
      <ul className="mt-8 grid gap-3 text-sm">
        <li className="rounded-2xl border border-border bg-card p-4">
          ✦ Real-time 3D cinematic landing scene
        </li>
        <li className="rounded-2xl border border-border bg-card p-4">
          ✦ Interactive Indonesia tourism map with destination clusters
        </li>
        <li className="rounded-2xl border border-border bg-card p-4">
          ✦ Flight route planner with distance and duration
        </li>
        <li className="rounded-2xl border border-border bg-card p-4">
          ✦ Passport, achievements and bilingual quiz system
        </li>
        <li className="rounded-2xl border border-border bg-card p-4">
          ✦ Per-destination ambient audio (Howler.js)
        </li>
      </ul>
    </div>
  );
}