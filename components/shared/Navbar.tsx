"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import { ChevronDown, Menu, X, Globe } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "about",
    label: "About Us",
    children: [
      { label: "Who We Are", href: "/about-us" },
      { label: "Management", href: "/about-us/management" },
      { label: "Awards & Certification", href: "/about-us/awards" },
    ],
  },
  {
    id: "business",
    label: "Our Business",
    children: [
      { label: "What We Do", href: "/our-business" },
      { label: "Energy", href: "/our-business/energy" },
      { label: "Water", href: "/our-business/water" },
      { label: "Ports & Storage", href: "/our-business/ports-and-storage" },
      { label: "Logistic", href: "/our-business/logistics" },
    ],
  },
  {
    id: "investor",
    label: "Investor",
    children: [
      { label: "Report", href: "/investor/report" },
      {
        label: "Financial Information",
        href: "/investor/financial-information",
      },
      { label: "Shares Information", href: "/investor/shares-information" },
      {
        label: "Publications for Investors",
        href: "/investor/publications-for-investors",
      },
    ],
  },
  { id: "governance", label: "Governance", href: "/governance" },
  {
    id: "sustainability",
    label: "Sustainability",
    children: [
      { label: "Overview", href: "/sustainability" },
      { label: "Environment", href: "/sustainability/environment" },
      { label: "Social", href: "/sustainability/social" },
      { label: "Governance", href: "/sustainability/governance" },
    ],
  },
  { id: "media", label: "Media", href: "/media/news" },
  {
    id: "career",
    label: "Career",
    href: "https://careers.capcx.com/",
    external: true,
  },
  { id: "contact", label: "Contact Us", href: "/contact-us" },
];

const languages = [
  {
    code: "en",
    label: "English",
    flag: "https://chandradaya-investasi.com/assets/frontend/icons/flag_en.svg",
  },
  {
    code: "id",
    label: "Indonesia",
    flag: "https://chandradaya-investasi.com/assets/frontend/icons/flag_id.svg",
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarStyle, setNavbarStyle] = useState("white");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(
    null
  );
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let currentTheme = "white";

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      let topIntersectingEntry: IntersectionObserverEntry | null = null;

      for (const entry of entries) {
        if (entry.isIntersecting && entry.boundingClientRect.top <= 88) {
          if (
            !topIntersectingEntry ||
            entry.boundingClientRect.top >
              topIntersectingEntry.boundingClientRect.top
          ) {
            topIntersectingEntry = entry;
          }
        }
      }

      const topEntry = topIntersectingEntry;
      if (topEntry) {
        const theme = (topEntry.target as Element).getAttribute(
          "data-navbar-theme"
        );
        currentTheme = theme === "light" ? "light" : "dark";
      } else {
        const anyIntersectingBelow = entries.find(
          (e) => e.isIntersecting && e.boundingClientRect.top > 88
        );
        if (!anyIntersectingBelow) {
          currentTheme = "dark";
        }
      }
      setNavbarStyle(currentTheme);
    };

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px -${window.innerHeight - 89}px 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const sections = document.querySelectorAll(
      "main > section, main > div[data-navbar-theme]"
    );
    if (sections.length > 0) {
      sections.forEach((section) => observer.observe(section));
    } else {
      setNavbarStyle("white");
    }

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

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
  };

  return (
    <section ref={headerRef} className="top-0 w-full fixed z-50">
      <header
        id="nav-header"
        className={clsx(
          "w-full py-7 flex items-center left-0 right-0 transition-all duration-300",
          !isScrolled
            // ? "bg-transparent text-white"
            ? " text-white bg-gradient-to-b from-black/60 to-transparent"
            : navbarStyle === "light"
            ? "bg-white/80 backdrop-blur-lg text-neutral-900 shadow-md"
            : "backdrop-blur-3xl bg-[#091A24]/10 text-white"
        )}
      >
        <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem] flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://chandradaya-investasi.com/assets/frontend/logo_cdi_white.svg"
              alt="CDI Logo White"
              width={160}
              height={48}
              className={clsx(
                "h-10 xl:h-12",
                isScrolled && navbarStyle === "dark" ? "block" : "hidden"
              )}
              priority
            />
            <Image
              src="https://chandradaya-investasi.com/assets/frontend/logo_cdi_colored.svg"
              alt="CDI Logo Colored"
              width={160}
              height={48}
              className={clsx(
                "h-10 xl:h-12",
                isScrolled && navbarStyle === "dark" ? "hidden" : "block"
              )}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 font-normal text-base">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={() => setOpenDesktopDropdown(link.id)}
                  onMouseLeave={() => setOpenDesktopDropdown(null)}
                >
                  <button className="nav-item hover-underline-middle cursor-pointer flex items-center gap-1 text-sm xl:text-base">
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
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-max z-10 pt-2">
                      <Image
                        src="https://chandradaya-investasi.com/assets/frontend/icons/polygon.svg"
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
                            className="text-neutral-900 hover-underline-middle nav-item hover:text-[#2474a5] justify-start text-sm"
                            onClick={() => setOpenDesktopDropdown(null)}
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
                  className="nav-item hover-underline-middle text-sm xl:text-base"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  className="nav-item hover-underline-middle text-sm xl:text-base"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-4">
            <div
              className="relative cursor-pointer hidden md:flex items-center gap-1"
              onMouseEnter={() => setIsLangDropdownOpen(true)}
              onMouseLeave={() => setIsLangDropdownOpen(false)}
            >
              <Globe size={18} />
              <span>EN</span>
              <ChevronDown size={16} />
              {isLangDropdownOpen && (
                <div className="absolute top-[40px] lg:top-[60px] left-1/2 -translate-x-1/2 w-max z-10 pt-2">
                  <Image
                    src="https://chandradaya-investasi.com/assets/frontend/icons/polygon.svg"
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
                        onClick={() => {
                          setIsLangDropdownOpen(false);
                        }}
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
          "fixed lg:hidden top-0 left-0 bottom-0 right-0 z-[100] transition-opacity duration-300 ease-out",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div
          className={clsx(
            "absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white text-neutral-900 transition-transform duration-300 ease-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="py-5 h-full flex flex-col">
            <div className="flex justify-between items-center px-4 md:px-6 mb-6">
              <Image
                src="https://chandradaya-investasi.com/assets/frontend/logo_cdi_colored.svg"
                alt="CDI Logo"
                width={140}
                height={42}
                className="h-10"
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
                      className="flex items-center justify-between w-full py-2"
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
                      <div className="pl-4 pt-2 pb-1 flex flex-col gap-2 bg-blue-lighter/10 rounded">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-1 text-sm text-neutral-10 hover:text-blue-base"
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
                    className="block py-2"
                    onClick={handleMobileLinkClick}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="block py-2"
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
