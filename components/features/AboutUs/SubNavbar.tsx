"use client"; 

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavLink {
  text: string;
  href: string;
}

interface SubNavProps {
  links: SubNavLink[];
}

export const SubNavbar: React.FC<SubNavProps> = ({ links }) => {
  const pathname = usePathname();

  return (
    <nav 
      className="bg-[#091A24] sticky top-0 z-10 py-4" 
      aria-label="Secondary"
    >
      <section className="container mx-auto px-4 md:px-8 lg:px-20 2xl:px-44">
        <ul className="gap-10 flex items-center overflow-x-auto overflow-y-hidden">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    text-base font-normal text-white py-3 border-b-2 whitespace-nowrap
                    ${isActive ? '!border-b-[#47C1EA]' : 'border-b-transparent'}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </nav>
  );
};