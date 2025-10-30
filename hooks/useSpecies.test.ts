import { renderHook, waitFor } from "@testing-library/react";
import { useSpecies } from "./useSpecies";
import * as apiModule from "@/lib/api";
import { Species } from "@/types/species.types";

jest.mock("@/lib/api");

describe("useSpecies", () => {
  const mockFetchMultiple = apiModule.fetchMultiple as jest.MockedFunction<
    typeof apiModule.fetchMultiple
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return species data", async () => {
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

    const urls = ["https://swapi.dev/api/species/1/"];
    mockFetchMultiple.mockResolvedValue(mockSpecies);

    const { result } = renderHook(() => useSpecies(urls));

    expect(result.current.loading).toBe(true);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.species).toEqual(mockSpecies);
    expect(result.current.error).toBeNull();
  });

  it("should return empty array when no urls provided", async () => {
    const { result } = renderHook(() => useSpecies([]));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.species).toEqual([]);
    expect(mockFetchMultiple).not.toHaveBeenCalled();
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    mockFetchMultiple.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useSpecies(["https://swapi.dev/api/species/1/"])
    );

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toEqual(error);
    expect(result.current.species).toEqual([]);
  });

  it("should handle multiple species", async () => {
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
        created: "2014-12-10T15:16:16.259000Z",
        edited: "2014-12-20T21:36:42.139000Z",
        url: "https://swapi.dev/api/species/2/",
      },
    ];

    const urls = [
      "https://swapi.dev/api/species/1/",
      "https://swapi.dev/api/species/2/",
    ];
    mockFetchMultiple.mockResolvedValue(mockSpecies);

    const { result } = renderHook(() => useSpecies(urls));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.species).toHaveLength(2);
    expect(result.current.species[0].name).toBe("Human");
    expect(result.current.species[1].name).toBe("Droid");
  });

  it("should refetch when urls change", async () => {
    const mockSpecies: Species[] = [
      {
        name: "Human",
        classification: "mammal",
        designation: "sentient",
        average_height: "180",
        skin_colors: "caucasian",
        hair_colors: "brown",
        eye_colors: "brown",
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

    mockFetchMultiple.mockResolvedValue(mockSpecies);

    const { result, rerender } = renderHook(({ urls }) => useSpecies(urls), {
      initialProps: { urls: ["https://swapi.dev/api/species/1/"] },
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(1);

    rerender({ urls: ["https://swapi.dev/api/species/2/"] });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(2);
  });
});
