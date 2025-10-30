import { useMemo } from "react";
import { ResidentCardWithVehicles } from "./ResidentCardWithVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { Resident } from "@/types/resident.types";

interface PlanetResidentsSectionProps {
  residents: Resident[];
  loading: boolean;
}

const isEmpty = (residents: Resident[]): boolean => residents.length === 0;

const generateSkeletons = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <Skeleton key={i} className="h-48" />
  ));

export function PlanetResidentsSection({
  residents,
  loading,
}: PlanetResidentsSectionProps) {
  const residentCards = useMemo(
    () =>
      residents.map((resident) => (
        <ResidentCardWithVehicles key={resident.url} resident={resident} />
      )),
    [residents]
  );

  const skeletons = useMemo(() => generateSkeletons(3), []);

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Residents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skeletons}
        </div>
      </div>
    );
  }

  if (isEmpty(residents)) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Residents
        </h2>
        <EmptyState
          title="No Residents"
          message="This planet has no known residents."
        />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Residents ({residents.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {residentCards}
      </div>
    </div>
  );
}
