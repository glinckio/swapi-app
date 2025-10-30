import React from "react";
import type { Resident, ResidentWithDetails } from "@/types/resident.types";
import { hasSpeciesDetails, hasVehicleDetails } from "./resident.utils";

export const renderSpeciesList = (
  resident: Resident | ResidentWithDetails
): React.ReactNode => {
  if (resident.species.length === 0) return null;

  if (hasSpeciesDetails(resident) && resident.speciesDetails) {
    return resident.speciesDetails.map((species, index) => (
      <p key={index} className="text-sm font-semibold text-purple-400">
        {species.name}
      </p>
    ));
  }

  return (
    <p className="text-sm font-semibold text-purple-400">
      {resident.species.length} species
    </p>
  );
};

export const renderVehicleList = (
  resident: Resident | ResidentWithDetails
): React.ReactNode => {
  if (resident.vehicles.length === 0) return null;

  if (hasVehicleDetails(resident) && resident.vehicleDetails) {
    return resident.vehicleDetails.map((vehicle, index) => (
      <div key={index} className="text-sm text-blue-400">
        <p className="font-semibold">{vehicle.name}</p>
        <p className="text-xs text-blue-300">{vehicle.model}</p>
      </div>
    ));
  }

  return (
    <p className="text-sm font-semibold text-blue-400">
      {resident.vehicles.length} vehicle
      {resident.vehicles.length !== 1 ? "s" : ""}
    </p>
  );
};
