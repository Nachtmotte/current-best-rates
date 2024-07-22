"use server";

import { AuthError } from "next-auth";

import { z } from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_SIGN_IN_REDIRECT } from "@/routes";

export default async function login(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_SIGN_IN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid fields" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
