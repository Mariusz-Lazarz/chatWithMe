import create from "zustand";
import { LanguageState } from "@/lib/definitions";
import { persist } from "zustand/middleware";

const useSubscriptionStore = create(
  persist<LanguageState>(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "language-settings",
      getStorage: () => localStorage,
    }
  )
);

export default useSubscriptionStore;
