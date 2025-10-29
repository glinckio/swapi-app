import { useState, useEffect } from "react";
import { fetchMultiple } from "@/lib/api";
import { Vehicle } from "@/types/vehicle.types";

interface UseVehiclesResult {
  vehicles: Vehicle[];
  loading: boolean;
  error: Error | null;
}

const hasUrls = (urls: string[]): boolean => urls.length > 0;

export const useVehicles = (urls: string[]): UseVehiclesResult => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const urlsString = urls.join(",");

  useEffect(() => {
    if (!hasUrls(urls)) {
      setVehicles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchVehicles = async () => {
      try {
        const data = await fetchMultiple<Vehicle>(urls);
        setVehicles(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlsString]);

  return { vehicles, loading, error };
};
