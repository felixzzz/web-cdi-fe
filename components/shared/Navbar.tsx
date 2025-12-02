"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useNavbarTheme } from "@/context/NavbarThemeContext";
import { usePathname, useRouter } from "@/i18n/routing";

const languages = [
  {
    code: "en",
    label: "English",
    flag: "/assets/icons/flag_en.svg",
  },
  {
    code: "id",
    label: "Indonesia",
    flag: "/assets/icons/flag_id.svg",
  },
];

const handleLinkClick = () => {
  window.dispatchEvent(new Event("startProgressBar"));
};

export function Navbar() {
  const t = useTranslations("Navbar");

  const navLinks = [
    { id: "home", label: t("home"), href: "/" },
    {
      id: "about",
      label: t("about_us"),
      children: [
        { label: t("who_we_are"), href: "/about-us" },
        { label: t("management"), href: "/about-us/management" },
        { label: t("awards_certification"), href: "/about-us/awards" },
      ],
    },
    {
      id: "business",
      label: t("our_business"),
      children: [
        { label: t("what_we_do"), href: "/our-business" },
        { label: t("energy"), href: "/our-business/energy" },
        { label: t("water"), href: "/our-business/water" },
        { label: t("ports_storage"), href: "/our-business/ports-and-storage" },
        { label: t("logistics"), href: "/our-business/logistics" },
      ],
    },
    {
      id: "investor",
      label: t("investor"),
      children: [
        { label: t("report"), href: "/investor/report" },
        {
          label: t("financial_information"),
          href: "/investor/financial-information",
        },
        {
          label: t("shares_information"),
          href: "/investor/shares-information",
        },
        {
          label: t("publications_for_investors"),
          href: "/investor/publications-for-investors",
        },
      ],
    },
    { id: "governance", label: t("governance"), href: "/governance" },
    {
      id: "sustainability",
      label: t("sustainability"),
      children: [
        { label: t("overview"), href: "/sustainability" },
        { label: t("environment"), href: "/sustainability/environment" },
        { label: t("social"), href: "/sustainability/social" },
        { label: t("governance_child"), href: "/sustainability/governance" },
      ],
    },
    { id: "media", label: t("media"), href: "/media/news" },
    {
      id: "career",
      label: t("career"),
      href: "https://careers.capcx.com/",
      external: true,
    },
    { id: "contact", label: t("contact_us"), href: "/contact-us" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(
    null
  );
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const headerRef = useRef<HTMLElement>(null);
  const desktopDropdownTimer = useRef<NodeJS.Timeout | null>(null);
  const langDropdownTimer = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const isAboutPage = pathname === "/about-us";
  const isManagementPage = pathname === "/about-us/management";
  const isGovernance = pathname === "/governance";
  const isSpecialTransparentPage =
    isAboutPage || isManagementPage || isGovernance;

  const { theme } = useNavbarTheme();
  const locale = useLocale();
  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  const router = useRouter();

  const onSelectLocale = (newLocale: string) => {
    handleLinkClick();
    router.replace(pathname, { locale: newLocale });
    setIsLangDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (id: string) => {
    setOpenMobileDropdown((prev) => (prev === id ? null : id));
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
    handleLinkClick();
  };

  const hoverColor = isSpecialTransparentPage
    ? "#47C1EA"
    : theme === "light"
    ? "#2474a5"
    : "#47C1EA";

  return (
    <section
      ref={headerRef}
      className={clsx(
        "top-0 w-full z-50 bg-transparent",
        isSpecialTransparentPage ? "absolute" : "fixed"
      )}
    >
      <header
        id="nav-header"
        className={clsx(
          "w-full py-7 flex items-center left-0 right-0 transition-all duration-300",

          isSpecialTransparentPage
            ? "text-white bg-gradient-to-b from-black/60 to-transparent"
            : theme === "light"
            ? "bg-white text-neutral-900 shadow-md"
            : !isScrolled
            ? "text-white bg-gradient-to-b from-black/60 to-transparent"
            : "backdrop-blur-3xl bg-[#091A24]/10 text-white"
        )}
      >
        <div className="container mx-auto   flex gap-3 justify-between items-center">
          <Link href="/" className="flex-shrink-0" onClick={handleLinkClick}>
            <Image
              src="/assets/icons/logo_cdi_white.svg"
              alt="CDI Logo White"
              width={160}
              height={48}
              className={clsx(
                "h-10 xl:h-12 w-auto",
                theme === "light" ? "hidden" : "block"
              )}
              priority
            />
            <Image
              src="/assets/icons/logo_cdi_colored.svg"
              alt="CDI Logo Colored"
              width={160}
              height={48}
              className={clsx(
                "h-10 xl:h-12 w-auto",
                theme === "light" ? "block" : "hidden"
              )}
              priority
            />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-2 md:gap-4 font-normal text-base whitespace-nowrap"
            style={{ "--nav-hover-color": hoverColor } as React.CSSProperties}
          >
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => {
                    if (desktopDropdownTimer.current) {
                      clearTimeout(desktopDropdownTimer.current);
                    }
                    setOpenDesktopDropdown(link.id);
                  }}
                  onMouseLeave={() => {
                    desktopDropdownTimer.current = setTimeout(() => {
                      setOpenDesktopDropdown(null);
                    }, 200);
                  }}
                >
                  <button className="nav-item hover-underline-middle cursor-pointer flex items-center gap-1 text-sm md:text-xs xl:text-base whitespace-nowrap">
                    <span>{link.label}</span>
                    <ChevronDown
                      size={16}
                      className={clsx(
                        "transition-transform",
                        openDesktopDropdown === link.id && "rotate-180"
                      )}
                    />
                  </button>
                  {openDesktopDropdown === link.id && (
                    <div
                      className="absolute top-16 left-1/2 -translate-x-1/2 w-max z-10 pt-2"
                      onMouseEnter={() => {
                        if (desktopDropdownTimer.current) {
                          clearTimeout(desktopDropdownTimer.current);
                        }
                      }}
                      onMouseLeave={() => {
                        desktopDropdownTimer.current = setTimeout(() => {
                          setOpenDesktopDropdown(null);
                        }, 200);
                      }}
                      style={
                        {
                          "--nav-hover-color": "#2474a5",
                        } as React.CSSProperties
                      }
                    >
                      <Image
                        src="/assets/icons/polygon.svg"
                        alt="Dropdown arrow"
                        width={16}
                        height={16}
                        className="mx-auto -mb-[6px] w-4 h-auto block"
                      />
                      <div className="p-4 rounded-xl bg-white flex flex-col gap-4 whitespace-nowrap shadow-lg border border-neutral-200">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-neutral-900 hover-underline-middle nav-item justify-start text-sm"
                            onClick={() => {
                              setOpenDesktopDropdown(null);
                              handleLinkClick();
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : link.external ? (
                <Link
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-item hover-underline-middle text-sm md:text-xs xl:text-base whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="nav-item hover-underline-middle text-sm md:text-xs xl:text-base whitespace-nowrap"
                  onClick={handleLinkClick}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div
              className="relative cursor-pointer hidden lg:flex items-center gap-1"
              onMouseEnter={() => {
                if (langDropdownTimer.current) {
                  clearTimeout(langDropdownTimer.current);
                }
                setIsLangDropdownOpen(true);
              }}
              onMouseLeave={() => {
                langDropdownTimer.current = setTimeout(() => {
                  setIsLangDropdownOpen(false);
                }, 200);
              }}
            >
              <Image
                src={currentLanguage.flag}
                alt={currentLanguage.label}
                width={18}
                height={18}
                className="rounded-full border border-neutral-13"
              />
              <span className="uppercase">{currentLanguage.code}</span>
              <ChevronDown size={16} />
              {isLangDropdownOpen && (
                <div
                  className="absolute top-16 left-1/2 -translate-x-1/2 w-max z-10 pt-2"
                  onMouseEnter={() => {
                    if (langDropdownTimer.current) {
                      clearTimeout(langDropdownTimer.current);
                    }
                  }}
                  onMouseLeave={() => {
                    langDropdownTimer.current = setTimeout(() => {
                      setIsLangDropdownOpen(false);
                    }, 200);
                  }}
                >
                  <Image
                    src="/assets/icons/polygon.svg"
                    alt="Dropdown arrow"
                    width={16}
                    height={16}
                    className="mx-auto -mb-[6px] w-4 h-auto block"
                  />
                  <div className="p-4 rounded-xl bg-white flex flex-col gap-4 whitespace-nowrap shadow-lg border border-neutral-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="text-neutral-900 flex items-center gap-2 cursor-pointer text-sm hover:text-blue-base"
                        onClick={() => onSelectLocale(lang.code)}
                      >
                        <Image
                          src={lang.flag}
                          alt={`${lang.label} flag`}
                          width={18}
                          height={18}
                          className="rounded-full border border-neutral-13"
                        />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="relative lg:hidden">
              <button
                className="flex items-center gap-1"
                onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                aria-label="Change language"
              >
                <Image
                  src={currentLanguage.flag}
                  alt={currentLanguage.label}
                  width={18}
                  height={18}
                  className="rounded-full border border-neutral-13"
                />
                <span className="uppercase">{currentLanguage.code}</span>
                <ChevronDown
                  size={16}
                  className={clsx(
                    "transition-transform",
                    isLangDropdownOpen && "rotate-180"
                  )}
                />
              </button>
              {isLangDropdownOpen && (
                <div className="absolute top-8 right-0 w-max z-10 pt-2">
                  <Image
                    src="/assets/icons/polygon.svg"
                    alt="Dropdown arrow"
                    width={16}
                    height={16}
                    className="ml-auto mr-2 -mb-[6px] w-4 h-auto block"
                  />
                  <div className="p-4 rounded-xl bg-white flex flex-col gap-4 whitespace-nowrap shadow-lg border border-neutral-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="text-neutral-900 flex items-center gap-2 cursor-pointer text-sm hover:text-blue-base"
                        onClick={() => onSelectLocale(lang.code)}
                      >
                        <Image
                          src={lang.flag}
                          alt={`${lang.label} flag`}
                          width={18}
                          height={18}
                          className="rounded-full border border-neutral-13"
                        />
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              className="lg:hidden text-2xl"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed lg:hidden top-0 left-0 bottom-0 right-0 z-[100]",
          isMobileMenuOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={clsx(
            "absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white text-neutral-900",
            "transition-all duration-500 ease-in-out",
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          )}
        >
          <div className="py-5 h-full flex flex-col">
            <div className="flex justify-between items-center px-4 md:px-6 mb-6">
              <Image
              src="/assets/icons/logo_cdi_colored.svg"
                alt="CDI Logo"
                width={140}
                height={42}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl"
                aria-label="Close mobile menu"
              >
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-4 font-normal text-base w-full items-start flex-1 overflow-y-auto px-4 md:px-6">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.id} className="w-full">
                    <button
                      className="flex items-center justify-between w-full py-2 whitespace-nowrap"
                      onClick={() => toggleMobileDropdown(link.id)}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={16}
                        className={clsx(
                          "transition-transform",
                          openMobileDropdown === link.id && "rotate-180"
                        )}
                      />
                    </button>
                    {openMobileDropdown === link.id && (
                      <div className="pl-4 pt-2 pb-1 flex flex-col gap-2 bg-[#47c1ea]/50 rounded">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1 text-sm text-neutral-10 hover:text-blue-base whitespace-nowrap"
                            onClick={handleMobileLinkClick}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : link.external ? (
                  <Link
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 whitespace-nowrap"
                    onClick={handleMobileLinkClick}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="block py-2 whitespace-nowrap"
                    onClick={handleMobileLinkClick}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
