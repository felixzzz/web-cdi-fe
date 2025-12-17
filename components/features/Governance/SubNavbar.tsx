"use client";

import React, { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";

export interface SubNavLink {
  text: string;
  targetId: string;
}

interface SubNavProps {
  links: SubNavLink[];
}

export const SubNavbar: React.FC<SubNavProps> = ({ links }) => {
  // 1. Set default active state to the first link immediately
  const [activeId, setActiveId] = useState<string>(links[0]?.targetId || "");

  useEffect(() => {
    // --- PART A: Intersection Observer (Normal Scrolling) ---
    const observerOptions = {
      root: null,
      // Top: -100px (Offset for Navbar height)
      // Bottom: -60% (Only triggers when section is in the top 40% of screen)
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    links.forEach((link) => {
      const element = document.getElementById(link.targetId);
      if (element) observer.observe(element);
    });

    // --- PART B: Top of Page Detector (Hero Section Logic) ---
    const handleScroll = () => {
      // If the user is near the top of the page (e.g., inside the Hero),
      // force the first link to be active.
      if (window.scrollY < 100 && links.length > 0) {
        setActiveId(links[0].targetId);
      }
    };

    // Add scroll listener for the "Top" check
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-[#091A24] sticky top-0 z-20" aria-label="Secondary">
      <section className="container mx-auto  ">
        <ul className="gap-10 flex items-center overflow-x-auto overflow-y-hidden custom-scrollbar">
          {links.map((link) => {
            const isActive = activeId === link.targetId;

            return (
              <li key={link.text}>
                <Link
                  title={link.text}
                  href={`#${link.targetId}`}
                  onClick={(e) => handleScrollTo(e, link.targetId)}
                  className={`
                    inline-block
                    text-base font-normal text-white py-3 whitespace-nowrap
                    border-b-2 transition-colors duration-300
                    ${
                      isActive
                        ? "border-[#47C1EA]"
                        : "border-transparent hover:text-gray-300"
                    } 
                  `}
                  aria-current={isActive ? "page" : undefined}
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
