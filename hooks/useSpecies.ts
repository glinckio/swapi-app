import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import { Species } from "@/types/species.types";

interface UseSpeciesResult {
  species: Species[];
  loading: boolean;
  error: Error | null;
}

export const useSpecies = (urls: string[]): UseSpeciesResult => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const hasUrls = urls.length > 0;

    if (!hasUrls) {
      setSpecies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchSpecies = async () => {
      try {
        const data = await fetchMultiple<Species>(urls);
        setSpecies(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, [urls]);

  return { species, loading, error };
};
