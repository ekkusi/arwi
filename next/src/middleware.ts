import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|.well-known|sw|workbox|fallback).*)"],
};

const ALLOWED_PATHS = ["/register"];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const {
      nextUrl,
      url,
      nextauth: { token },
    } = req;

    if (!ALLOWED_PATHS.some((it) => nextUrl.pathname === it)) {
      // If isn't allowed route and session cant be found -> redirect to login
      if (!token) return NextResponse.redirect(new URL("/login", url));
    } else if (token) return NextResponse.redirect(new URL(`/`, url)); // If is auth route and session is found -> redirect to homepage
    return undefined;
  },
  {
    callbacks: {
      authorized: () => true, // Always return true to pass the handling to middleware function above
    },
    secret: process.env.SECRET,
  }
);
