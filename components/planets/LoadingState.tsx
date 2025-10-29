import { Skeleton } from "@/components/ui/skeleton";
import { PlanetCardSkeleton } from "./PlanetCardSkeleton";

export function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 text-center">
        <Skeleton className="h-12 w-64 mx-auto mb-3" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>

      <div className="mb-8 max-w-xl mx-auto">
        <Skeleton className="h-12 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <PlanetCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
