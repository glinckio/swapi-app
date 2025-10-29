import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import type { Film } from "@/types";

interface UseFilmsResult {
  films: Film[];
  loading: boolean;
  error: Error | null;
}

export const useFilms = (urls: string[]): UseFilmsResult => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const hasUrls = urls.length > 0;

    if (!hasUrls) {
      setFilms([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchFilms = async () => {
      try {
        const data = await fetchMultiple<Film>(urls);
        setFilms(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, [urls]);

  return { films, loading, error };
};
