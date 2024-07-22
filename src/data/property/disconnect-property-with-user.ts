import db from "@/lib/db";

export default async function disconnectPropertyWithUser(
    userId: string,
    propertyId: string
) {
    try {
        const user = await db.user.update({
            where: { id: userId },
            data: {
                properties: {
                    disconnect: { id: propertyId },
                },
            },
        });
        return user;
    } catch {
        return null;
    }
}
