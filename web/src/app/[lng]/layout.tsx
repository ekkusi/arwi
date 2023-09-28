import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { dir } from "i18next";
import { ChakraProvider } from "@/components/chakra";
import theme from "@/theme";

import { LocalizedPage } from "@/types/page";
import { LanguageOption, languages } from "@/i18n/settings";
import LanguageProvider from "./LanguageProvider";

const aileron = localFont({
  src: "../fonts/aileron/Aileron-Thin.otf",
  display: "swap",
  variable: "--font-aileron-thin",
});

export async function generateStaticParams(): Promise<{ lng: LanguageOption }[]> {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Arwi",
  description: "Arwi - opettajilta opettajille",
};

export default function RootLayout({ children, params: { lng } }: { children: JSX.Element } & LocalizedPage) {
  const isValidLocale = languages.some((it) => it === lng);

  if (!isValidLocale) notFound();

  return (
    <html lang={lng} dir={dir(lng)} className={aileron.variable}>
      <body>
        <ChakraProvider theme={theme}>
          <LanguageProvider lng={lng}>{children}</LanguageProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
