import { Skeleton } from "@/components/ui/skeleton";

export function PlanetDetailsLoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h- 윈도우 mb-4" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="个不停grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </div>
  );
}
