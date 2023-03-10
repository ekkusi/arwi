// TODO: Configure fonts with @next/font
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/700.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/400-italic.css";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import BottomNavigationBar from "@/components/functional/BottomNavigationBar";
import Providers from "./Providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <Providers session={session}>
          {children}
          <BottomNavigationBar />
        </Providers>
      </body>
    </html>
  );
}
