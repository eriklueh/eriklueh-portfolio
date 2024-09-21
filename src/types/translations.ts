export type TranslationKeys = {
  [key: string]: string | TranslationKeys;
};

export type Translations = Record<string, TranslationKeys>;
