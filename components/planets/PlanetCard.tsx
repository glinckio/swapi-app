import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { displayValue } from "@/utils";
import type { Planet } from "@/types";
import type { Film } from "@/types/film.types";

interface PlanetCardProps {
  planet: Planet;
  films?: Film[];
  loadingFilms?: boolean;
  onClick: (planetUrl: string) => void;
}

export function PlanetCard({
  planet,
  films = [],
  loadingFilms = false,
  onClick,
}: PlanetCardProps) {
  const handleClick = () => onClick(planet.url);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(planet.url);
    }
  };

  return (
    <Card
      className="cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 focus-within:ring-2 focus-within:ring-blue-500"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Planet ${planet.name} details`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          {planet.name}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Click to explore
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-400">Climate</span>
            <span className="text-sm font-semibold text-white capitalize">
              {displayValue(planet.climate)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-400">Terrain</span>
            <span className="text-sm font-semibold text-white capitalize text-right">
              {displayValue(planet.terrain)}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <span className="text-sm font-medium text-gray-400">Diameter</span>
            <span className="text-sm font-semibold text-blue-400">
              {displayValue(planet.diameter)} km
            </span>
          </div>
          <div className="flex flex-col py-2">
            <span className="text-sm font-medium text-gray-400 mb-2">
              Films
            </span>
            {loadingFilms ? (
              <span className="text-xs text-gray-500 italic">
                Loading films...
              </span>
            ) : films.length > 0 ? (
              <div className="space-y-1">
                {films.map((film) => (
                  <span
                    key={film.url}
                    className="text-xs font-semibold text-purple-400 block"
                  >
                    {film.title}
                  </span>
                ))}
              </div>
            ) : planet.films.length > 0 ? (
              <span className="text-xs text-gray-500 italic">
                {planet.films.length} appearance
                {planet.films.length !== 1 ? "s" : ""}
              </span>
            ) : (
              <span className="text-xs text-gray-500 italic">No films</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
