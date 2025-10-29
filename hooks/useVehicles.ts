import { useState, useEffect, useCallback } from "react";
import { fetchMultiple } from "@/lib/api";
import { Vehicle } from "@/types/vehicle.types";

interface UseVehiclesResult {
  vehicles: Vehicle[];
  loading: boolean;
  error: Error | null;
}

export const useVehicles = (urls: string[]): UseVehiclesResult => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchVehicles = useCallback(async () => {
    if (urls.length === 0) {
      setVehicles([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchMultiple<Vehicle>(urls);
      setVehicles(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [urls]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  return { vehicles, loading, error };
};
