import { headers } from "next/headers";
import { LanguageOption } from "@/i18n/settings";
import { extractLocaleFromPath } from "./route";

export const getLocaleServer = (): LanguageOption | undefined => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("x-url") || "";
  const urlParts = fullUrl.split(domain);
  const pathName = urlParts[urlParts.length - 1];

  const lng = extractLocaleFromPath(pathName);
  return lng;
};
