import db from "@/lib/db";

export default async function connectPropertyWithUser(
    userId: string,
    propertyId: string
) {
    try {
        const user = await db.user.update({
            where: { id: userId },
            data: {
                properties: {
                    connect: { id: propertyId },
                },
            },
        });
        return user;
    } catch {
        return null;
    }
}
