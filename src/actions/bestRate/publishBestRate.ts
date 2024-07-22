"use server";

import { revalidatePath } from "next/cache";

import { publishBestRateById } from "@/data/bestRate";

import { PROPERTY_PATH } from "@/routes";

export default async function publishBestRate(
    propertyId: string,
    bestRateId: string,
) {

    if (!propertyId || !bestRateId) {
        return { error: "Something went wrong" };
    }

    try {
        await publishBestRateById(propertyId, bestRateId);
        revalidatePath(PROPERTY_PATH, "page");
        return;
    } catch {
        return { error: "Something went wrong" };
    }
}
