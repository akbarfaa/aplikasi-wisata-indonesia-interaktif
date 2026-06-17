import { createFileRoute } from "@tanstack/react-router";
import { FlightRouteSystem } from "@/components/site/FlightRouteSystem";
import { useLang } from "@/lib/contexts";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Travel Planner — Wisata Indonesia" },
      { name: "description", content: "Plan multi-stop journeys across Indonesia." },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-tropical">Journey</div>
      <h1 className="mt-2 font-serif text-4xl md:text-6xl">{t.nav.planner}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{t.sections.flightSub}</p>
      <div className="mt-8">
        <FlightRouteSystem />
      </div>
    </div>
  );
}