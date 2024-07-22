// eslint-disable-next-line no-unused-vars
import { JWT } from "next-auth/jwt";
// eslint-disable-next-line no-unused-vars
import NextAuth, { type DefaultSession } from "next-auth";

import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
};

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    role?: UserRole;
  }
}