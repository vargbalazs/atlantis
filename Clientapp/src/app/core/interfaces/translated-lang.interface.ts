export interface TranslatedLang {
  lang: { locale: string; rtl: boolean; messages: Map<string, string> };
}
