import { type NextRequest, NextFetchEvent } from "next/server";

import { authMiddleware } from "@/auth";

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  return authMiddleware(request, event);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
