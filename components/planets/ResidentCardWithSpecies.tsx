import { Resident } from "@/types/resident.types";
import { ResidentCard } from "./ResidentCard";
import { useResidentWithDetails } from "@/hooks/useResidentWithDetails";

interface ResidentCardWithSpeciesProps {
  resident: Resident;
}

export function ResidentCardWithSpecies({
  resident,
}: ResidentCardWithSpeciesProps) {
  const { resident: residentWithSpecies } = useResidentWithDetails(resident, {
    includeSpecies: true,
    includeVehicles: false,
  });

  return <ResidentCard resident={residentWithSpecies} />;
}
