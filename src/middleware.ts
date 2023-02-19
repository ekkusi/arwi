// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import { authOptions } from "./pages/api/auth/[...nextauth]";

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
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log("Running next auth middleware");

    console.log("Token: ", req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("Authorized callback, token: ", token);
        return !!token;
      },
    },
  }
);
export const config = {
  matcher: ["/((?!auth|api/register).*)"],
};
