import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ApiQuickLink } from "@/types/Homepage/home";

interface InformationSectionProps {
  eyebrow: string;
  title: string;
  backgroundImageUrl: string;
  links: ApiQuickLink[];
}

export const Information: React.FC<InformationSectionProps> = ({
  eyebrow,
  title,
  backgroundImageUrl,
  links,
}) => {
  return (
    <section
      className="py-20 bg-neutral-3 bg-contain lg:bg-cover bg-no-repeat bg-bottom"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      aria-labelledby="quick-links-title"
    >
      <div data-navbar-theme="dark" className="container mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="text-neutral-7 text-base mb-4">{eyebrow}</p>
            <h2
              id="quick-links-title"
              className="text-neutral-900 font-medium text-2xl md:text-[38px] md:leading-[44px] mb-0 max-w-[414px]"
            >
              {title}
            </h2>
          </div>

          <nav aria-label="Quick links">
            <ul className="flex flex-col gap-8">
              {links.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="flex items-center justify-between text-neutral-13 border-b border-b-neutral-5 pb-8"
                  >
                    <p className="text-[22px] font-medium">{link.name}</p>
                    <ArrowRight size={20} />
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
