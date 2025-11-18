import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { informationService } from "@/services/Global/informationService";
import { NavbarThemeProvider } from "@/context/NavbarThemeContext";

const mainNavLinksData = [
  { href: "/about-us", text: "Who We Are" },
  { href: "/our-business", text: "Our Business" },
  { href: "/sustainability", text: "Sustainability" },
  { href: "/investor/report", text: "Investor" },
];

const legalNavLinksData = [
  { href: "/terms-and-conditions", text: "Terms & Conditions" },
  { href: "/privacy-policy", text: "Privacy Policy" },
  { href: "/cookies-notice", text: "Cookies Consent" },
  { href: "/disclaimer", text: "Disclaimer" },
];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const footerData = await informationService.getFooterData(locale);

  return (
    <NavbarThemeProvider>
    <NextIntlClientProvider>
      <Navbar />
      {children}
      <Footer
        backgroundImageUrl="https://chandradaya-investasi.com/assets/frontend/images/footer.webp"
        logoSrc="https://chandradaya-investasi.com/assets/frontend/logo_cdi_footer_new.svg"
        logoAlt="Chandra Daya Investasi Logo"
        contactHref="/contact-us"
        contactText="Contact Us"
        companyData={footerData}
        mainNavLinks={mainNavLinksData}
        legalNavLinks={legalNavLinksData}
        copyrightText="@2025 Chandra Daya Investasi"
      />
    </NextIntlClientProvider>
    </NavbarThemeProvider>
  );
}
