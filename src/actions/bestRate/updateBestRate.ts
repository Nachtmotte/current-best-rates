"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { UpdateBestRateSchema } from "@/schemas/bestRate";
import { updateBestRateById } from "@/data/bestRate";

import { PROPERTY_PATH } from "@/routes";

export default async function updateBestRate(
    values: z.infer<typeof UpdateBestRateSchema>,
    bestRateId: string,
) {
    const validateFields = UpdateBestRateSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name, valueDates } = validateFields.data;

    try {
        await updateBestRateById(name, valueDates, bestRateId);
        revalidatePath(PROPERTY_PATH, "page");
        return;
    } catch {
        return { error: "Something went wrong" };
    }
}
