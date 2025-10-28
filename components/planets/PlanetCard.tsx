import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { displayValue } from "@/utils";
import type { Planet } from "@/types";

interface PlanetCardProps {
  planet: Planet;
  onClick: (planetUrl: string) => void;
}

export function PlanetCard({ planet, onClick }: PlanetCardProps) {
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
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-gray-400">Films</span>
            <span className="text-sm font-semibold text-purple-400">
              {planet.films.length} appearance
              {planet.films.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
