import { Planet } from "@/types";
import { PlanetCard } from "./PlanetCard";
import { useFilms } from "@/hooks/useFilms";

interface PlanetCardWithFilmsProps {
  planet: Planet;
  onClick: (planetUrl: string) => void;
}

export function PlanetCardWithFilms({
  planet,
  onClick,
}: PlanetCardWithFilmsProps) {
  const { films, loading } = useFilms(planet.films);

  return (
    <PlanetCard
      planet={planet}
      films={films}
      loadingFilms={loading}
      onClick={onClick}
    />
  );
}
