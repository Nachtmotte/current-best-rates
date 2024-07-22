"use client";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CardWrapperProps } from "@/types/definitions";

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardWrapperProps) {
  return (
    <Card className="w-fit min-w-80 shadow-md">
      <CardHeader>
        <div className="w-full text-center">
          <h1 className="text-2xl font-semibold">{headerLabel}</h1>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" className="font-normal w-full" size="sm" asChild>
          <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
