import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SHOW_PROVISIONS } from "@/lib/flags";

export function middleware(request: NextRequest) {
  if (!SHOW_PROVISIONS && request.nextUrl.pathname === "/case-studies/patagonia-provisions") {
    return NextResponse.redirect(new URL("/case-studies", request.url));
  }
}

export const config = {
  matcher: ["/case-studies/patagonia-provisions"],
};
