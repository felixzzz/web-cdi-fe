"use client";

import { NavbarTheme, useNavbarTheme } from "@/context/NavbarThemeContext";
import { useRef, useEffect } from "react";

export function NavbarThemeTrigger({ theme }: { theme: NavbarTheme }) {
  const { setTheme } = useNavbarTheme();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTheme(theme);
        }
      },
      {
        root: null,
        rootMargin: `0px 0px -${window.innerHeight - 88}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(node);

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [theme, setTheme]); 

  return <div ref={triggerRef} />;
}