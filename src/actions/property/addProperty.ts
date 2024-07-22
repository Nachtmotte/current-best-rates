"use server";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { currentUser } from "@/lib/auth";
import { AddPropertySchema } from "@/schemas/property";
import { connectPropertyWithUser } from "@/data/property";

import { PROPERTIES_PATH } from "@/routes";

import { Property } from "@/types/definitions";

export default async function addProperty(
    values: z.infer<typeof AddPropertySchema>,
    properties: Property[],
) {
    const user = await currentUser();

    if (!user || !user.id) {
        return { error: "Something went wrong" };
    }

    const validateFields = AddPropertySchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" };
    }

    const { name } = validateFields.data;
    const propertyId = properties.find((property) => property.name === name)?.id;

    if (!propertyId) {
        return { error: "Invalid property" };
    }

    try {
        await connectPropertyWithUser(user.id, propertyId);
        revalidatePath(PROPERTIES_PATH);
        return;
    } catch {
        return { error: "Something went wrong" };
    }
}
