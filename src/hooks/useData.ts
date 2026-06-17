import { useState, useEffect } from "react";
import { 
  destinations as staticDestinations, 
  villages as staticVillages, 
  type Destination, 
  type Village 
} from "@/lib/data";

export interface DestinationsFilter {
  id?: string;
  category?: string;
  island?: string;
}

export interface VillagesFilter {
  id?: string;
  region?: string;
}

export function useDestinations(filters?: DestinationsFilter) {
  const [data, setData] = useState<Destination[]>(() => {
    // Initial state / SSR fallback: filter static destinations immediately
    let initial = staticDestinations;
    if (filters?.id) {
      initial = initial.filter((d) => d.id === filters.id);
    }
    if (filters?.category && filters.category !== "all") {
      initial = initial.filter((d) => d.category.toLowerCase() === filters.category!.toLowerCase());
    }
    if (filters?.island) {
      initial = initial.filter((d) => d.island.toLowerCase() === filters.island!.toLowerCase());
    }
    return initial;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchApi = async () => {
      try {
        const origin = window.location.origin;
        const url = new URL("/api/destinations", origin);
        if (filters?.id) url.searchParams.set("id", filters.id);
        if (filters?.category && filters.category !== "all") {
          url.searchParams.set("category", filters.category);
        }
        if (filters?.island) url.searchParams.set("island", filters.island);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const json = await res.json();
        if (active) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching destinations from API:", err);
        if (active) setLoading(false);
      }
    };

    fetchApi();
    return () => {
      active = false;
    };
  }, [filters?.id, filters?.category, filters?.island]);

  return { data, loading };
}

export function useVillages(filters?: VillagesFilter) {
  const [data, setData] = useState<Village[]>(() => {
    // Initial state / SSR fallback: filter static villages immediately
    let initial = staticVillages;
    if (filters?.id) {
      initial = initial.filter((v) => v.id === filters.id);
    }
    if (filters?.region) {
      initial = initial.filter((v) => v.region.toLowerCase() === filters.region!.toLowerCase());
    }
    return initial;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchApi = async () => {
      try {
        const origin = window.location.origin;
        const url = new URL("/api/villages", origin);
        if (filters?.id) url.searchParams.set("id", filters.id);
        if (filters?.region) url.searchParams.set("region", filters.region);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("Failed to fetch villages");
        const json = await res.json();
        if (active) {
          setData(json);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching villages from API:", err);
        if (active) setLoading(false);
      }
    };

    fetchApi();
    return () => {
      active = false;
    };
  }, [filters?.id, filters?.region]);

  return { data, loading };
}
