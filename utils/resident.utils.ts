import type { Resident, ResidentWithDetails } from "@/types/resident.types";
import type { Species } from "@/types/species.types";
import type { Vehicle } from "@/types/vehicle.types";

export const combineResidentWithSpecies = (
  resident: Resident,
  species: Species[]
): ResidentWithDetails => ({
  ...resident,
  speciesDetails: species,
});

export const combineResidentWithVehicles = (
  resident: Resident,
  vehicles: Vehicle[]
): ResidentWithDetails => ({
  ...resident,
  vehicleDetails: vehicles,
});

export const combineResidentWithAllDetails = (
  resident: Resident,
  species: Species[],
  vehicles: Vehicle[]
): ResidentWithDetails => ({
  ...resident,
  speciesDetails: species,
  vehicleDetails: vehicles,
});

export const hasSpeciesDetails = (
  resident: Resident | ResidentWithDetails
): resident is ResidentWithDetails => {
  return (
    "speciesDetails" in resident &&
    Array.isArray(resident.speciesDetails) &&
    resident.speciesDetails.length > 0
  );
};

export const hasVehicleDetails = (
  resident: Resident | ResidentWithDetails
): resident is ResidentWithDetails => {
  return (
    "vehicleDetails" in resident &&
    Array.isArray(resident.vehicleDetails) &&
    resident.vehicleDetails.length > 0
  );
};
