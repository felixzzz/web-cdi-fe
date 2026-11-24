import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";

// export default createMiddleware(routing);

export const locales = ['id', 'en'];
export const defaultLocale = 'id';

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,

  // localePrefix: 'never'
  // localePrefix: 'as-needed' 
  localePrefix: 'always',
  localeDetection: false,
  alternateLinks: false,
});

export default function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/id${search}`, request.url), 301);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
