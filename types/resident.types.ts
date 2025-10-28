import { Film } from "./film.types";
import { Species } from "./species.types";
import { Vehicle } from "./vehicle.types";

export interface Resident {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface ResidentWithDetails extends Resident {
  speciesDetails?: Species[];
  vehicleDetails?: Vehicle[];
  filmDetails?: Film[];
}
