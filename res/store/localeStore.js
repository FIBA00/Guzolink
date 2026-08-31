/** Style: Market Ledger — interface language is a small persisted preference available to every shared surface. */
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useLocaleStore = create(persist((set) => ({ locale: "en", setLocale: (locale) => set({ locale }) }), { name: "guzolink-interface-locale" }));
