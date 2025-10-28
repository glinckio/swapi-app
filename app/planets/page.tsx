"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlanets } from "@/hooks/usePlanets";
import { useDebounce } from "@/hooks/useDebounce";
import {
  ErrorState,
  LoadingState,
  PlanetsGrid,
  PlanetsHeader,
  PlanetsPagination,
  PlanetsSearch,
} from "@/components/planets";
import { extractIdFromUrl } from "@/utils";

export default function PlanetsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);
  const router = useRouter();

  const { planets, loading, error, totalPages } = usePlanets({
    page,
    search: debouncedSearch,
  });

  const handlePlanetClick = (planetUrl: string) => {
    const id = extractIdFromUrl(planetUrl);
    router.push(`/planets/${id}`);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PlanetsHeader />

      <PlanetsSearch
        value={searchInput}
        onChange={(value) => {
          setSearchInput(value);
          if (page !== 1) setPage(1);
        }}
      />

      <PlanetsGrid planets={planets} onPlanetClick={handlePlanetClick} />

      <PlanetsPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
