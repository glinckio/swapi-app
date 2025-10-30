import { renderHook, waitFor } from "@testing-library/react";
import { useResidentWithDetails } from "./useResidentWithDetails";
import * as useSpeciesModule from "./useSpecies";
import * as useVehiclesModule from "./useVehicles";
import { Resident } from "@/types/resident.types";
import { Species } from "@/types/species.types";
import { Vehicle } from "@/types/vehicle.types";

jest.mock("./useSpecies");
jest.mock("./useVehicles");

describe("useResidentWithDetails", () => {
  const mockUseSpecies = useSpeciesModule.useSpecies as jest.MockedFunction<
    typeof useSpeciesModule.useSpecies
  >;
  const mockUseVehicles = useVehiclesModule.useVehicles as jest.MockedFunction<
    typeof useVehiclesModule.useVehicles
  >;

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should combine resident with both species and vehicles by default", async () => {
    mockUseSpecies.mockReturnValue({
      species: mockSpecies,
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: mockVehicles,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useResidentWithDetails(mockResident));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resident.name).toBe("Luke Skywalker");
    expect(result.current.resident.speciesDetails).toEqual(mockSpecies);
    expect(result.current.resident.vehicleDetails).toEqual(mockVehicles);
    expect(result.current.hasDetails).toBe(true);
  });

  it("should combine resident with only species when includeVehicles is false", async () => {
    mockUseSpecies.mockReturnValue({
      species: mockSpecies,
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: true,
        includeVehicles: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resident.speciesDetails).toEqual(mockSpecies);
    expect(result.current.resident.vehicleDetails).toBeUndefined();
    expect(result.current.hasDetails).toBe(true);
  });

  it("should combine resident with only vehicles when includeSpecies is false", async () => {
    mockUseSpecies.mockReturnValue({
      species: [],
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: mockVehicles,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: false,
        includeVehicles: true,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resident.speciesDetails).toBeUndefined();
    expect(result.current.resident.vehicleDetails).toEqual(mockVehicles);
    expect(result.current.hasDetails).toBe(true);
  });

  it("should return original resident when both options are false", async () => {
    mockUseSpecies.mockReturnValue({
      species: [],
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: false,
        includeVehicles: false,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.resident.name).toBe("Luke Skywalker");
    expect(result.current.resident.speciesDetails).toBeUndefined();
    expect(result.current.resident.vehicleDetails).toBeUndefined();
    expect(result.current.hasDetails).toBe(false);
  });

  it("should set loading to true when either hook is loading", async () => {
    mockUseSpecies.mockReturnValue({
      species: [],
      loading: true,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useResidentWithDetails(mockResident));

    expect(result.current.loading).toBe(true);
  });

  it("should pass empty arrays to hooks when options are disabled", () => {
    mockUseSpecies.mockReturnValue({
      species: [],
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: [],
      loading: false,
      error: null,
    });

    renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: false,
        includeVehicles: false,
      })
    );

    expect(mockUseSpecies).toHaveBeenCalledWith([]);
    expect(mockUseVehicles).toHaveBeenCalledWith([]);
  });

  it("should set hasDetails to true when species are present", async () => {
    mockUseSpecies.mockReturnValue({
      species: mockSpecies,
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: [],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: true,
        includeVehicles: false,
      })
    );

    await waitFor(() => {
      expect(result.current.hasDetails).toBe(true);
    });
  });

  it("should set hasDetails to true when vehicles are present", async () => {
    mockUseSpecies.mockReturnValue({
      species: [],
      loading: false,
      error: null,
    });
    mockUseVehicles.mockReturnValue({
      vehicles: mockVehicles,
      loading: false,
      error: null,
    });

    const { result } = renderHook(() =>
      useResidentWithDetails(mockResident, {
        includeSpecies: false,
        includeVehicles: true,
      })
    );

    await waitFor(() => {
      expect(result.current.hasDetails).toBe(true);
    });
  });
});
