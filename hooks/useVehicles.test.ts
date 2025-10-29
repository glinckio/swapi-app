import { renderHook, waitFor } from "@testing-library/react";
import { useVehicles } from "./useVehicles";
import * as apiModule from "@/lib/api";
import { Vehicle } from "@/types/vehicle.types";

jest.mock("@/lib/api");

describe("useVehicles", () => {
  const mockFetchMultiple = apiModule.fetchMultiple as jest.MockedFunction<
    typeof apiModule.fetchMultiple
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and return vehicles data", async () => {
    const mockVehicles: Vehicle[] = [
      {
        name: "Sand Crawler",
        model: "Digger Crawler",
        manufacturer: "Corellia Mining Corporation",
        cost_in_credits: "150000",
        length: "36.8",
        max_atmosphereing_speed: "30",
        crew: "46",
        passengers: "30",
        cargo_capacity: "50000",
        consumables: "2 months",
        vehicle_class: "wheeled",
        pilots: [],
        films: [],
        created: "2014-12-10T15:36:25.724000Z",
        edited: "2014-12-20T21:30:21.661000Z",
        url: "https://swapi.dev/api/vehicles/4/",
      },
    ];

    const urls = ["https://swapi.dev/api/vehicles/4/"];
    mockFetchMultiple.mockResolvedValue(mockVehicles);

    const { result } = renderHook(() => useVehicles(urls));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.vehicles).toEqual(mockVehicles);
    expect(result.current.error).toBeNull();
  });

  it("should return empty array when no urls provided", async () => {
    const { result } = renderHook(() => useVehicles([]));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.vehicles).toEqual([]);
    expect(mockFetchMultiple).not.toHaveBeenCalled();
  });

  it("should handle fetch errors", async () => {
    const error = new Error("Network error");
    mockFetchMultiple.mockRejectedValue(error);

    const { result } = renderHook(() =>
      useVehicles(["https://swapi.dev/api/vehicles/4/"])
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.vehicles).toEqual([]);
  });

  it("should handle multiple vehicles", async () => {
    const mockVehicles: Vehicle[] = [
      {
        name: "Sand Crawler",
        model: "Digger Crawler",
        manufacturer: "Corellia Mining Corporation",
        cost_in_credits: "150000",
        length: "36.8",
        max_atmosphereing_speed: "30",
        crew: "46",
        passengers: "30",
        cargo_capacity: "50000",
        consumables: "2 months",
        vehicle_class: "wheeled",
        pilots: [],
        films: [],
        created: "2014-12-10T15:36:25.724000Z",
        edited: "2014-12-20T21:30:21.661000Z",
        url: "https://swapi.dev/api/vehicles/4/",
      },
      {
        name: "T-16 skyhopper",
        model: "T-16 skyhopper",
        manufacturer: "Incom Corporation",
        cost_in_credits: "14500",
        length: "10.4",
        max_atmosphereing_speed: "1200",
        crew: "1",
        passengers: "1",
        cargo_capacity: "50",
        consumables: "0",
        vehicle_class: "repulsorcraft",
        pilots: [],
        films: [],
        created: "2014-12-10T16:01:52.434000Z",
        edited: "2014-12-20T21:30:21.665000Z",
        url: "https://swapi.dev/api/vehicles/6/",
      },
    ];

    const urls = [
      "https://swapi.dev/api/vehicles/4/",
      "https://swapi.dev/api/vehicles/6/",
    ];
    mockFetchMultiple.mockResolvedValue(mockVehicles);

    const { result } = renderHook(() => useVehicles(urls));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.vehicles).toHaveLength(2);
    expect(result.current.vehicles[0].name).toBe("Sand Crawler");
    expect(result.current.vehicles[0].model).toBe("Digger Crawler");
    expect(result.current.vehicles[1].name).toBe("T-16 skyhopper");
    expect(result.current.vehicles[1].model).toBe("T-16 skyhopper");
  });

  it("should refetch when urls change", async () => {
    const mockVehicles: Vehicle[] = [
      {
        name: "Sand Crawler",
        model: "Digger Crawler",
        manufacturer: "Corellia Mining Corporation",
        cost_in_credits: "150000",
        length: "36.8",
        max_atmosphereing_speed: "30",
        crew: "46",
        passengers: "30",
        cargo_capacity: "50000",
        consumables: "2 months",
        vehicle_class: "wheeled",
        pilots: [],
        films: [],
        created: "2014-12-10T15:36:25.724000Z",
        edited: "2014-12-20T21:30:21.661000Z",
        url: "https://swapi.dev/api/vehicles/4/",
      },
    ];

    mockFetchMultiple.mockResolvedValue(mockVehicles);

    const { result, rerender } = renderHook(({ urls }) => useVehicles(urls), {
      initialProps: { urls: ["https://swapi.dev/api/vehicles/4/"] },
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetchMultiple).toHaveBeenCalledTimes(1);

    rerender({ urls: ["https://swapi.dev/api/vehicles/6/"] });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(mockFetchMultiple).toHaveBeenCalledTimes(2);
  });
});
