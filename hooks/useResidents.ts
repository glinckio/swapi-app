import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import { Resident } from "@/types/resident.types";

interface UseResidentsResult {
  residents: Resident[];
  loading: boolean;
  error: Error | null;
}

const hasUrls = (urls: string[]): boolean => urls.length > 0;

export const useResidents = (urls: string[]): UseResidentsResult => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const urlsString = urls.join(",");

  useEffect(() => {
    if (!hasUrls(urls)) {
      setResidents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchResidents = async () => {
      try {
        const data = await fetchMultiple<Resident>(urls);
        setResidents(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsString]);

  return { residents, loading, error };
};
