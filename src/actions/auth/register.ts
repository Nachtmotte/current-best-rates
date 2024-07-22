"use server";

import { z } from "zod";

import { RegisterSchema } from "@/schemas/auth";
import { createUser, getUserByEmail } from "@/data/user";

export default async function register(
  values: z.infer<typeof RegisterSchema>
) {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    const { email } = validateFields.data;
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use" };
    }

    await createUser(validateFields.data);
    return;
  } catch {
    return { error: "Something went wrong" };
  }
}



