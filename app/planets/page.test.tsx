import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import PlanetsPage from "./page";
import * as usePlanetsModule from "@/hooks/usePlanets";
import * as useDebounceModule from "@/hooks/useDebounce";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/usePlanets");

jest.mock("@/hooks/useDebounce");

jest.mock("@/hooks/useFilms", () => ({
  useFilms: jest.fn(() => ({
    films: [],
    loading: false,
    error: null,
  })),
}));

const mockPush = jest.fn();
const mockUsePlanets = usePlanetsModule.usePlanets as jest.MockedFunction<
  typeof usePlanetsModule.usePlanets
>;
const mockUseDebounce = useDebounceModule.useDebounce as jest.MockedFunction<
  typeof useDebounceModule.useDebounce
>;

describe("PlanetsPage", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockUseDebounce.mockImplementation((value: string) => value);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state with skeletons", () => {
    mockUsePlanets.mockReturnValue({
      planets: [],
      loading: true,
      error: null,
      totalPages: 0,
      refetch: jest.fn(),
    });

    const { container } = render(<PlanetsPage />);
    const skeletons = container.querySelectorAll("[class*='animate-pulse']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders error state", () => {
    mockUsePlanets.mockReturnValue({
      planets: [],
      loading: false,
      error: new Error("Failed to fetch"),
      totalPages: 0,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders planets list", async () => {
    mockUsePlanets.mockReturnValue({
      planets: [
        {
          name: "Tatooine",
          terrain: "desert",
          diameter: "10465",
          climate: "arid",
          films: ["https://swapi.dev/api/films/1/"],
          url: "https://swapi.dev/api/planets/1/",
        },
        {
          name: "Alderaan",
          terrain: "grasslands",
          diameter: "12500",
          climate: "temperate",
          films: ["https://swapi.dev/api/films/1/"],
          url: "https://swapi.dev/api/planets/2/",
        },
      ],
      loading: false,
      error: null,
      totalPages: 1,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);

    await waitFor(() => {
      expect(screen.getByText("Tatooine")).toBeInTheDocument();
      expect(screen.getByText("Alderaan")).toBeInTheDocument();
    });
  });

  it("renders search input with label", () => {
    mockUsePlanets.mockReturnValue({
      planets: [],
      loading: false,
      error: null,
      totalPages: 0,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);
    const input = screen.getByLabelText(/Search for a planet/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("id", "planet-search");
  });

  it("renders pagination controls with aria labels", () => {
    mockUsePlanets.mockReturnValue({
      planets: [],
      loading: false,
      error: null,
      totalPages: 3,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(
      screen.getByRole("navigation", { name: /Planets pagination/i })
    ).toBeInTheDocument();
  });

  it("displays no planets message when empty", () => {
    mockUsePlanets.mockReturnValue({
      planets: [],
      loading: false,
      error: null,
      totalPages: 0,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);
    expect(screen.getByText("No planets found")).toBeInTheDocument();
  });

  it("renders planet card as button with aria-label", () => {
    const mockPlanets = [
      {
        name: "Tatooine",
        terrain: "desert",
        diameter: "10465",
        climate: "arid",
        films: ["https://swapi.dev/api/films/1/"],
        url: "https://swapi.dev/api/planets/1/",
      },
    ];

    mockUsePlanets.mockReturnValue({
      planets: mockPlanets,
      loading: false,
      error: null,
      totalPages: 1,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);

    const card = screen.getByRole("button", {
      name: /Planet Tatooine details/i,
    });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("tabIndex", "0");
  });

  it("handles planet card click", () => {
    const mockPlanets = [
      {
        name: "Alderaan",
        terrain: "grasslands",
        diameter: "12500",
        climate: "temperate",
        films: ["https://swapi.dev/api/films/1/"],
        url: "https://swapi.dev/api/planets/2/",
      },
    ];

    mockUsePlanets.mockReturnValue({
      planets: mockPlanets,
      loading: false,
      error: null,
      totalPages: 1,
      refetch: jest.fn(),
    });

    render(<PlanetsPage />);

    const card = screen.getByRole("button", {
      name: /Planet Alderaan details/i,
    });
    card.click();

    expect(mockPush).toHaveBeenCalledWith("/planets/2");
  });
});
