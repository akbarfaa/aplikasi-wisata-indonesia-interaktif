import { useEffect, useRef, useMemo, useCallback, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { destinations } from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO GLOBE — "Nusantara from Space"
   ─────────────────────────────────────────────────────────────────────────
   Beautiful interactive 3D globe centered on Indonesia, with glowing
   destination markers, animated arcs connecting islands, and labels.
   Uses react-globe.gl — a mature WebGL globe library.
   ═══════════════════════════════════════════════════════════════════════ */

// ─── Types ───────────────────────────────────────────────────────────────
interface PointData {
  lat: number;
  lng: number;
  name: string;
  region: string;
  category: string;
  size: number;
  color: string;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: [string, string];
}

interface RingData {
  lat: number;
  lng: number;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
  color: string;
}

// ─── Color palette by category ───────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  heritage: "#FF9F1C",
  beach: "#00e5ff",
  mountain: "#06D6A0",
  volcano: "#ff4444",
  ecotourism: "#4ecdc4",
  culture: "#FF6B6B",
  marine: "#118AB2",
  park: "#2ecc71",
  village: "#f0a500",
};

// ─── Build data layers from destinations ─────────────────────────────────
function buildPointsData(): PointData[] {
  return destinations.map((d) => ({
    lat: d.coords[1],
    lng: d.coords[0],
    name: d.name,
    region: d.region,
    category: d.category,
    size: 0.18,
    color: CATEGORY_COLORS[d.category] || "#06D6A0",
  }));
}

function buildArcsData(): ArcData[] {
  const arcs: ArcData[] = [];
  const islandGroups = new Map<string, typeof destinations>();

  for (const d of destinations) {
    if (!islandGroups.has(d.island)) islandGroups.set(d.island, []);
    islandGroups.get(d.island)!.push(d);
  }

  const arcColors: [string, string][] = [
    ["#06D6A0aa", "#118AB2aa"],
    ["#FF9F1Caa", "#ff4444aa"],
    ["#00e5ffaa", "#06D6A0aa"],
  ];

  // 1. Draw sorted intra-island connections (West to East sequence, avoiding crossings)
  for (const [, group] of islandGroups) {
    // Sort destinations from West to East by Longitude
    const sorted = [...group].sort((a, b) => a.coords[0] - b.coords[0]);
    // Connect adjacent points (limit to 2 arcs per island to keep it clean and elegant)
    const limit = Math.min(sorted.length - 1, 2);
    for (let i = 0; i < limit; i++) {
      arcs.push({
        startLat: sorted[i].coords[1],
        startLng: sorted[i].coords[0],
        endLat: sorted[i + 1].coords[1],
        endLng: sorted[i + 1].coords[0],
        color: arcColors[i % arcColors.length],
      });
    }
  }

  // 2. Draw key inter-island flight paths to unify the archipelago
  const hubs = {
    jakarta: destinations.find(d => d.id === "monas"),
    toba: destinations.find(d => d.id === "tobalake"),
    bali: destinations.find(d => d.id === "tanahlot"),
    komodo: destinations.find(d => d.id === "komodo"),
    rajaampat: destinations.find(d => d.id === "rajaampat"),
    bunaken: destinations.find(d => d.id === "bunaken"),
  };

  const interIslandRoutes = [
    { start: hubs.toba, end: hubs.jakarta },
    { start: hubs.jakarta, end: hubs.bali },
    { start: hubs.bali, end: hubs.komodo },
    { start: hubs.komodo, end: hubs.rajaampat },
    { start: hubs.jakarta, end: hubs.bunaken },
    { start: hubs.bunaken, end: hubs.rajaampat },
  ].filter(route => route.start && route.end);

  interIslandRoutes.forEach((route, idx) => {
    arcs.push({
      startLat: route.start!.coords[1],
      startLng: route.start!.coords[0],
      endLat: route.end!.coords[1],
      endLng: route.end!.coords[0],
      color: [
        idx % 2 === 0 ? "#FF9F1Cdd" : "#00e5ffdd",
        idx % 2 === 0 ? "#06D6A0dd" : "#118AB2dd"
      ],
    });
  });

  return arcs;
}

