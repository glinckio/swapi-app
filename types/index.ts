export type {
  Planet,
  PlanetResponse,
  PlanetSearchParams,
} from "./planet.types";

export interface SWAPIError {
  message: string;
  status?: number;
}
