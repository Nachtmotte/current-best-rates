import { z } from "zod";

const AddBestRateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    valueDates: z.array(z.date()).min(1, {
        message: "Select at least one day",
    }),
});

export default AddBestRateSchema;
