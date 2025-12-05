import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CompanyLocationResponse } from "@/types/global/footer"; 

interface NavLink {
  href: string;
  text: string;
}

interface FooterProps {
  backgroundImageUrl: string;
  logoSrc: string;
  logoAlt: string;
  contactHref: string;
  contactText: string;
  companyData: CompanyLocationResponse;
  mainNavLinks: NavLink[];
  legalNavLinks: NavLink[];
  copyrightText: string;
}

export const Footer: React.FC<FooterProps> = ({
  backgroundImageUrl,
  logoSrc,
  logoAlt,
  contactHref,
  contactText,
  companyData,
  mainNavLinks,
  legalNavLinks,
  copyrightText,
}) => {
  const { name, sub_title, localized_main } = companyData;

  return (
    <footer
      className="font-sans py-12 bg-[#091A24] text-white bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      role="contentinfo"
    >
      <section className="container mx-auto  ">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={200}
                height={80}
                className="h-20 w-auto cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <Link
              href={contactHref}
              className="bg-white text-[#2474a5] px-6 py-2 rounded-full whitespace-nowrap"
            >
              {contactText}
            </Link>
          </div>
        </div>

        <div className="flex justify-between flex-col lg:flex-row pb-12 mb-12 border-b border-b-neutral-600 gap-y-10 lg:gap-y-0">
          <address className="flex flex-col gap-6 max-w-sm not-italic">
            <div>
              <h2 className="font-medium text-[22px]">{name}</h2>
              <p className="text-base font-regular text-neutral-400">
                {sub_title}
              </p>
            </div>
            <p className="text-[15px] text-neutral-400">
              {localized_main.address}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Phone</span>
              <span>{localized_main.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Fax</span>
              <span>{localized_main.fax}</span>
            </div>
          </address>

          <nav aria-label="Main footer navigation">
            <ul className="flex flex-col gap-8">
              {mainNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-medium">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 items-center text-center lg:text-left">
          <p className="text-sm text-neutral-3 lg:col-start-1 lg:row-start-1">
            {copyrightText}
          </p>

          <div className="flex gap-4 items-center justify-center row-start-3 lg:row-start-1">
          </div>

          <nav
            aria-label="Legal navigation"
            className="flex gap-4 items-center justify-center lg:justify-end lg:col-start-3 lg:row-start-1"
          >
            <ul className="flex gap-4 items-center">
              {legalNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-nowrap text-neutral-3 whitespace-nowrap"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </footer>
  );
};