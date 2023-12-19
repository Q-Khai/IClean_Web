import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import i18nResource from "../i18n";
import {uiLanguageOptions} from "./constants/languageList";
import Config from "../config";

i18next.use(initReactI18next).init({
  fallbackLng: Config.LANGUAGE.DEFAULT,
  supportedLngs: uiLanguageOptions.map((item) => item.value),
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources: i18nResource,
});
