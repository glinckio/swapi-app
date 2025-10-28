import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md border-primary/20 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
            <div
              className="h-full w-full rounded-full bg-gradient-to-br from-primary via-secondary to-accent shadow-lg shadow-primary/50"
              style={{
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-6xl font-bold tracking-tight text-primary">
              404
            </CardTitle>
            <CardDescription className="text-lg">
              Planet not found
            </CardDescription>
          </div>

          <p className="text-sm text-muted-foreground">
            This planet seems to have disappeared into the void. Perhaps it was
            pulled into a black hole or drifted into unknown space.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full" size="lg">
              <Link href="/">Return to Home Planet</Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link href="/planets">Explore Other Planets</Link>
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Lost? Try returning to the{" "}
            <Link href="/" className="text-primary hover:underline">
              galaxy map
            </Link>{" "}
            or contact mission control.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
