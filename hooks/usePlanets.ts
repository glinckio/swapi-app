import { useState, useEffect, useCallback } from "react";
import { fetchPlanets as fetchPlanetsFromAPI } from "@/lib/api";
import type { Planet } from "@/types";

interface UsePlanetsOptions {
  search?: string;
  page?: number;
}

interface UsePlanetsResult {
  planets: Planet[];
  loading: boolean;
  error: Error | null;
  totalPages: number;
  refetch: () => void;
}

const PLANETS_PER_PAGE = 10;

export const usePlanets = (options?: UsePlanetsOptions): UsePlanetsResult => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchPlanets = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (options?.search) params.append("search", options.search);
      if (options?.page) params.append("page", options.page.toString());

      const data = await fetchPlanetsFromAPI(options?.search, options?.page);

      setPlanets(data.results);
      setTotalPages(Math.ceil(data.count / PLANETS_PER_PAGE));
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [options?.search, options?.page]);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return {
    planets,
    loading,
    error,
    totalPages,
    refetch: fetchPlanets,
  };
};
