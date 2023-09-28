import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { LanguageOption, cookieName, fallbackLng, languages } from "@/i18n/settings";
import { getLocalizedPath } from "./utils/route";

acceptLanguage.languages([...languages]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf("icon") > -1 || req.nextUrl.pathname.indexOf("chrome") > -1) return NextResponse.next();
  let lng: string | null = null;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req?.cookies?.get(cookieName)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (!languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) && languages.some((it) => it === lng)) {
    const originalPath = req.nextUrl.pathname;

    const newPath = getLocalizedPath(originalPath, lng as LanguageOption);

    if (newPath && newPath !== originalPath) return NextResponse.redirect(new URL(newPath, req.url));
  }

  // Add x-url header to request so that server components can access pathname through here when needed
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const response = NextResponse.next({ headers: requestHeaders });

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer") as string); // Checked already above, type cast is safe
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  }

  return response;
}
