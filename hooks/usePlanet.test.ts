import { renderHook, waitFor } from "@testing-library/react";
import { usePlanet } from "./usePlanet";
import * as apiModule from "@/lib/api";
import { Planet } from "@/types";

jest.mock("@/lib/api");

describe("usePlanet", () => {
  const mockFetchPlanetById = apiModule.fetchPlanetById as jest.MockedFunction<
    typeof apiModule.fetchPlanetById
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return planet data", async () => {
    const mockPlanet: Planet = {
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
      created: "2014-12-09T13:50:49.641000Z",
      edited: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.dev/api/planets/1/",
    };

    mockFetchPlanetById.mockResolvedValue(mockPlanet);

    const { result } = renderHook(() => usePlanet("1"));

    expect(result.current.loading).toBe(true);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.planet).toEqual(mockPlanet);
    expect(result.current.error).toBeNull();
  });

  it("should return null planet when id is empty", async () => {
    const { result } = renderHook(() => usePlanet(""));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.planet).toBeNull();
    expect(mockFetchPlanetById).not.toHaveBeenCalled();
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Planet not found");
    mockFetchPlanetById.mockRejectedValue(error);

    const { result } = renderHook(() => usePlanet("999"));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toEqual(error);
    expect(result.current.planet).toBeNull();
  });

  it("should refetch when id changes", async () => {
    const mockPlanet1: Planet = {
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
      created: "2014-12-09T13:50:49.641000Z",
      edited: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.dev/api/planets/1/",
    };

    const mockPlanet2: Planet = {
      name: "Alderaan",
      rotation_period: "24",
      orbital_period: "364",
      diameter: "12500",
      climate: "temperate",
      gravity: "1 standard",
      terrain: "grasslands, mountains",
      surface_water: "40",
      population: "2000000000",
      residents: [],
      films: [],
      created: "2014-12-10T11:35:48.479000Z",
      edited: "2014-12-20T20:58:18.420000Z",
      url: "https://swapi.dev/api/planets/2/",
    };

    mockFetchPlanetById
      .mockResolvedValueOnce(mockPlanet1)
      .mockResolvedValueOnce(mockPlanet2);

    const { result, rerender } = renderHook(({ id }) => usePlanet(id), {
      initialProps: { id: "1" },
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.planet?.name).toBe("Tatooine");
    expect(mockFetchPlanetById).toHaveBeenCalledTimes(1);

    rerender({ id: "2" });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.planet?.name).toBe("Alderaan");
    expect(mockFetchPlanetById).toHaveBeenCalledTimes(2);
  });

  it("should provide refetch function", async () => {
    const mockPlanet: Planet = {
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: [],
      films: [],
      created: "2014-12-09T13:50:49.641000Z",
      edited: "2014-12-20T20:58:18.411000Z",
      url: "https://swapi.dev/api/planets/1/",
    };

    mockFetchPlanetById.mockResolvedValue(mockPlanet);

    const { result } = renderHook(() => usePlanet("1"));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.refetch).toBeDefined();
    expect(typeof result.current.refetch).toBe("function");

    result.current.refetch();

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchPlanetById).toHaveBeenCalledTimes(2);
  });
});
