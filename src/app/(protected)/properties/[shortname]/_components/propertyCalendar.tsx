import { Calendar } from "@/components/ui/calendar";

import { PropertyCalendarProps } from "@/types/definitions";

export default function PropertyCalendar({
  form, disabled
}: PropertyCalendarProps) {
  return (
    <Calendar
      mode="multiple"
      selected={form.getValues("valueDates")}
      onSelect={(dates) => form.setValue("valueDates", dates || [], { shouldDirty: true })}
      numberOfMonths={2}
      disabled={disabled || { before: new Date() }}
      className="rounded-md border shadow"
    />
  );
}
