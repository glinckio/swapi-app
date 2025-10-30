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

const buildQueryString = (search?: string, page?: number): string => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  return params.toString();
};

const buildEndpointUrl = (path: string, query: string): string =>
  query ? `${path}?${query}` : path;

export const fetchPlanets = async (
  search?: string,
  page?: number
): Promise<PlanetResponse> => {
  const query = buildQueryString(search, page);
  const endpoint = buildEndpointUrl("/planets", query);
  return fetchFromSWAPI(endpoint);
};

export const fetchPlanetById = <T>(id: string): Promise<T> =>
  fetchFromSWAPI(`/planets/${id}`);

const extractEndpoint = (url: string): string =>
  url.replace(env.NEXT_PUBLIC_API_URL, "");

export const fetchByUrl = <T>(url: string): Promise<T> => {
  const endpoint = extractEndpoint(url);
  return fetchFromSWAPI<T>(endpoint);
};

export const fetchMultiple = <T>(urls: string[]): Promise<T[]> =>
  Promise.all(urls.map(fetchByUrl<T>));

export const getResidentsByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);

export const getSpeciesByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);

export const getVehiclesByUrls = <T>(urls: string[]): Promise<T[]> =>
  fetchMultiple<T>(urls);
