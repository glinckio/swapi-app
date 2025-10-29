import type { Planet } from "@/types";
import { PlanetCard } from "./PlanetCard";

interface PlanetsGridProps {
  planets: Planet[];
  onPlanetClick: (planetUrl: string) => void;
}

export function PlanetsGrid({ planets, onPlanetClick }: PlanetsGridProps) {
  if (planets.length === 0) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-xl">No planets found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {planets.map((planet) => (
        <PlanetCard key={planet.url} planet={planet} onClick={onPlanetClick} />
      ))}
    </div>
  );
}
