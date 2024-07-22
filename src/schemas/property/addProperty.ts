import { z } from "zod";

const AddPropertySchema = z.object({
    name: z
        .string()
        .min(1, { message: "Property is required" }),
});

export default AddPropertySchema;