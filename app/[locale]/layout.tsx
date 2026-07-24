import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import "../globals.css";

const jakartaSans = localFont({
  src: [
    {
      path: "../fonts/PlusJakartaSans-VariableFont_wght.ttf",
      style: "normal",
    }
  ],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { informationService } from "@/services/Global/informationService";
import { NavbarThemeProvider } from "@/context/NavbarThemeContext";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/sonner";
import { getTranslations } from "next-intl/server";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { CookieConsent } from "@/components/shared/CookieConsent";
import { StickyCTA } from "@/components/shared/StickyCTA";
import Script from "next/script";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const t = await getTranslations("Layout");
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const footerData = await informationService.getFooterData(locale);

  const mainNavLinksData = [
    { href: "/about-us", text: t("who_we_are") },
    { href: "/our-business", text: t("our_business") },
    { href: "/sustainability", text: t("sustainability") },
    { href: "/investor/report", text: t("investor") },
  ];

  const legalNavLinksData = [
    { href: "/terms-and-conditions", text: t("terms") },
    { href: "/privacy-policy", text: t("privacy") },
    { href: "/cookies-notice", text: t("cookies") },
    { href: "/disclaimer", text: t("disclaimer") },
  ];

  return (
    <html lang={locale}>
      <body className={`${jakartaSans.variable} font-sans`}>
        <NavbarThemeProvider>
          <NextIntlClientProvider>
        {process.env.NEXT_PUBLIC_NODE_TARGET === "production" ? (
          <>
            <Script
              strategy="lazyOnload"
              src="https://www.googletagmanager.com/gtag/js?id=G-SQT41F1001"
            />

            <Script id="google-analytics" strategy="lazyOnload">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SQT41F1001');
          `}
            </Script>

            <Script id="google-tag-manager" strategy="lazyOnload">
              {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PHZVT576');
          `}
            </Script>
          </>
        ) : (
          <></>
        )}
        <Navbar />
        <ProgressBar />
        <CookieConsent />
        {process.env.NEXT_PUBLIC_NODE_TARGET === "production" ? (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PHZVT576"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        ) : (
          <></>
        )}

        {children}
        <StickyCTA />
        <Toaster />
        <Footer
          backgroundImageUrl="/assets/images/footer.webp"
          logoSrc="/assets/icons/logo_cdi_footer_new.svg"
          logoAlt="Chandra Daya Investasi Logo"
          contactHref="/contact-us"
          contactText={t("contact_us")}
          companyData={footerData}
          mainNavLinks={mainNavLinksData}
          legalNavLinks={legalNavLinksData}
          copyrightText="@2025 Chandra Daya Investasi"
        />
          </NextIntlClientProvider>
        </NavbarThemeProvider>
      </body>
    </html>
  );
}
