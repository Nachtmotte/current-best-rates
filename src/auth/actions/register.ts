"use server";

import { redirect } from "next/navigation";

import { AUTH_SIGN_IN_PATH } from "../constants";
import { createUser, getUserByEmail } from "@/data/user";

export default async function register(prevState: any, formData: FormData) {
  const { email, password } = Object.fromEntries(formData) as {
    email?: string | null;
    password?: string | null;
  };

  if (!email || !password) {
    return {
      status: "error",
      message: "invalid",
    };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      status: "error",
      message: "Email already in use",
    };
  }

  await createUser({
    email,
    password,
  });

  redirect(AUTH_SIGN_IN_PATH);
}
