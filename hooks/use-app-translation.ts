import { getLocale, translate, type TranslationKey } from "@/constants/translations";
import { useUserData } from "@/store/user-data";

export function useAppTranslation() {
  const { profile } = useUserData();
  const language = profile.language;

  return {
    language,
    locale: getLocale(language),
    t: (key: TranslationKey, params?: Record<string, string | number>) =>
      translate(language, key, params),
  };
}
