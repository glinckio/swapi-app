import { renderHook, waitFor } from "@testing-library/react";
import { useFilms } from "./useFilms";
import * as apiModule from "@/lib/api";
import { Film } from "@/types/film.types";

jest.mock("@/lib/api");

describe("useFilms", () => {
  const mockFetchMultiple = apiModule.fetchMultiple as jest.MockedFunction<
    typeof apiModule.fetchMultiple
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return films data", async () => {
    const mockFilms: Film[] = [
      {
        title: "A New Hope",
        episode_id: 4,
        opening_crawl:
          "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1977-05-25",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: "2014-12-10T14:23:31.880000Z",
        edited: "2014-12-20T19:49:45.256000Z",
        url: "https://swapi.dev/api/films/1/",
      },
    ];

    const urls = ["https://swapi.dev/api/films/1/"];
    mockFetchMultiple.mockResolvedValue(mockFilms);

    const { result } = renderHook(() => useFilms(urls));

    expect(result.current.loading).toBe(true);

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.films).toEqual(mockFilms);
    expect(result.current.error).toBeNull();
  });

  it("should return empty array when no urls provided", async () => {
    const { result } = renderHook(() => useFilms([]));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.films).toEqual([]);
    expect(mockFetchMultiple).not.toHaveBeenCalled();
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    mockFetchMultiple.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useFilms(["https://swapi.dev/api/films/1/"])
    );

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.error).toEqual(error);
    expect(result.current.films).toEqual([]);
  });

  it("should handle multiple films", async () => {
    const mockFilms: Film[] = [
      {
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "Opening crawl...",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1977-05-25",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: "2014-12-10T14:23:31.880000Z",
        edited: "2014-12-20T19:49:45.256000Z",
        url: "https://swapi.dev/api/films/1/",
      },
      {
        title: "The Empire Strikes Back",
        episode_id: 5,
        opening_crawl: "Opening crawl...",
        director: "Irvin Kershner",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1980-05-17",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: "2014-12-12T11:26:24.656000Z",
        edited: "2014-12-15T13:07:53.386000Z",
        url: "https://swapi.dev/api/films/2/",
      },
    ];

    const urls = [
      "https://swapi.dev/api/films/1/",
      "https://swapi.dev/api/films/2/",
    ];
    mockFetchMultiple.mockResolvedValue(mockFilms);

    const { result } = renderHook(() => useFilms(urls));

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(result.current.films).toHaveLength(2);
    expect(result.current.films[0].title).toBe("A New Hope");
    expect(result.current.films[1].title).toBe("The Empire Strikes Back");
  });

  it("should refetch when urls change", async () => {
    const mockFilms: Film[] = [
      {
        title: "A New Hope",
        episode_id: 4,
        opening_crawl: "Opening crawl...",
        director: "George Lucas",
        producer: "Gary Kurtz, Rick McCallum",
        release_date: "1977-05-25",
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: "2014-12-10T14:23:31.880000Z",
        edited: "2014-12-20T19:49:45.256000Z",
        url: "https://swapi.dev/api/films/1/",
      },
    ];

    mockFetchMultiple.mockResolvedValue(mockFilms);

    const { result, rerender } = renderHook(({ urls }) => useFilms(urls), {
      initialProps: { urls: ["https://swapi.dev/api/films/1/"] },
    });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(1);

    rerender({ urls: ["https://swapi.dev/api/films/2/"] });

    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 3000 }
    );

    expect(mockFetchMultiple).toHaveBeenCalledTimes(2);
  });
});
