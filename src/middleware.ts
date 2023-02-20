// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "./pages/api/auth/[...nextauth]";

import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./utils/sessionUtils";

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|icons|manifest.json).*)",
//   ],
// };

// export default async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // GET /_next/data/build-id/hello.json

//   const session = await getServerSession(authOptions);
//   console.log("Path:", pathname);
//   console.log("Session in middleware:", pathname);
//   if (pathname !== "/login") {
//     if (!session) return NextResponse.redirect("/login");
//   } else if (session) return NextResponse.redirect("/");

//   // with the flag this now /_next/data/build-id/hello.json
//   // without the flag this would be normalized to /hello
//   return undefined;
// }

/* eslint-disable */
// import { withAuth } from "next-auth/middleware";

// console.log(
//   "Configuring middleware, NEXTAUTH_SECRET: ",
//   process.env.NEXTAUTH_SECRET
// );

// // #### NOT WORKING #####
// // TODO: Try configure auth middleware manually by checking getServerSession or something like that

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         console.log("Authorized callback, token: ", token);
//         return !!token;
//       },
//     },
//     secret: process.env.NEXTAUTH_SECRET,
//   }
// );

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
  let session = await getSession(cookiesString);
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
// export const config = {
//   matcher: ["/((?!auth|api/register).*)"],
// };

console.log("Middleware running");
