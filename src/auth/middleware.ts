import NextAuth from "next-auth";
import { type NextRequest, NextFetchEvent } from "next/server";

import { authConfigWithSessionStrategy } from "./config";
const { auth } = NextAuth(authConfigWithSessionStrategy);

import {
  AUTH_ROUTES,
  AUTH_PUBLIC_ROUTES,
  AUTH_SIGN_IN_PATH,
  DEFAULT_SIGN_IN_REDIRECT,
  AUTH_API_PREFIX,
} from "./constants";

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
      return Response.redirect(
        new URL(DEFAULT_SIGN_IN_REDIRECT, req.nextUrl.origin)
      );
    }

    if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
      return Response.redirect(new URL(AUTH_SIGN_IN_PATH, req.nextUrl.origin));
    }

    return;
  })(request, event as any);
}
