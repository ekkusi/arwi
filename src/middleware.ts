import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/sessionUtils";

export const config = {
  matcher: [
    /*
     
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json|auth).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const { nextUrl, url, cookies } = req;

  // const session = null;
  const cookiesString = cookies
    .getAll()
    .map((cookie) => `${cookie.name}=${encodeURIComponent(cookie.value)};`)
    .join(" ");
  // console.log(newUrl.pathname);
  const session = await getSession(cookiesString);
  // console.log("Session in middleware:", session);
  // if (session) {
  //   console.log("Custom signout..");
  //   const response = await signOut(cookiesString);
  //   // console.log("Signout response: ", response);
  //   session = await getSession(cookiesString);
  //   console.log("Session after signout ", session);
  // }

  if (!nextUrl.pathname.startsWith("/auth/login")) {
    // If isnt /auth route and session cant be found -> redirect to login
    if (!session) return NextResponse.redirect(new URL("/auth/login", url));
  } else if (session) return NextResponse.redirect(new URL("/", url)); // If is auth route and session is found -> redirect to homepage

  // with the flag this now /_next/data/build-id/hello.json
  // without the flag this would be normalized to /hello
  return undefined;
}
