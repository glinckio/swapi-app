import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Resident, ResidentWithDetails } from "@/types/resident.types";
import { displayValue, capitalizeWords } from "@/utils";

interface ResidentCardProps {
  resident: Resident | ResidentWithDetails;
}

export function ResidentCard({ resident }: ResidentCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          {resident.name}
        </CardTitle>
        <CardDescription className="text-gray-400">
          Birth Year: {displayValue(resident.birth_year)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="text-xs text-gray-400">Hair Color</span>
            <p className="text-sm font-semibold text-white">
              {capitalizeWords(displayValue(resident.hair_color))}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Eye Color</span>
            <p className="text-sm font-semibold text-white">
              {capitalizeWords(displayValue(resident.eye_color))}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Gender</span>
            <p className="text-sm font-semibold text-white capitalize">
              {capitalizeWords(displayValue(resident.gender))}
            </p>
          </div>
          <div>
            <span className="text-xs text-gray-400">Height</span>
            <p className="text-sm font-semibold text-white">
              {capitalizeWords(displayValue(resident.height))} cm
            </p>
          </div>
        </div>
        {resident.species.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="text-xs text-gray-400">Species</span>
            <div className="mt-1 space-y-1">
              {resident.species.length > 0 &&
              "speciesDetails" in resident &&
              resident.speciesDetails &&
              resident.speciesDetails.length > 0 ? (
                resident.speciesDetails.map((s, i) => (
                  <p key={i} className="text-sm font-semibold text-purple-400">
                    {s.name}
                  </p>
                ))
              ) : (
                <p className="text-sm font-semibold text-purple-400">
                  {resident.species.length} species
                </p>
              )}
            </div>
          </div>
        )}
        {resident.vehicles.length > 0 && (
          <div className="mt-2">
            <span className="text-xs text-gray-400">Vehicles</span>
            <p className="text-sm font-semibold text-blue-400 mt-1">
              {resident.vehicles.length} vehicle
              {resident.vehicles.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
