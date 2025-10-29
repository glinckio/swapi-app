import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { displayValue } from "@/utils";

interface PlanetInfoCardProps {
  title: string;
  value: string;
  unit?: string;
}

export function PlanetInfoCard({
  title,
  value,
  unit = "",
}: PlanetInfoCardProps) {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-white">
          {displayValue(value)}
          {unit && <span className="text-lg text-gray-400 ml-1">{unit}</span>}
        </p>
      </CardContent>
    </Card>
  );
}
