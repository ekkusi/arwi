import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { cookieName, languages } from "@/i18n/settings";
import { extractLocaleFromPath } from "./utils/route";

acceptLanguage.languages([...languages]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*\\.).*)"],
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf("icon") > -1 || req.nextUrl.pathname.indexOf("chrome") > -1) return NextResponse.next();
  const { pathname } = req.nextUrl;
  const lngInPath = extractLocaleFromPath(pathname) || "fi";

  req.cookies.set(cookieName, lngInPath);

  // Redirect to /... if starts with /fi
  if (pathname.startsWith("/fi")) {
    let newPath = pathname.replace("/fi", "");
    if (newPath === "") newPath = "/";
    return NextResponse.redirect(new URL(newPath, req.url));
  }

  // Add x-url and x-pathname headers to request so that server components can access pathname through here when needed
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);
  requestHeaders.set("x-pathname", pathname);

  const response = NextResponse.next({ headers: requestHeaders });

  return response;
}
