"use server";

import { getUserByEmail } from "@/data/user";
import { createPasswordResetToken } from "@/data/password-reset-token";
import { sendPasswordResetEmail } from "@/auth/mail";

export default async function forgotPassword(
  prevState: any,
  formData: FormData,
) {
  const { email } = Object.fromEntries(formData) as {
    email?: string | null;
  };

  if (!email) {
    return {
      status: "error",
      message: "invalid",
    };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { status: "success", message: "Reset email sent" };
  }

  const passwordResetToken = await createPasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { status: "success", message: "Reset email sent" };
}
