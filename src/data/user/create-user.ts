import bcrypt from "bcryptjs";

import db from "@/lib/db";

export default async function createUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch {
    return null;
  }
}
