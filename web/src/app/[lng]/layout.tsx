import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { dir } from "i18next";
import theme from "@/theme";

import { LocalizedPage } from "@/types/page";
import { LanguageOption, languages } from "@/i18n/settings";
import Providers from "@/app/[lng]/Providers";

const aileron = localFont({
  src: [
    {
      path: "../fonts/aileron/Aileron-Thin.otf",
      style: "normal",
      weight: "200",
    },
    {
      path: "../fonts/aileron/Aileron-Light.otf",
      style: "normal",
      weight: "300",
    },
    {
      path: "../fonts/aileron/Aileron-LightItalic.otf",
      style: "italic",
      weight: "300",
    },
    {
      path: "../fonts/aileron/Aileron-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../fonts/aileron/Aileron-Italic.otf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../fonts/aileron/Aileron-SemiBold.otf",
      style: "normal",
      weight: "600",
    },
    {
      path: "../fonts/aileron/Aileron-SemiBoldItalic.otf",
      style: "italic",
      weight: "600",
    },
    {
      path: "../fonts/aileron/Aileron-Bold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../fonts/aileron/Aileron-BoldItalic.otf",
      style: "italic",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-aileron",
});

export async function generateStaticParams(): Promise<{ lng: LanguageOption }[]> {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Arwi",
  description: "Arwi - opettajan paras ystävä",
};

export default function RootLayout({ children, params: { lng } }: { children: JSX.Element } & LocalizedPage) {
  const isValidLocale = languages.some((it) => it === lng);

  if (!isValidLocale) notFound();

  return (
    <html lang={lng} dir={dir(lng)} className={aileron.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#65AF53" />
        <meta name="msapplication-TileColor" content="#65af53" />
        <meta name="theme-color" content="#65af53" />
      </head>
      <body suppressHydrationWarning>
        <Providers lng={lng} theme={theme}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
