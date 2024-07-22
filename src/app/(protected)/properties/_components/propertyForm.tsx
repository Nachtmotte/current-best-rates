"use client";

import { useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { addProperty } from "@/actions/property";

import { AddPropertySchema } from "@/schemas/property";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { PropertySelector } from "@/app/(protected)/properties/_components";

import { PlusIcon } from "@radix-ui/react-icons";

import { PropertyFormProps } from "@/types/definitions";

export default function PropertyForm({ properties, userProperties }: PropertyFormProps) {
  const form = useForm<z.infer<typeof AddPropertySchema>>({
    resolver: zodResolver(AddPropertySchema),
    defaultValues: { name: "" },
  });

  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof AddPropertySchema>) => {
    setError("");

    startTransition(() => {
      addProperty(values, properties)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex mt-4">
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <FormItem>
                <FormControl>
                  <PropertySelector
                    form={form}
                    properties={properties}
                    userProperties={userProperties}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ErrorMessage message={error} />
          <Button type="submit" disabled={isPending}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
