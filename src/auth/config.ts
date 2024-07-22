import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

import db from "@/lib/db";
import { LoginSchema } from "@/schemas/auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserByEmail, getUserById } from "@/data/user";

import { AUTH_ERROR_PATH, AUTH_LOGIN_PATH } from "@/routes";

import type { NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";

const providers = [
  Credentials({
    authorize: async function (credentials) {
      const validateFields = LoginSchema.safeParse(credentials);

      if (validateFields.success) {
        const { email, password } = validateFields.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) return user;
      }

      return null;
    },
  }),
].filter(Boolean) as Provider[];

const authConfig = {
  providers,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
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

      if (token.name && session.user) {
        session.user.name = token.name;
      }

      if (token.email && session.user) {
        session.user.email = token.email;
      }

      return session;
    },
  },
  pages: {
    signIn: AUTH_LOGIN_PATH,
    error: AUTH_ERROR_PATH,
  },
} satisfies NextAuthConfig;

export const authConfigWithSessionStrategy = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  jwt: { maxAge: 3600 /*1hr*/ },
  ...authConfig,
} satisfies NextAuthConfig;

export default authConfig;
