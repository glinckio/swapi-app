import { useMemo } from "react";
import { useSpecies } from "./useSpecies";
import { useVehicles } from "./useVehicles";
import type { Resident, ResidentWithDetails } from "@/types/resident.types";
import {
  combineResidentWithAllDetails,
  combineResidentWithSpecies,
  combineResidentWithVehicles,
} from "@/utils/resident.utils";

interface UseResidentWithDetailsOptions {
  includeSpecies?: boolean;
  includeVehicles?: boolean;
}

interface UseResidentWithDetailsResult {
  resident: ResidentWithDetails;
  loading: boolean;
  hasDetails: boolean;
}

export const useResidentWithDetails = (
  resident: Resident,
  options: UseResidentWithDetailsOptions = {
    includeSpecies: true,
    includeVehicles: true,
  }
): UseResidentWithDetailsResult => {
  const { includeSpecies = true, includeVehicles = true } = options;

  const { species, loading: speciesLoading } = useSpecies(
    includeSpecies ? resident.species : []
  );
  const { vehicles, loading: vehiclesLoading } = useVehicles(
    includeVehicles ? resident.vehicles : []
  );

  const residentWithDetails = useMemo<ResidentWithDetails>(() => {
    if (includeSpecies && includeVehicles) {
      return combineResidentWithAllDetails(resident, species, vehicles);
    }
    if (includeSpecies) {
      return combineResidentWithSpecies(resident, species);
    }
    if (includeVehicles) {
      return combineResidentWithVehicles(resident, vehicles);
    }
    return resident;
  }, [resident, species, vehicles, includeSpecies, includeVehicles]);

  const loading = speciesLoading || vehiclesLoading;
  const hasDetails =
    (includeSpecies && species.length > 0) ||
    (includeVehicles && vehicles.length > 0);

  return {
    resident: residentWithDetails,
    loading,
    hasDetails,
  };
};
