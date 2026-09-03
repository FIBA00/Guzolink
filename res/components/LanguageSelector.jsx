/** Style: Market Ledger — language selection is a compact utility control, always visible and never a disruptive full-page state. */
import { Languages } from "lucide-react";
import { useTranslation } from "../i18n/useTranslation";

export default function LanguageSelector({ dark = false }) {
  const { locale, setLocale, t } = useTranslation();
  const isAmharic = locale === "am";
  return (
    <button
      type="button"
      className={`icon-button w-auto gap-1.5 px-2 text-[11px] font-extrabold ${dark ? "border-white/20! !bg-white/10 !text-white" : ""}`}
      onClick={() => setLocale(isAmharic ? "en" : "am")}
      aria-label={`${t("language.english")} / ${t("language.amharic")}`}
      title={`${t("language.english")} / ${t("language.amharic")}`}
    >
      <Languages size={16} />
      <span className="hidden sm:inline">{isAmharic ? "አማ" : "EN"}</span>
    </button>
  );
}
