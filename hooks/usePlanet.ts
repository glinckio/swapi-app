import { useState, useEffect, useCallback } from "react";
import { fetchPlanetById } from "@/lib/api";
import type { Planet } from "@/types";

interface UsePlanetResult {
  planet: Planet | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const usePlanet = (id: string): UsePlanetResult => {
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlanet = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchPlanetById<Planet>(id);
      setPlanet(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlanet();
  }, [fetchPlanet]);

  return {
    planet,
    loading,
    error,
    refetch: fetchPlanet,
  };
};
