import db from "@/lib/db";

import { BestRateState } from "@prisma/client";

export default async function publishBestRateById(
  propertyId: string,
  bestRateId: string
) {
  try {
    const [_bestRateArchived, bestRatePublished] = await db.$transaction([
      db.bestRate.updateMany({
        where: {
          propertyId,
          state: BestRateState.PUBLISHED,
        },
        data: {
          state: BestRateState.ARCHIVED,
        },
      }),
      db.bestRate.update({
        where: {
          id: bestRateId,
        },
        data: {
          state: BestRateState.PUBLISHED,
        },
      }),
    ]);
    return bestRatePublished;
  } catch {
    return null;
  }
}
