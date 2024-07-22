"use client";

import { useState } from "react";

import {
  BestRatesForm,
  BestRatesHeader,
  BestRatesStatus,
} from "@/app/(protected)/properties/[shortname]/_components";

import { BestRate, BestRatesViewProps } from "@/types/definitions";

export default function BestRatesView({ property }: BestRatesViewProps) {
  const [bestRateSelected, setBestRateSelected] = useState<BestRate>();

  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2">
        <BestRatesHeader propertyName={property.name} />
        <BestRatesForm
          propertyId={property.id}
          bestRate={bestRateSelected}
        />
      </div>
      <BestRatesStatus
        bestRates={property.bestRates}
        bestRateSelected={bestRateSelected}
        selectBestRate={setBestRateSelected}
      />
    </div>
  );
}
