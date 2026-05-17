import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cacheIdCookie = request.cookies.get("_medusa_cache_id");

  if (cacheIdCookie) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.cookies.set("_medusa_cache_id", crypto.randomUUID(), {
    maxAge: 60 * 60 * 24,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
};
