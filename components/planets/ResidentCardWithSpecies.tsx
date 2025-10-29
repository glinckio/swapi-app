import { useMemo } from "react";
import { useSpecies } from "@/hooks/useSpecies";
import { Resident, ResidentWithDetails } from "@/types/resident.types";
import { ResidentCard } from "./ResidentCard";

interface ResidentCardWithSpeciesProps {
  resident: Resident;
}

export function ResidentCardWithSpecies({
  resident,
}: ResidentCardWithSpeciesProps) {
  const { species, loading: speciesLoading } = useSpecies(resident.species);

  const residentWithSpecies = useMemo<ResidentWithDetails>(() => {
    return {
      ...resident,
      speciesDetails: species,
    };
  }, [resident, species]);

  return <ResidentCard resident={residentWithSpecies} />;
}
