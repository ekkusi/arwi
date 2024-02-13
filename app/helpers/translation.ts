import { CollectionTypeCategory } from "arwi-backend/src/types";
import { TFunction } from "i18next";

type EnvironmentTranslationKey =
  | "environment"
  | "by-environments"
  | "environments"
  | "of-environments"
  | "of-environment"
  | "for-environments"
  | "on-environment";

type Translation = {
  key: string;
  defaultTranslation: string;
};

const TRANSLATION_KEYS: Record<string, Record<EnvironmentTranslationKey, Translation>> = {
  sports: {
    environment: {
      key: "environment",
      defaultTranslation: "Ympäristö",
    },
    "by-environments": {
      key: "by-environments",
      defaultTranslation: "Ympäristöittäin",
    },
    environments: {
      key: "environments",
      defaultTranslation: "Ympäristöt",
    },
    "of-environments": {
      key: "of-environments",
      defaultTranslation: "Ympäristöjen",
    },
    "of-environment": {
      key: "of-environment",
      defaultTranslation: "Ympäristön",
    },
    "for-environments": {
      key: "for-environments",
      defaultTranslation: "Ympäristöille",
    },
    "on-environment": {
      key: "on-environment",
      defaultTranslation: "Ympäristöllä",
    },
  },
  default: {
    environment: {
      key: "content",
      defaultTranslation: "Sisältö",
    },
    "by-environments": {
      key: "by-contents",
      defaultTranslation: "Sisällöittäin",
    },
    environments: {
      key: "contents",
      defaultTranslation: "Sisällöt",
    },
    "of-environments": {
      key: "of-contents",
      defaultTranslation: "Ympäristöjen",
    },
    "of-environment": {
      key: "of-content",
      defaultTranslation: "Ympäristön",
    },
    "for-environments": {
      key: "for-contents",
      defaultTranslation: "Sisällöille",
    },
    "on-environment": {
      key: "on-content",
      defaultTranslation: "Sisällöllä",
    },
  },
};

export const getEnvironmentTranslation = (t: TFunction, key: EnvironmentTranslationKey, subjectCode: string): string => {
  switch (subjectCode) {
    case "LI":
      return t(TRANSLATION_KEYS.sports[key].key, TRANSLATION_KEYS.sports[key].defaultTranslation);
    default:
      return t(TRANSLATION_KEYS.default[key].key, TRANSLATION_KEYS.default[key].defaultTranslation);
  }
};

const COLLECTION_TYPE_TRANSLATIONS: Record<CollectionTypeCategory, Translation> = {
  CLASS_PARTICIPATION: {
    key: "class-participation",
    defaultTranslation: "Tuntityöskentely",
  },
  EXAM: {
    key: "exam",
    defaultTranslation: "Koe",
  },
  GROUP_WORK: {
    key: "group-work",
    defaultTranslation: "Ryhmätyö",
  },
  WRITTEN_WORK: {
    key: "written-work",
    defaultTranslation: "Kirjallinen työ",
  },
  OTHER: {
    key: "other",
    defaultTranslation: "Muu",
  },
};

export const getCollectionTypeTranslation = (t: TFunction, type: CollectionTypeCategory): string => {
  return t(COLLECTION_TYPE_TRANSLATIONS[type].key, COLLECTION_TYPE_TRANSLATIONS[type].defaultTranslation);
};
