import i18n from "i18next";
import GridlyBackend, { GridlyBackendOptions } from "i18next-gridly-backend";
import { initReactI18next } from "react-i18next";
import { GRIDLY_API_KEY, GRIDLY_VIEW_ID } from "@env";

import { Platform, NativeModules } from "react-native";

export const languages = [
  { value: "fi_FI", name: "Suomi" },
  { value: "en_US", name: "Englanti" },
  { value: "sv_FI", name: "Ruotsi" },
  { value: "es_US", name: "Espanja" },
];

const deviceLanguage =
  Platform.OS === "ios"
    ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
    : NativeModules.I18nManager.localeIdentifier;

const deviceLanguageExists = languages.findIndex((lang) => lang.value === deviceLanguage) >= 0;

const gridlyOptions: GridlyBackendOptions = {
  apiKey: GRIDLY_API_KEY,
  viewId: GRIDLY_VIEW_ID,
};

i18n
  .use(GridlyBackend)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    compatibilityJSON: "v3",
    debug: true,
    returnNull: false,
    fallbackLng: !__DEV__ && deviceLanguageExists ? deviceLanguage : "fi_FI", // In dev or if device language is not supported, use Finnish
    backend: gridlyOptions,
    saveMissing: __DEV__,
  });

export default i18n;