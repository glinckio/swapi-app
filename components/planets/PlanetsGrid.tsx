import { useMemo } from "react";
import type { Planet } from "@/types";
import { PlanetCardWithFilms } from "./PlanetCardWithFilms";

interface PlanetsGridProps {
  planets: Planet[];
  onPlanetClick: (planetUrl: string) => void;
}

const isEmpty = (planets: Planet[]): boolean => planets.length === 0;

export function PlanetsGrid({ planets, onPlanetClick }: PlanetsGridProps) {
  const planetCards = useMemo(
    () =>
      planets.map((planet) => (
        <PlanetCardWithFilms
          key={planet.url}
          planet={planet}
          onClick={onPlanetClick}
        />
      )),
    [planets, onPlanetClick]
  );

  if (isEmpty(planets)) {
    return (
      <div className="text-center py-8" role="status" aria-live="polite">
        <p className="text-xl">No planets found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {planetCards}
    </div>
  );
}
