import env from "@/config/env";
import type { PlanetResponse } from "@/types";

export async function fetchFromSWAPI<T>(endpoint: string): Promise<T> {
  const url = `${env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

export const fetchPlanets = async (
  search?: string,
  page?: number
): Promise<PlanetResponse> => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());

  const query = params.toString();
  return fetchFromSWAPI(`/planets${query ? `?${query}` : ""}`);
};

export const fetchPlanetById = (id: string) => fetchFromSWAPI(`/planets/${id}`);

export const fetchByUrl = <T>(url: string): Promise<T> => {
  const endpoint = url.replace(env.NEXT_PUBLIC_API_URL, "");
  return fetchFromSWAPI(endpoint);
};

export const fetchMultiple = <T>(urls: string[]): Promise<T[]> =>
  Promise.all(urls.map(fetchByUrl<T>));

export const getResidentsByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);

export const getSpeciesByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);

export const getVehiclesByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);
