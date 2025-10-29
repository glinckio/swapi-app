"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PlanetDetailsHeaderProps {
  planetName: string;
}

export function PlanetDetailsHeader({ planetName }: PlanetDetailsHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-4">
        <Button onClick={() => router.back()} variant="outline" size="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span className="sr-only">Back to Planets</span>
        </Button>
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {planetName}
          </h1>
        </div>
      </div>
      <p className="text-gray-400 ml-14">
        Explore the details of this amazing world
      </p>
    </div>
  );
}
