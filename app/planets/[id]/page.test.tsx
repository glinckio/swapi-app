import { render, screen, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import PlanetDetailsPage from "./page";
import * as usePlanetModule from "@/hooks/usePlanet";
import * as useResidentsModule from "@/hooks/useResidents";
import * as useFilmsModule from "@/hooks/useFilms";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/usePlanet");
jest.mock("@/hooks/useResidents");
jest.mock("@/hooks/useFilms");

const mockPush = jest.fn();
const mockBack = jest.fn();
const mockUsePlanet = usePlanetModule.usePlanet as jest.MockedFunction<
  typeof usePlanetModule.usePlanet
>;
const mockUseResidents = useResidentsModule.useResidents as jest.MockedFunction<
  typeof useResidentsModule.useResidents
>;
const mockUseFilms = useFilmsModule.useFilms as jest.MockedFunction<
  typeof useFilmsModule.useFilms
>;

describe("PlanetDetailsPage", () => {
  const mockParams = Promise.resolve({ id: "1" });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    mockUseResidents.mockReturnValue({
      residents: [],
      loading: false,
      error: null,
    });
    mockUseFilms.mockReturnValue({
      films: [],
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    mockUsePlanet.mockReturnValue({
      planet: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    let component: ReturnType<typeof render>;

    await act(async () => {
      component = render(<PlanetDetailsPage params={mockParams} />);
    });

    expect(component!).toBeDefined();
    const skeletons = component!.container.querySelectorAll("[class*='h-']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error state", () => {
    mockUsePlanet.mockReturnValue({
      planet: null,
      loading: false,
      error: new Error("Failed to fetch"),
      refetch: jest.fn(),
    });

    render(<PlanetDetailsPage params={mockParams} />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders planet details", async () => {
    const mockPlanet = {
      name: "Tatooine",
      rotation_period: "23",
      orbital_period: "304",
      diameter: "10465",
      climate: "arid",
      gravity: "1 standard",
      terrain: "desert",
      surface_water: "1",
      population: "200000",
      residents: ["https://swapi.dev/api/people/1/"],
      films: ["https://swapi.dev/api/films/1/"],
      created: "2014-12-09T13:50:49.641Z",
      edited: "2014-12-20T20:58:18.411Z",
      url: "https://swapi.dev/api/planets/1/",
    };

    mockUsePlanet.mockReturnValue({
      planet: mockPlanet,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    mockUseResidents.mockReturnValue({
      residents: [
        {
          name: "Luke Skywalker",
          hair_color: "blond",
          eye_color: "blue",
          gender: "male",
          height: "172",
          birth_year: "19BBY",
          mass: "77",
          skin_color: "fair",
          homeworld: "https://swapi.dev/api/planets/1/",
          films: [],
          species: [],
          vehicles: [],
          starships: [],
          created: "",
          edited: "",
          url: "https://swapi.dev/api/people/1/",
        },
      ],
      loading: false,
      error: null,
    });

    render(<PlanetDetailsPage params={mockParams} />);

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Rotation Period")).toBeInTheDocument();
      expect(screen.getByText("Orbital Period")).toBeInTheDocument();
      expect(screen.getByText("Diameter")).toBeInTheDocument();
      expect(screen.getByText("Population")).toBeInTheDocument();
      expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    });
  });

  it("renders no residents message when empty", async () => {
    const mockPlanet = {
      name: "Unknown Planet",
      rotation_period: "unknown",
      orbital_period: "unknown",
      diameter: "unknown",
      climate: "unknown",
      gravity: "unknown",
      terrain: "unknown",
      surface_water: "unknown",
      population: "unknown",
      residents: [],
      films: [],
      created: "",
      edited: "",
      url: "https://swapi.dev/api/planets/999/",
    };

    mockUsePlanet.mockReturnValue({
      planet: mockPlanet,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<PlanetDetailsPage params={mockParams} />);

    await waitFor(() => {
      expect(screen.getByText("No Residents")).toBeInTheDocument();
    });
  });

  it("renders films section when films exist", async () => {
    const mockPlanet = {
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
      films: ["https://swapi.dev/api/films/1/"],
      created: "",
      edited: "",
      url: "https://swapi.dev/api/planets/1/",
    };

    mockUsePlanet.mockReturnValue({
      planet: mockPlanet,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });
    mockUseFilms.mockReturnValue({
      films: [
        {
          title: "A New Hope",
          episode_id: 4,
          opening_crawl: "",
          director: "George Lucas",
          producer: "Gary Kurtz, Rick McCallum",
          release_date: "1977-05-25",
          characters: [],
          planets: [],
          starships: [],
          vehicles: [],
          species: [],
          created: "",
          edited: "",
          url: "https://swapi.dev/api/films/1/",
        },
      ],
      loading: false,
      error: null,
    });

    render(<PlanetDetailsPage params={mockParams} />);

    await waitFor(() => {
      expect(screen.getByText(/Films \(1\)/)).toBeInTheDocument();
    });
  });

  it("displays back button", async () => {
    const mockPlanet = {
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
      created: "",
      edited: "",
      url: "https://swapi.dev/api/planets/1/",
    };

    mockUsePlanet.mockReturnValue({
      planet: mockPlanet,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<PlanetDetailsPage params={mockParams} />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /back to planets/i })
      ).toBeInTheDocument();
    });
  });
});
