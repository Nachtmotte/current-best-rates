import db from "@/lib/db";

export default async function addBestRateToProperty(name: string, valueDates: Date[], propertyId: string) {
  try {
    const bestRate = await db.bestRate.create({
      data: {
        name,
        valueDates,
        property: {
          connect: { id: propertyId },
        },
      },
    });
    return bestRate;
  } catch {
    return null;
  }
}
