"use server";

import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { disconnectPropertyWithUser } from "@/data/property";

import { PROPERTIES_PATH } from "@/routes";

export default async function removeProperty(
    propertyId: string
) {
    const user = await currentUser();

    if (!user || !user.id) {
        return { error: "Something went wrong" };
    }

    try {
        await disconnectPropertyWithUser(user.id, propertyId);
        revalidatePath(PROPERTIES_PATH);
        return;
    } catch {
        return { error: "Something went wrong" };
    }
}
