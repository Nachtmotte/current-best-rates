import { cn, sortValueDates, titleCase } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { BestRateStatusProps } from "@/types/definitions";

export default function BestRatesStatus({
  bestRates,
  selectBestRate,
  bestRateSelected,
}: BestRateStatusProps) {
  return (
    <Card className="w-64 h-[414px]">
      <CardHeader className="pb-0">
        <h3 className="text-center font-semibold">Value Dates</h3>
      </CardHeader>
      <CardContent className="h-3/4 py-2 px-4">
        <ScrollArea className="h-full w-full rounded-md border">
          <div>
            {sortValueDates(bestRates).map((bestRate, index, { length }) => (
              <div
                key={bestRate.id}
                className={cn(
                  "hover:bg-slate-300 cursor-pointer px-2 pt-2 flex flex-col items-center",
                  bestRate.id === bestRateSelected?.id ? "bg-slate-200" : ""
                )}
                onClick={() => selectBestRate(bestRate)}
              >
                <div className="flex h-5 items-center space-x-4 text-sm mb-2">
                  <div>{bestRate.name}</div>
                  <Separator orientation="vertical" />
                  <div>{titleCase(bestRate.state)}</div>
                </div>
                {index + 1 === length ? "" : <Separator />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          disabled={!bestRateSelected}
          onClick={() => selectBestRate(undefined)}
        >
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
}
