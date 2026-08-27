/** Style: Market Ledger — concise translation helper with English fallback protects mixed API content from missing labels. */
import { translations } from "./translations";
import { useLocaleStore } from "../store/localeStore";
export function translate(locale, key) { return translations[locale]?.[key] || translations.en[key] || key; }
export function useTranslation() { const locale = useLocaleStore((state) => state.locale); const setLocale = useLocaleStore((state) => state.setLocale); const t = (key) => translate(locale, key); return { locale, setLocale, t }; }
