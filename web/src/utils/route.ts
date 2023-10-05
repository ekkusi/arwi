import { LanguageOption, fallbackLng, languages } from "@/i18n/settings";
import _routes from "../routes.json";

type TranslationLangOption = keyof typeof _routes;

const routes: { [key in TranslationLangOption]: { [key: string]: string } } = _routes;

export const getPathFromRoute = (originalPath: string, locale: LanguageOption): string | undefined => {
  if (originalPath === "/") return locale === fallbackLng ? originalPath : `/${locale}`; // No need to translate root route
  if (locale === "en") return `/en${originalPath}`;
  // Get translated route for non-default locales
  const translatedPath = routes[locale][originalPath];
  if (!translatedPath) return undefined;
  return locale === "fi" ? translatedPath : `/${locale}${translatedPath}`;
  // Set `as` prop to change displayed URL in browser
  // path = locale === fallbackLng ? translatedPath : `/${locale}${translatedPath}`;
};

export const extractLocaleFromPath = (path: string): LanguageOption | undefined => {
  const locale = languages.find((l) => path.startsWith(`/${l}`));
  return locale;
};

export const formatLocalizedPath = (oldPath: string, newLocale: LanguageOption): string => {
  const oldLocale = extractLocaleFromPath(oldPath);

  const pathWithoutLocale = oldLocale ? oldPath.replace(`/${oldLocale}`, "") : oldPath;
  if (pathWithoutLocale === "" || pathWithoutLocale === "/") return newLocale === fallbackLng ? "/" : `/${newLocale}`;
  const oldLocaleWithDefault = oldLocale || fallbackLng;

  const routeName =
    oldLocaleWithDefault === "en"
      ? pathWithoutLocale
      : Object.keys(routes[oldLocaleWithDefault]).find((r) => routes[oldLocaleWithDefault][r] === pathWithoutLocale);

  const fallbackPath = `/${newLocale}${pathWithoutLocale}`;
  if (!routeName) return fallbackPath;
  return getPathFromRoute(routeName, newLocale) || fallbackPath;
};
