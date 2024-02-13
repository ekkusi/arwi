import { InitOptions } from "i18next";
import { GridlyBackendOptions } from "i18next-gridly-backend";

export const fallbackLng = "fi";
export const defaultNS = "translation";
export const notDefaultLanguages = ["en", "se"] as const;
export const languages = [fallbackLng, ...notDefaultLanguages] as const;
export type LanguageOption = (typeof languages)[number];
export const cookieName = "i18next";

const GRIDLY_API_KEY = process.env.NEXT_PUBLIC_GRIDLY_API_KEY;
const GRIDLY_VIEW_ID = process.env.NEXT_PUBLIC_GRIDLY_VIEW_ID;

if (!GRIDLY_API_KEY || !GRIDLY_VIEW_ID)
  throw new Error("Missing Gridly API key or view ID, define NEXT_PUBLIC_GRIDLY_API_KEY and NEXT_PUBLIC_GRIDLY_VIEW_ID in .env");

const gridlyOptions: GridlyBackendOptions = {
  apiKey: GRIDLY_API_KEY,
  viewId: GRIDLY_VIEW_ID,
};

const IS_DEV = process.env.NODE_ENV === "development";

export function getOptions(lng: LanguageOption = fallbackLng, ns: string = defaultNS): InitOptions {
  return {
    // debug: IS_DEV,
    saveMissing: IS_DEV,
    supportedLngs: languages,
    // preload: languages,
    fallbackLng,
    lng,
    ns,
    defaultNS,
    fallbackNS: defaultNS,
    keySeparator: false,
    returnNull: false,
    backend: gridlyOptions,
  };
}
