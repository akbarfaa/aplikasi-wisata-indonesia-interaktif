import { lazy, Suspense, useEffect, useState } from "react";

const TourismMap = lazy(() => import("./TourismMap").then((m) => ({ default: m.TourismMap })));

export function TourismMapLazy(props: { height?: number }) {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  if (!m)
    return (
      <div
        className="rounded-3xl border border-border bg-cinema shadow-cinema"
        style={{ height: props.height ?? 520 }}
      />
    );
  return (
    <Suspense
      fallback={
        <div
          className="rounded-3xl border border-border bg-cinema shadow-cinema"
          style={{ height: props.height ?? 520 }}
        />
      }
    >
      <TourismMap {...props} />
    </Suspense>
  );
}