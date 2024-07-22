import { authMiddleware } from "@/auth";

import { type NextRequest, NextFetchEvent } from "next/server";

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  return authMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
