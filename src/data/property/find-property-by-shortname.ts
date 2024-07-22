import db from "@/lib/db";

export default async function findPropertyByShortname(shortName: string | undefined) {
    try {
        const property = await db.property.findUnique({
            where: {
                shortName: shortName,
            },
            include: {
                bestRates: {
                    select: {
                        id: true,
                        name: true,
                        createdAt: true,
                        updatedAt: true,
                        valueDates: true,
                        state: true,
                    },
                },
            },
        });
        return property;
    } catch {
        return null;
    }
}
