"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { AddBestRateSchema } from "@/schemas/bestRate";
import { addBestRateToProperty } from "@/data/bestRate";

import { PROPERTY_PATH } from "@/routes";

export default async function addBestRate(
    values: z.infer<typeof AddBestRateSchema>,
    propertyId: string,
) {
    const validateFields = AddBestRateSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name, valueDates } = validateFields.data;

    try {
        await addBestRateToProperty(name, valueDates, propertyId);
        revalidatePath(PROPERTY_PATH, "page");
        return;
    } catch {
        return { error: "Something went wrong" };
    }
}
