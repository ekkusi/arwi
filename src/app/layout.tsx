// TODO: Configure fonts with @next/font
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";

import { Session } from "next-auth";
import { headers } from "next/headers";
import Providers from "./Providers";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
