import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./locales/ar.json";
import en from "./locales/en.json";

import arobAr from "./locales/arob-ar.json";
import arobEn from "./locales/arob-en.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: {
                translation: ar,
                arob: arobAr,
            },
            en: {
                translation: en,
                arob: arobEn,
            },
        },

        ns: ["translation", "arob"],
        defaultNS: "translation",

        lng: "ar",
        fallbackLng: "ar",

        interpolation: {
            escapeValue: false,
        },

        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

export default i18n;