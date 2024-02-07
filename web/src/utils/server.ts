import { cookies, headers } from "next/headers";
import { LanguageOption } from "@/i18n/settings";
import { extractLocaleFromPath } from "./route";

export const SESSION_COOKIE_NAME = "sid";

export const getPathnameServer = (): string => {
  const headersList = headers();
  let pathname = headersList.get("x-pathname");
  if (!pathname) pathname = headersList.get("next-url"); // Fallback
  if (!pathname) throw new Error("No x-pathname found in headers");

  return pathname;
};

export const getLocaleServer = (): LanguageOption => {
  const pathName = getPathnameServer();

  const lng = extractLocaleFromPath(pathName) || "fi";
  return lng;
};

export const getIsAuthenticated = (): boolean => {
  const sessionID = cookies().get(SESSION_COOKIE_NAME);
  return !!sessionID;
};
