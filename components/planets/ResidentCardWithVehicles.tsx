import { useMemo } from "react";
import { useSpecies } from "@/hooks/useSpecies";
import { useVehicles } from "@/hooks/useVehicles";
import { Resident, ResidentWithDetails } from "@/types/resident.types";
import { ResidentCard } from "./ResidentCard";

interface ResidentCardWithVehiclesProps {
  resident: Resident;
}

export function ResidentCardWithVehicles({
  resident,
}: ResidentCardWithVehiclesProps) {
  const { species, loading: speciesLoading } = useSpecies(resident.species);
  const { vehicles, loading: vehiclesLoading } = useVehicles(resident.vehicles);

  const residentWithDetails = useMemo<ResidentWithDetails>(() => {
    return {
      ...resident,
      speciesDetails: species,
      vehicleDetails: vehicles,
    };
  }, [resident, species, vehicles]);

  return <ResidentCard resident={residentWithDetails} />;
}
