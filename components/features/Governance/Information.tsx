import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface QuickLink {
  href: string;
  text: string;
}

interface InformationSectionProps {
  eyebrow: string;
  title: string;
  backgroundImageUrl: string;
  links: QuickLink[];
}

export const Information: React.FC<InformationSectionProps> = ({
  eyebrow,
  title,
  backgroundImageUrl,
  links,
}) => {
  return (
    // 3. Semantik: <div> root diubah menjadi <section>
    <section
      className="py-20 bg-neutral-3 bg-contain lg:bg-cover bg-no-repeat bg-bottom"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="quick-links-title"
    >
      <div className="container mx-auto px-[1rem] md:px-[2rem] lg:px-[1rem] xl:px-[3rem] 2xl:px-[6rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          <div>
            <p className="text-neutral-7 text-base mb-4">{eyebrow}</p>
            <h2
              id="quick-links-title"
              className="text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] mb-0 max-w-[414px]"
            >
              {title}
            </h2>
          </div>

          <nav aria-label="Quick links">
            <ul className="flex flex-col gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-neutral-13 border-b border-b-neutral-5 pb-8"
                  >
                    <p className="text-[22px] font-medium">{link.text}</p>
                    <ArrowRight size={24} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
        </div>
      </div>
    </section>
  );
};