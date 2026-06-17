import { lazy, Suspense, useEffect, useState } from "react";

const HeroScene = lazy(() => import("./HeroScene").then((m) => ({ default: m.HeroScene })));

export function HeroSceneLazy() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="absolute inset-0 bg-[#020e18]" />;
  return (
    <Suspense fallback={<div className="absolute inset-0 bg-[#020e18]" />}>
      <HeroScene />
    </Suspense>
  );
}