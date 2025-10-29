import {
  combineResidentWithSpecies,
  combineResidentWithVehicles,
  combineResidentWithAllDetails,
  hasSpeciesDetails,
  hasVehicleDetails,
} from "./resident.utils";
import { Resident } from "@/types/resident.types";
import { Species } from "@/types/species.types";
import { Vehicle } from "@/types/vehicle.types";

describe("resident.utils", () => {
  const mockResident: Resident = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: [],
    species: ["https://swapi.dev/api/species/1/"],
    vehicles: ["https://swapi.dev/api/vehicles/14/"],
    starships: [],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  const mockSpecies: Species[] = [
    {
      name: "Human",
      classification: "mammal",
      designation: "sentient",
      average_height: "180",
      skin_colors: "caucasian, black, asian, hispanic",
      hair_colors: "blonde, brown, black, red",
      eye_colors: "brown, blue, green, hazel, grey, amber",
      average_lifespan: "120",
      homeworld: "https://swapi.dev/api/planets/9/",
      language: "Galactic Basic",
      people: [],
      films: [],
      created: "2014-12-10T13:52:11.567000Z",
      edited: "2014-12-20T21:36:42.136000Z",
      url: "https://swapi.dev/api/species/1/",
    },
  ];

  const mockVehicles: Vehicle[] = [
    {
      name: "Snowspeeder",
      model: "t-47 airspeeder",
      manufacturer: "Incom corporation",
      cost_in_credits: "unknown",
      length: "4.5",
      max_atmosphering_speed: "650",
      crew: "2",
      passengers: "0",
      cargo_capacity: "10",
      consumables: "none",
      vehicle_class: "airspeeder",
      pilots: [],
      films: [],
      created: "2014-12-15T12:22:12Z",
      edited: "2014-12-20T21:30:21.672000Z",
      url: "https://swapi.dev/api/vehicles/14/",
    },
  ];

  describe("combineResidentWithSpecies", () => {
    it("should combine resident with species details", () => {
      const result = combineResidentWithSpecies(mockResident, mockSpecies);

      expect(result.name).toBe("Luke Skywalker");
      expect(result.speciesDetails).toEqual(mockSpecies);
      expect(result.vehicleDetails).toBeUndefined();
    });

    it("should preserve all resident properties", () => {
      const result = combineResidentWithSpecies(mockResident, mockSpecies);

      expect(result.height).toBe(mockResident.height);
      expect(result.mass).toBe(mockResident.mass);
      expect(result.hair_color).toBe(mockResident.hair_color);
    });

    it("should work with empty species array", () => {
      const result = combineResidentWithSpecies(mockResident, []);

      expect(result.speciesDetails).toEqual([]);
    });
  });

  describe("combineResidentWithVehicles", () => {
    it("should combine resident with vehicle details", () => {
      const result = combineResidentWithVehicles(mockResident, mockVehicles);

      expect(result.name).toBe("Luke Skywalker");
      expect(result.vehicleDetails).toEqual(mockVehicles);
      expect(result.speciesDetails).toBeUndefined();
    });

    it("should preserve all resident properties", () => {
      const result = combineResidentWithVehicles(mockResident, mockVehicles);

      expect(result.height).toBe(mockResident.height);
      expect(result.mass).toBe(mockResident.mass);
      expect(result.hair_color).toBe(mockResident.hair_color);
    });

    it("should work with empty vehicles array", () => {
      const result = combineResidentWithVehicles(mockResident, []);

      expect(result.vehicleDetails).toEqual([]);
    });
  });

  describe("combineResidentWithAllDetails", () => {
    it("should combine resident with both species and vehicle details", () => {
      const result = combineResidentWithAllDetails(
        mockResident,
        mockSpecies,
        mockVehicles
      );

      expect(result.name).toBe("Luke Skywalker");
      expect(result.speciesDetails).toEqual(mockSpecies);
      expect(result.vehicleDetails).toEqual(mockVehicles);
    });

    it("should preserve all resident properties", () => {
      const result = combineResidentWithAllDetails(
        mockResident,
        mockSpecies,
        mockVehicles
      );

      expect(result.height).toBe(mockResident.height);
      expect(result.mass).toBe(mockResident.mass);
      expect(result.hair_color).toBe(mockResident.hair_color);
    });

    it("should work with empty arrays", () => {
      const result = combineResidentWithAllDetails(mockResident, [], []);

      expect(result.speciesDetails).toEqual([]);
      expect(result.vehicleDetails).toEqual([]);
    });
  });

  describe("hasSpeciesDetails", () => {
    it("should return true when resident has species details", () => {
      const residentWithDetails = combineResidentWithSpecies(
        mockResident,
        mockSpecies
      );

      expect(hasSpeciesDetails(residentWithDetails)).toBe(true);
    });

    it("should return false when resident does not have species details", () => {
      expect(hasSpeciesDetails(mockResident)).toBe(false);
    });

    it("should return false when species details array is empty", () => {
      const residentWithEmptySpecies = combineResidentWithSpecies(
        mockResident,
        []
      );

      expect(hasSpeciesDetails(residentWithEmptySpecies)).toBe(false);
    });

    it("should work as type guard", () => {
      const residentWithDetails = combineResidentWithSpecies(
        mockResident,
        mockSpecies
      );

      if (hasSpeciesDetails(residentWithDetails)) {
        expect(residentWithDetails.speciesDetails).toBeDefined();
      }
    });
  });

  describe("hasVehicleDetails", () => {
    it("should return true when resident has vehicle details", () => {
      const residentWithDetails = combineResidentWithVehicles(
        mockResident,
        mockVehicles
      );

      expect(hasVehicleDetails(residentWithDetails)).toBe(true);
    });

    it("should return false when resident does not have vehicle details", () => {
      expect(hasVehicleDetails(mockResident)).toBe(false);
    });

    it("should return false when vehicle details array is empty", () => {
      const residentWithEmptyVehicles = combineResidentWithVehicles(
        mockResident,
        []
      );

      expect(hasVehicleDetails(residentWithEmptyVehicles)).toBe(false);
    });

    it("should work as type guard", () => {
      const residentWithDetails = combineResidentWithVehicles(
        mockResident,
        mockVehicles
      );

      if (hasVehicleDetails(residentWithDetails)) {
        expect(residentWithDetails.vehicleDetails).toBeDefined();
      }
    });
  });
});