function buildRingsData(): RingData[] {
  // Pulsing rings on key landmark destinations
  const keyDestinations = destinations.filter((d) =>
    ["heritage", "volcano", "culture"].includes(d.category),
  );
  return keyDestinations.slice(0, 8).map((d) => ({
    lat: d.coords[1],
    lng: d.coords[0],
    maxR: 2,
    propagationSpeed: 1.8,
    repeatPeriod: 1500,
    color: CATEGORY_COLORS[d.category] || "#06D6A0",
  }));
}

// ─── Globe Component ─────────────────────────────────────────────────────
export function HeroScene() {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const pointsData = useMemo(() => buildPointsData(), []);
  const arcsData = useMemo(() => buildArcsData(), []);
  const ringsData = useMemo(() => buildRingsData(), []);

  // Center globe on Indonesia and configure controls on mount
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    // Use setTimeout to ensure globe is fully initialized before animating camera
    setTimeout(() => {
      globe.pointOfView({ lat: -2.5, lng: 118, altitude: 2.0 }, 2000);
    }, 100);

    // Customize Three.js controls after camera animation finishes
    setTimeout(() => {
      const controls = globe.controls();
      if (controls) {
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.6;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 3;
        controls.maxPolarAngle = (Math.PI * 2.5) / 3;
      }
    }, 2200);

    // Customize Three.js scene lighting
    const scene = globe.scene();
    if (scene) {
      const ambientLight = scene.children.find(
        (c: any) => c.type === "AmbientLight",
      );
      if (ambientLight) (ambientLight as any).intensity = 0.8;
    }
  }, []);

  // Resize handler
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    // Also update on a slight delay to handle CSS layout shifts
    setTimeout(update, 50);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ background: "#020e18" }}>
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          // Globe appearance
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
          // Atmosphere
          atmosphereColor="#06D6A0"
          atmosphereAltitude={0.15}
          // Points (destination markers)
          pointsData={pointsData}
          pointLat={(d: any) => d.lat}
          pointLng={(d: any) => d.lng}
          pointColor={(d: any) => d.color}
          pointAltitude={0.008}
          pointRadius={(d: any) => d.size * 1.5}
          pointsMerge={false}
          pointLabel={(d: any) => `
            <div style="background: rgba(2,14,24,0.9); padding: 8px 12px; border-radius: 8px; border: 1px solid ${d.color}; color: white; font-family: sans-serif;">
              <strong>${d.name}</strong><br/>
              <span style="font-size: 0.8em; opacity: 0.8;">${d.region}</span>
            </div>
          `}
          // Arcs (connections between destinations)
          arcsData={arcsData}
          arcStartLat={(d: any) => d.startLat}
          arcStartLng={(d: any) => d.startLng}
          arcEndLat={(d: any) => d.endLat}
          arcEndLng={(d: any) => d.endLng}
          arcColor={(d: any) => d.color}
          arcDashLength={0.4}
          arcDashGap={0.3}
          arcDashAnimateTime={2000}
          arcStroke={0.25}
          arcAltitudeAutoScale={0.18}
          // Pulsing rings on key destinations
          ringsData={ringsData}
          ringLat={(d: any) => d.lat}
          ringLng={(d: any) => d.lng}
          ringMaxRadius={(d: any) => d.maxR}
          ringPropagationSpeed={(d: any) => d.propagationSpeed}
          ringRepeatPeriod={(d: any) => d.repeatPeriod}
          ringColor={(d: any) => d.color}
          // Performance
          animateIn={true}
          rendererConfig={{ antialias: true, alpha: true }}
        />
      )}
    </div>
  );
}