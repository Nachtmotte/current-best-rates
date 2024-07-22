"use client";

import { useEffect, useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addBestRate } from "@/actions/bestRate";

import { AddBestRateSchema } from "@/schemas/bestRate";

import {
  Form,
  FormItem,
  FormField,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components";
import { PropertyCalendar } from "@/app/(protected)/properties/[shortname]/_components";

import { BestRateFormProps } from "@/types/definitions";
import {
  isBestRateArchived,
  isBestRateDrafted,
  isBestRatePublished,
} from "@/lib/utils";
import updateBestRate from "@/actions/bestRate/updateBestRate";
import publishBestRate from "@/actions/bestRate/publishBestRate";

export default function BestRatesForm({
  propertyId,
  bestRate,
}: BestRateFormProps) {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddBestRateSchema>>({
    resolver: zodResolver(AddBestRateSchema),
    defaultValues: {
      name: new Date().toLocaleDateString("en-US"),
      valueDates: [],
    },
  });

  useEffect(() => {
    form.setValue(
      "name",
      bestRate?.name || new Date().toLocaleDateString("en-US")
    );
    form.setValue("valueDates", bestRate?.valueDates || []);
  }, [bestRate, form]);

  const isArchived = bestRate?.id && isBestRateArchived(bestRate);
  const isDrafted = bestRate?.id && isBestRateDrafted(bestRate);
  const isPublished = bestRate?.id && isBestRatePublished(bestRate);
  const isDisabled = isArchived || isPublished || isPending;
  const needToSave = isDrafted && form.formState.isDirty;

  const onSubmit = (values: z.infer<typeof AddBestRateSchema>) => {
    setError("");

    startTransition(() => {
      (needToSave
        ? updateBestRate(values, bestRate.id)
        : isDrafted
          ? publishBestRate(propertyId, bestRate.id)
          : addBestRate(values, propertyId)
      )
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else if (!needToSave && !isDrafted) {
            form.reset();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="valueDates"
          render={() => (
            <FormItem>
              <FormControl>
                <PropertyCalendar form={form} disabled={isDisabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-1 mt-2">
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => form.reset()}
            disabled={isDisabled}
          >
            Reset
          </Button>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    disabled={isDisabled}
                    placeholder={new Date().toLocaleDateString("en-US")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isDisabled}>
            {needToSave
              ? "Save"
              : isPublished
                ? "Published"
                : isDrafted
                  ? "Publish"
                  : isArchived
                    ? "Archived"
                    : "Draft"}
          </Button>
        </div>
        <ErrorMessage message={error} />
      </form>
    </Form>
  );
}
