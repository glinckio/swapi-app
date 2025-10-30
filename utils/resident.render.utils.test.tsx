import { render } from "@testing-library/react";
import { renderSpeciesList, renderVehicleList } from "./resident.render.utils";
import { Resident, ResidentWithDetails } from "@/types/resident.types";
import { Species } from "@/types/species.types";
import { Vehicle } from "@/types/vehicle.types";

describe("resident.render.utils", () => {
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

  describe("renderSpeciesList", () => {
    it("should return null when resident has no species", () => {
      const residentWithoutSpecies: Resident = {
        ...mockResident,
        species: [],
      };

      const result = renderSpeciesList(residentWithoutSpecies);
      expect(result).toBeNull();
    });

    it("should render species details when present", () => {
      const residentWithDetails: ResidentWithDetails = {
        ...mockResident,
        speciesDetails: mockSpecies,
      };

      const { getByText } = render(
        <div>{renderSpeciesList(residentWithDetails)}</div>
      );

      expect(getByText("Human")).toBeInTheDocument();
    });

    it("should render count when species details are not available", () => {
      const result = renderSpeciesList(mockResident);

      const { getByText } = render(<div>{result}</div>);
      expect(getByText("1 species")).toBeInTheDocument();
    });

    it("should render multiple species when present", () => {
      const multipleSpecies: Species[] = [
        ...mockSpecies,
        {
          name: "Droid",
          classification: "artificial",
          designation: "sentient",
          average_height: "n/a",
          skin_colors: "n/a",
          hair_colors: "n/a",
          eye_colors: "n/a",
          average_lifespan: "indefinite",
          homeworld: null,
          language: "n/a",
          people: [],
          films: [],
          created: "2014-12-10T13:52:11.567000Z",
          edited: "2014-12-20T21:36:42.136000Z",
          url: "https://swapi.dev/api/species/2/",
        },
      ];

      const residentWithDetails: ResidentWithDetails = {
        ...mockResident,
        speciesDetails: multipleSpecies,
      };

      const { getByText } = render(
        <div>{renderSpeciesList(residentWithDetails)}</div>
      );

      expect(getByText("Human")).toBeInTheDocument();
      expect(getByText("Droid")).toBeInTheDocument();
    });
  });

  describe("renderVehicleList", () => {
    it("should return null when resident has no vehicles", () => {
      const residentWithoutVehicles: Resident = {
        ...mockResident,
        vehicles: [],
      };

      const result = renderVehicleList(residentWithoutVehicles);
      expect(result).toBeNull();
    });

    it("should render vehicle details when present", () => {
      const residentWithDetails: ResidentWithDetails = {
        ...mockResident,
        vehicleDetails: mockVehicles,
      };

      const { getByText } = render(
        <div>{renderVehicleList(residentWithDetails)}</div>
      );

      expect(getByText("Snowspeeder")).toBeInTheDocument();
      expect(getByText("t-47 airspeeder")).toBeInTheDocument();
    });

    it("should render count when vehicle details are not available", () => {
      const result = renderVehicleList(mockResident);

      const { getByText } = render(<div>{result}</div>);
      expect(getByText("1 vehicle")).toBeInTheDocument();
    });

    it("should render plural form when multiple vehicles", () => {
      const residentWithMultipleVehicles: Resident = {
        ...mockResident,
        vehicles: [
          "https://swapi.dev/api/vehicles/14/",
          "https://swapi.dev/api/vehicles/30/",
        ],
      };

      const result = renderVehicleList(residentWithMultipleVehicles);

      const { getByText } = render(<div>{result}</div>);
      expect(getByText("2 vehicles")).toBeInTheDocument();
    });

    it("should render multiple vehicles when present", () => {
      const multipleVehicles: Vehicle[] = [
        ...mockVehicles,
        {
          name: "X-34 landspeeder",
          model: "X-34 landspeeder",
          manufacturer: "SoroSuub Corporation",
          cost_in_credits: "10550",
          length: "3.4",
          max_atmosphering_speed: "250",
          crew: "1",
          passengers: "1",
          cargo_capacity: "5",
          consumables: "unknown",
          vehicle_class: "repulsorcraft",
          pilots: [],
          films: [],
          created: "2014-12-10T16:13:52.586000Z",
          edited: "2014-12-20T21:30:21.668000Z",
          url: "https://swapi.dev/api/vehicles/7/",
        },
      ];

      const residentWithDetails: ResidentWithDetails = {
        ...mockResident,
        vehicleDetails: multipleVehicles,
      };

      const { getByText, getAllByText } = render(
        <div>{renderVehicleList(residentWithDetails)}</div>
      );

      expect(getByText("Snowspeeder")).toBeInTheDocument();
      expect(getByText("t-47 airspeeder")).toBeInTheDocument();
      const x34Elements = getAllByText("X-34 landspeeder");
      expect(x34Elements.length).toBeGreaterThan(0);
    });
  });
});
