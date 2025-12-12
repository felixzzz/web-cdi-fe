import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

export const locales = ['en', 'id'];
export const defaultLocale = 'id';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,

  // localePrefix: 'never'
  // localePrefix: 'as-needed' 
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
