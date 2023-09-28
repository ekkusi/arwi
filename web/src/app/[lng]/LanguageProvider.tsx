"use client";

import { useTranslation } from "@/i18n/client";
import { LanguageOption } from "@/i18n/settings";

type LanguageProviderProps = {
  lng: LanguageOption;
  children: JSX.Element;
};

export default function LanguageProvider({ lng, children }: LanguageProviderProps) {
  useTranslation(lng);
  return children;
}
