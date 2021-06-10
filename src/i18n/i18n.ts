import i18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import { memoizeWith } from 'ramda';

export const translations: { [key: string]: () => object } = {
  en: () => require('./locales/en.json'),
};

export const DEFAULT_LANGUAGE = 'en';
export const SUPPORTED_LANGUAGES = Object.keys(translations);

export const t = memoizeWith(
  (key, config) =>
    config
      ? i18n.currentLocale() + key + JSON.stringify(config)
      : i18n.currentLocale() + key,
  (key, config) => i18n.t(key, config),
);

export const setI18nConfig = (): void => {
  const { languageTag } = RNLocalize.findBestAvailableLanguage(
    SUPPORTED_LANGUAGES,
  ) || { languageTag: DEFAULT_LANGUAGE };

  i18n.translations = { [languageTag]: translations[languageTag]() };
  i18n.locale = languageTag;
};
