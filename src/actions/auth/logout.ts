"use server";

import { signOut } from "@/auth";

import { LogoutProps } from "@/types/definitions";

export default async function logout({ redirectTo }: LogoutProps) {
  await signOut({ redirectTo });
}
