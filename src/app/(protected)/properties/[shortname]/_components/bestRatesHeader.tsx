import { Card, CardHeader } from "@/components/ui/card";

import { BestRatesHeaderProps } from "@/types/definitions";

export default function BestRatesHeader({ propertyName }: BestRatesHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-center font-semibold">{propertyName}</h3>
      </CardHeader>
    </Card>
  );
}
