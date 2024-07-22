import { Suspense } from "react";

import { getAllProperties } from "@/data/property";

import { ErrorMessage } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { PropertyForm } from "@/app/(protected)/properties/_components";

import { AddPropertyProps } from "@/types/definitions";

export default async function AddProperty({ userProperties } : AddPropertyProps) {
  const properties = await getAllProperties();

  return (
    <Suspense fallback={<Skeleton className="w-64 h-7 rounded-lg mt-4" />}>
      {!properties && <ErrorMessage message="Something went wrong" />}
      {properties && <PropertyForm properties={properties} userProperties={userProperties} />}
    </Suspense>
  );
}
