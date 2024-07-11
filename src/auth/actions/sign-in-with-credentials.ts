"use server";

import { signIn } from "../index";

export default async function signInWithCredentials(formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    console.log("🚀 ~ signInWithCredentials ~ error:", error);
    return { status: "error", message: "error.message" };
  }
}
