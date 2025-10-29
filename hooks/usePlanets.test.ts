import { renderHook, waitFor } from "@testing-library/react";
import { usePlanets } from "./usePlanets";
import * as apiModule from "@/lib/api";

jest.mock("@/lib/api");

describe("usePlanets", () => {
  const mockFetchPlanets = apiModule.fetchPlanets as jest.MockedFunction<
    typeof apiModule.fetchPlanets
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return planets data", async () => {
    const mockData = {
      count: 60,
      next: null,
      previous: null,
      results: [
        {
          name: "Tatooine",
          rotation_period: "23",
          orbital_period: "304",
          diameter: "10465",
          climate: "arid",
          gravity: "1 standard",
          terrain: "desert",
          surface_water: "1.5",
          population: "200000",
          residents: [],
          films: [],
          created: "2014-12-09T13:50:49.641000Z",
          edited: "2014-12-20T20:58:18.411000Z",
          url: "https://swapi.dev/api/planets/1/",
        },
      ],
    };

    mockFetchPlanets.mockResolvedValue(mockData);

    const { result } = renderHook(() => usePlanets({ page: 1 }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.planets).toEqual(mockData.results);
    expect(result.current.totalPages).toBe(6);
    expect(result.current.error).toBeNull();
  });

  it("should handle search parameter", async () => {
    mockFetchPlanets.mockResolvedValue({
      count: 1,
      next: null,
      previous: null,
      results: [],
    });

    renderHook(() => usePlanets({ search: "tatoo", page: 1 }));

    await waitFor(() => {
      expect(mockFetchPlanets).toHaveBeenCalledWith("tatoo", 1);
    });
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    mockFetchPlanets.mockRejectedValue(error);

    const { result } = renderHook(() => usePlanets());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.planets).toEqual([]);
  });

  it("should sort planets alphabetically by name", async () => {
    const mockData = {
      count: 3,
      next: null,
      previous: null,
      results: [
        {
          name: "Dagobah",
          rotation_period: "23",
          orbital_period: "341",
          diameter: "unknown",
          climate: "murky",
          gravity: "N/A",
          terrain: "swamp, jungles",
          surface_water: "8",
          population: "unknown",
          residents: [],
          films: [],
          created: "2014-12-10T11:42:00.000000Z",
          edited: "2014-12-20T20:58:18.411000Z",
          url: "https://swapi.dev/api/planets/5/",
        },
        {
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
        },
        {
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
        },
      ],
    };

    mockFetchPlanets.mockResolvedValue(mockData);

    const { result } = renderHook(() => usePlanets({ page: 1 }));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Verify planets are sorted alphabetically
    expect(result.current.planets[0].name).toBe("Alderaan");
    expect(result.current.planets[1].name).toBe("Dagobah");
    expect(result.current.planets[2].name).toBe("Tatooine");
  });
});
