import db from "@/lib/db";

export default async function updateBestRateById(
  name: string,
  valueDates: Date[],
  bestRateId: string
) {
  try {
    const bestRate = await db.bestRate.update({
      where: {
        id: bestRateId,
      },
      data: {
        name,
        valueDates,
      },
    });
    return bestRate;
  } catch {
    return null;
  }
}
