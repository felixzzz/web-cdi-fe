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
      className="bg-[#091A24] sticky top-0 z-10"
      aria-label="Secondary" 
    >
      <section className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem]">
        
        <ul className="gap-10 flex items-center">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    text-base font-normal text-white py-3 border-b-2 whitespace-nowrap
                    ${isActive ? '!border-b-blue-lighter' : 'border-b-transparent'}
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