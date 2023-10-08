import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import { UseTranslationOptions } from "react-i18next";
import { LanguageOption, getOptions } from "./settings";
import CustomGridlyBackend from "./CustomGridlyBackend";

const initI18next = async (lng?: LanguageOption, ns?: string) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance.use(initReactI18next).use(CustomGridlyBackend).init(getOptions(lng, ns));
  return i18nInstance;
};

export async function getTranslation(lng: LanguageOption, ns?: string, options?: UseTranslationOptions<string>) {
  const i18nextInstance = await initI18next(lng);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options?.keyPrefix),
    i18n: i18nextInstance,
  };
}
