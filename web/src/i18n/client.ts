"use client";

import i18next from "i18next";
import { useEffect, useState } from "react";
import { UseTranslationOptions, initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import { useCookies } from "react-cookie";
// import LocizeBackend from 'i18next-locize-backend'
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName, LanguageOption } from "./settings";
import CustomGridlyBackend from "./CustomGridlyBackend";

const runsOnServerSide = typeof window === "undefined";

// on client side the normal singleton is ok
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(CustomGridlyBackend)
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(lng?: LanguageOption, ns?: string, options?: UseTranslationOptions<string>) {
  const [cookies, setCookie] = useCookies([cookieName]);
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!lng || cookies.i18next === lng) return;
      setCookie(cookieName, lng, { path: "/" });
    }, [lng, cookies.i18next, setCookie]);
  }
  return ret;
}
