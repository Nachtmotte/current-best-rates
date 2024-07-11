"use server";

import bcrypt from "bcryptjs";

import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export default async function resetPassword(
  token: string,
  prevState: any,
  formData: FormData,
) {
  const { password } = Object.fromEntries(formData) as {
    password?: string | null;
  };

  if (!token || !password) {
    return {
      status: "error",
      message: "invalid",
    };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      status: "error",
      message: "Invalid token",
    };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { status: "error", message: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { status: "error", message: "Email does not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { status: "success", message: "Password reset" };
}
