import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import { locales } from "@/lib/locales";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [...locales],

  // Used when no locale matches
  defaultLocale: "id",
  localePrefix: "always"
});

  export type Locale = (typeof routing.locales)[number];