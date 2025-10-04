import { personTranslations } from "./translations/person/translations";
import { userTranslations } from "./translations/user/translations";

export type Locale = "en" | "it";

let currentLocale: Locale = "en";

export function setLocale(locale: Locale): void {
  currentLocale = locale;
}

export function getLocale(): Locale {
  return currentLocale;
}

// Person translations
export function getPersonTranslations() {
  return personTranslations[currentLocale];
}

// User translations  
export function getUserTranslations() {
  return userTranslations[currentLocale];
}
