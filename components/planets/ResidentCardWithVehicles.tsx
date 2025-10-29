import { Resident } from "@/types/resident.types";
import { ResidentCard } from "./ResidentCard";
import { useResidentWithDetails } from "@/hooks/useResidentWithDetails";

interface ResidentCardWithVehiclesProps {
  resident: Resident;
}

export function ResidentCardWithVehicles({
  resident,
}: ResidentCardWithVehiclesProps) {
  const { resident: residentWithDetails } = useResidentWithDetails(resident, {
    includeSpecies: true,
    includeVehicles: true,
  });

  return <ResidentCard resident={residentWithDetails} />;
}
