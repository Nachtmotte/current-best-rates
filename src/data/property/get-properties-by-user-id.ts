import db from "@/lib/db";

export default async function getPropertiesByUserId(userId: string | undefined) {
    try {
        const properties = await db.property.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                bestRates: {
                    select: {
                        updatedAt: true,
                    },
                    orderBy: {
                        updatedAt: 'desc',
                    },
                    take: 1,
                },
            },
        });
        return properties;
    } catch {
        return null;
    }
}
