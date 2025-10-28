export type {
  Planet,
  PlanetResponse,
  PlanetSearchParams,
} from "./planet.types";
export type { Resident, ResidentWithDetails } from "./resident.types";
export type { Species } from "./species.types";
export type { Vehicle } from "./vehicle.types";
export type { Film } from "./film.types";

export interface SWAPIError {
  message: string;
  status?: number;
}
