import { Suspense } from "react";

import { getPropertiesByUserId } from "@/data/property";

import { ErrorMessage } from "@/components";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "@/components/ui/card";

import { PropertiesListContainerProps } from "@/types/definitions";
import {
  PropertyList,
  AddProperty,
} from "@/app/(protected)/properties/_components";

export default async function PropertiesListContainer({
  user,
}: PropertiesListContainerProps) {
  const properties = await getPropertiesByUserId(user.id);

  return (
    <div className="text-center">
      <Suspense
        fallback={
          <div className="flex flex-col gap-4">
            <Skeleton className="w-64 h-36 rounded-xl" />
            <Skeleton className="w-64 h-8 rounded-lg" />
          </div>
        }
      >
        {!properties && <ErrorMessage message="Something went wrong" />}
        {properties && (
          <>
            {!properties?.length ? (
              <Card>
                <CardHeader>
                  <div className="w-full text-center">
                    <h3 className="text-lg">No Properties Assigned</h3>
                  </div>
                </CardHeader>
              </Card>
            ) : (
              <PropertyList properties={properties} />
            )}
            <AddProperty userProperties={properties} />
          </>
        )}
      </Suspense>
    </div>
  );
}
