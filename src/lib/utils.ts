import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

import { BestRateState } from "@prisma/client";
import { BestRate, JsonDates } from "@/types/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function datesToJson(dates: Date[]) {
  const result: JsonDates = {};
  dates.forEach((date) => {
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(date.getDate());
  });

  return result;
}

export function sortValueDates(valueDates: BestRate[]) {
  return valueDates.sort((a, b) => {
    if (a.state === b.state) {
      return b.createdAt.getTime() - a.createdAt.getTime();
    }
    return Number(a.state < b.state) || -1;
  });
}

export function titleCase(text: string) {
  return text.replace(
    /^(\w)(.+)/,
    (match, p1, p2) => p1.toUpperCase() + p2.toLowerCase()
  );
}

export function areObjectsEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function isBestRatePublished(bestRate: BestRate) {
  return bestRate.state === BestRateState.PUBLISHED;
}

export function isBestRateDrafted(bestRate: BestRate) {
  return bestRate.state === BestRateState.DRAFTED;
}

export function isBestRateArchived(bestRate: BestRate) {
  return bestRate.state === BestRateState.ARCHIVED;
}
