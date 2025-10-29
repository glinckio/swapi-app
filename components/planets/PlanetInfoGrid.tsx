import { PlanetInfoCard } from "./PlanetInfoCard";
import { formatNumber, displayValue } from "@/utils";
import type { Planet } from "@/types";

interface PlanetInfoGridProps {
  planet: Planet;
}

export function PlanetInfoGrid({ planet }: PlanetInfoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <PlanetInfoCard
        title="Rotation Period"
        value={formatNumber(planet.rotation_period)}
        unit="hours"
      />
      <PlanetInfoCard
        title="Orbital Period"
        value={formatNumber(planet.orbital_period)}
        unit="days"
      />
      <PlanetInfoCard
        title="Diameter"
        value={formatNumber(planet.diameter)}
        unit="km"
      />
      <PlanetInfoCard
        title="Climate"
        value={displayValue(planet.climate)}
        unit=""
      />
      <PlanetInfoCard
        title="Gravity"
        value={displayValue(planet.gravity)}
        unit=""
      />
      <PlanetInfoCard
        title="Terrain"
        value={displayValue(planet.terrain)}
        unit=""
      />
      <PlanetInfoCard
        title="Population"
        value={formatNumber(planet.population)}
        unit=""
      />
      <PlanetInfoCard
        title="Surface Water"
        value={displayValue(planet.surface_water)}
        unit="%"
      />
    </div>
  );
}
