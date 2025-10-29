import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import { Resident } from "@/types/resident.types";

interface UseResidentsResult {
  residents: Resident[];
  loading: boolean;
  error: Error | null;
}

export const useResidents = (urls: string[]): UseResidentsResult => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const hasUrls = urls.length > 0;

    if (!hasUrls) {
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
  }, [urls]);

  return { residents, loading, error };
};
