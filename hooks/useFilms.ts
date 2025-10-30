import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import { Film } from "@/types/film.types";

interface UseFilmsResult {
  films: Film[];
  loading: boolean;
  error: Error | null;
}

const hasUrls = (urls: string[]): boolean => urls.length > 0;

export const useFilms = (urls: string[]): UseFilmsResult => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const urlsString = urls.join(",");

  useEffect(() => {
    if (!hasUrls(urls)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsString]);

  return { films, loading, error };
};
