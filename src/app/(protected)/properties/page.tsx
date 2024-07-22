import { Suspense } from "react";

import { currentUser } from "@/lib/auth";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PropertiesListContainer } from "@/app/(protected)/properties/_components";

export default async function PropertiesPage() {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  return (
    <Card>
      <CardHeader>
        <div className="w-full text-center">
          <h2 className="text-xl font-semibold">Properties</h2>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense
          fallback={
            <div className="flex flex-col gap-4">
              <Skeleton className="w-64 h-36 rounded-xl" />
              <Skeleton className="w-64 h-8 rounded-lg" />
            </div>
          }
        >
          <PropertiesListContainer user={user} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
