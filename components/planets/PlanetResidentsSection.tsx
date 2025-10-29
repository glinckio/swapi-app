import { ResidentCardWithVehicles } from "./ResidentCardWithVehicles";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "./EmptyState";
import { Resident } from "@/types/resident.types";

interface PlanetResidentsSectionProps {
  residents: Resident[];
  loading: boolean;
}

export function PlanetResidentsSection({
  residents,
  loading,
}: PlanetResidentsSectionProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Residents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    );
  }

  if (residents.length === 0) {
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
        {residents.map((resident) => (
          <ResidentCardWithVehicles key={resident.url} resident={resident} />
        ))}
      </div>
    </div>
  );
}
