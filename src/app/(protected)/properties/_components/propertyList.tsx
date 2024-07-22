"use client";

import { useState, useTransition } from "react";

import { removeProperty } from "@/actions/property";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components";

import { PROPERTIES_PATH } from "@/routes";

import { PropertiesListProps } from "@/types/definitions";

export default function PropertyList({
  properties,
}: PropertiesListProps) {

  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

    function handleRemove(propertyId: string) {
        startTransition(() => {
            removeProperty(propertyId)
              .then((data) => {
                if (data?.error) {
                  setError(data.error);
                }
              })
              .catch(() => setError("Something went wrong"));
          });
    }

  return (
    <>
      {properties?.map((property) => (
        <Card key={property.id}>
          <Link href={`${PROPERTIES_PATH}/${property.shortName}`}>
          <CardHeader className="pb-2">
            <div className="w-full text-center">
              <h2 className="text-lg">{property.name}</h2>
            </div>
          </CardHeader>
          </Link>
          <CardContent className="pb-2">
            <p className="text-xs">
              {property.bestRates[0]?.updatedAt?.toISOString() ||
                "No best rate date added"}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant={"destructive"} size={"sm"} disabled={isPending} onClick={() => handleRemove(property.id)}>
              Remove
            </Button>
          </CardFooter>
          <ErrorMessage message={error} />
        </Card>
      ))}
    </>
  );
}
