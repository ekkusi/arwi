import { LanguageOption } from "@/i18n/settings";

export type LocalizedPage = {
  params: {
    lng: LanguageOption;
  };
  searchParams: Record<string, string>;
};
