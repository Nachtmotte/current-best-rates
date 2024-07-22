import NextAuth from "next-auth";

import { authConfigWithSessionStrategy } from "./config";

import { type NextRequest, NextFetchEvent } from "next/server";

const { auth } = NextAuth(authConfigWithSessionStrategy);

import {
  AUTH_ROUTES,
  AUTH_PUBLIC_ROUTES,
  AUTH_LOGIN_PATH,
  DEFAULT_SIGN_IN_REDIRECT,
  AUTH_API_PREFIX,
} from "@/routes";

export default function authMiddleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  return auth((req) => {
    const { nextUrl } = req;
    const { pathname } = nextUrl;

    const isAuthenticated = Boolean(req.auth);
    const isApiAuthRoute = pathname.startsWith(AUTH_API_PREFIX);
    const isPublicRoute = AUTH_PUBLIC_ROUTES.includes(pathname);
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (isApiAuthRoute) {
      return;
    }

    if (isAuthenticated && isAuthRoute) {
      return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl));
    }

    if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
      return Response.redirect(new URL(AUTH_LOGIN_PATH, nextUrl));
    }

    return;
  })(request, event as any);
}
