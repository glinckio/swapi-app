import { renderHook, waitFor } from "@testing-library/react";
import { useResidents } from "./useResidents";
import * as apiModule from "@/lib/api";
import { Resident } from "@/types/resident.types";

jest.mock("@/lib/api");

describe("useResidents", () => {
  const mockFetchMultiple = apiModule.fetchMultiple as jest.MockedFunction<
    typeof apiModule.fetchMultiple
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return residents data", async () => {
    const mockResidents: Resident[] = [
      {
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
        species: [],
        vehicles: [],
        starships: [],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      },
    ];

    const urls = ["https://swapi.dev/api/people/1/"];
    mockFetchMultiple.mockResolvedValue(mockResidents);

    const { result } = renderHook(() => useResidents(urls));

    expect(result.current.loading).toBe(true);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.residents).toEqual(mockResidents);
    expect(result.current.error).toBeNull();
  });

  it("should return empty array when no urls provided", async () => {
    const { result } = renderHook(() => useResidents([]));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.residents).toEqual([]);
    expect(mockFetchMultiple).not.toHaveBeenCalled();
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    mockFetchMultiple.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useResidents(["https://swapi.dev/api/people/1/"])
    );

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toEqual(error);
    expect(result.current.residents).toEqual([]);
  });

  it("should handle multiple residents", async () => {
    const mockResidents: Resident[] = [
      {
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
        species: [],
        vehicles: [],
        starships: [],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      },
      {
        name: "C-3PO",
        height: "167",
        mass: "75",
        hair_color: "n/a",
        skin_color: "gold",
        eye_color: "yellow",
        birth_year: "112BBY",
        gender: "n/a",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: "2014-12-10T15:10:51.357000Z",
        edited: "2014-12-20T21:17:50.309000Z",
        url: "https://swapi.dev/api/people/2/",
      },
    ];

    const urls = [
      "https://swapi.dev/api/people/1/",
      "https://swapi.dev/api/people/2/",
    ];
    mockFetchMultiple.mockResolvedValue(mockResidents);

    const { result } = renderHook(() => useResidents(urls));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.residents).toHaveLength(2);
    expect(result.current.residents[0].name).toBe("Luke Skywalker");
    expect(result.current.residents[1].name).toBe("C-3PO");
  });

  it("should refetch when urls change", async () => {
    const mockResidents: Resident[] = [
      {
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
        species: [],
        vehicles: [],
        starships: [],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.dev/api/people/1/",
      },
    ];

    mockFetchMultiple.mockResolvedValue(mockResidents);

    const { result, rerender } = renderHook(({ urls }) => useResidents(urls), {
      initialProps: { urls: ["https://swapi.dev/api/people/1/"] },
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(1);

    rerender({ urls: ["https://swapi.dev/api/people/2/"] });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(2);
  });
});
