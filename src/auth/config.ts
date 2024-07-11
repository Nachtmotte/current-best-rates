// eslint-disable-next-line no-unused-vars
import { JWT } from "next-auth/jwt";
import { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";

import db from "@/lib/db";
import { getUserByEmail, getUserById } from "@/data/user";
import { AUTH_SIGN_IN_PATH } from "@/auth/constants";

type USER_ROLE = "ADMIN" | "USER";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      role: USER_ROLE;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    role?: USER_ROLE;
  }
}

const providers = [
  Credentials({
    authorize: async (credentials) => {
      const { email, password } = credentials;

      if (
        !email ||
        !password ||
        typeof email !== "string" ||
        typeof password !== "string"
      ) {
        return null;
      }

      const user = await getUserByEmail(email as string);

      if (!user || !user.password) {
        return null;
      }

      const passwordsMatch = await bcrypt.compare(password, user.password);

      if (!passwordsMatch) {
        return null;
      }

      return user;
    },
  }),
].filter(Boolean) as Provider[];

const authConfig = {
  providers,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub as string);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: AUTH_SIGN_IN_PATH,
  },
} satisfies NextAuthConfig;

export const authConfigWithSessionStrategy = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
} satisfies NextAuthConfig;

export default authConfig;
