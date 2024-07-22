import { Suspense } from "react";

import { notFound } from "next/navigation";

import { PropertyDetailPageProps } from "@/types/definitions";
import { findPropertyByShortname } from "@/data/property";

import { Skeleton } from "@/components/ui/skeleton";
import { BestRatesView } from "@/app/(protected)/properties/[shortname]/_components";

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const shortname = params.shortname;
  const property = await findPropertyByShortname(shortname);

  if (!property) {
    notFound();
  }

  return (
    <Suspense fallback={<Skeleton className="w-[490px] h-[290px] rounded-xl" />}>
      <BestRatesView property={property} />
    </Suspense>
  );
}
