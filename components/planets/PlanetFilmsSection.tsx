import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Film } from "@/types";

interface PlanetFilmsSectionProps {
  films: Film[];
  loading: boolean;
}

export function PlanetFilmsSection({
  films,
  loading,
}: PlanetFilmsSectionProps) {
  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Films
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (films.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Films
        </h2>
        <p className="text-gray-400">No film appearances for this planet.</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Films ({films.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {films.map((film) => (
          <Card
            key={film.url}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700"
          >
            <CardHeader>
              <CardTitle className="text-xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                {film.title}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Episode {film.episode_id}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                Directed by{" "}
                <span className="font-semibold text-purple-400">
                  {film.director}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Released: {new Date(film.release_date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
