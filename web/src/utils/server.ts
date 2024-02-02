import { cookies, headers } from "next/headers";
import { LanguageOption } from "@/i18n/settings";
import { extractLocaleFromPath } from "./route";

export const SESSION_COOKIE_NAME = "sid";

export const getPathnameServer = (): string => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("x-url") || "";
  const urlParts = fullUrl.split(domain);
  return urlParts[urlParts.length - 1];
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

export const removeSessionAndRedirect = (redirectUri = "/login") => {
  cookies().delete(SESSION_COOKIE_NAME);
  const lng = getLocaleServer();
  return { redirect: "/login" };
};
