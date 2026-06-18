import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = ["en", "fr", "sw", "rn"];
const DEFAULT_LOCALE = "fr";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - assets (public asset folder)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!assets|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check if the path already has a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 2. Resolve preferred locale if missing
  let locale = DEFAULT_LOCALE;

  // Check cookies first (lang or NEXT_LOCALE)
  const langCookie = request.cookies.get("lang")?.value || request.cookies.get("NEXT_LOCALE")?.value;
  if (langCookie && LOCALES.includes(langCookie)) {
    locale = langCookie;
  } else {
    // Scan Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const preferred = acceptLanguage
        .split(",")
        .map((lang) => {
          const [localePart] = lang.trim().split(";");
          return localePart.split("-")[0].toLowerCase();
        })
        .find((lang) => LOCALES.includes(lang));

      if (preferred) {
        locale = preferred;
      }
    }
  }

  // 3. Perform a clean redirect to prepend the locale string
  const redirectUrl = new URL(
    `/${locale}${pathname === "/" ? "" : pathname}${request.nextUrl.search}`,
    request.url
  );
  return NextResponse.redirect(redirectUrl);
}
