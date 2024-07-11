import { v4 as uuidv4 } from "uuid";

import db from "@/lib/db";

export default async function createPasswordResetToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const passwordResetToken = await db.passwordResetToken.upsert({
    where: {
      email,
    },
    update: {
      token,
      expires,
    },
    create: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
}
