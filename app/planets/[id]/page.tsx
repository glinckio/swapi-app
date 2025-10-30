"use client";

import { use, useMemo } from "react";
import { usePlanet } from "@/hooks/usePlanet";
import { useResidents } from "@/hooks/useResidents";
import { useFilms } from "@/hooks/useFilms";
import {
  PlanetDetailsHeader,
  PlanetInfoGrid,
  PlanetResidentsSection,
  PlanetFilmsSection,
  PlanetDetailsLoadingState,
  PlanetDetailsErrorState,
} from "@/components/planets";

interface PlanetDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function PlanetDetailsPage({ params }: PlanetDetailsPageProps) {
  const { id } = use(params);
  const { planet, loading: planetLoading, error: planetError } = usePlanet(id);

  const residentUrls = useMemo(
    () => planet?.residents || [],
    [planet?.residents]
  );

  const filmUrls = useMemo(() => planet?.films || [], [planet?.films]);

  const { residents, loading: residentsLoading } = useResidents(residentUrls);
  const { films, loading: filmsLoading } = useFilms(filmUrls);

  if (planetLoading) {
    return <PlanetDetailsLoadingState />;
  }

  if (planetError || !planet) {
    return (
      <PlanetDetailsErrorState
        message={planetError?.message || "Planet not found"}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PlanetDetailsHeader planetName={planet.name} />
      <PlanetInfoGrid planet={planet} />
      <PlanetResidentsSection
        residents={residents}
        loading={residentsLoading}
      />
      <PlanetFilmsSection films={films} loading={filmsLoading} />
    </div>
  );
}
