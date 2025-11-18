// /components/NavbarThemeTrigger.tsx
"use client";

import { NavbarTheme, useNavbarTheme } from "@/context/NavbarThemeContext";
import { useRef, useEffect } from "react";

/**
 * Komponen tak terlihat yang melacak posisinya dan memberi tahu Navbar
 * untuk berubah tema saat ia mencapai bagian atas viewport.
 */
export function NavbarThemeTrigger({ theme }: { theme: NavbarTheme }) {
  const { setTheme } = useNavbarTheme();
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = triggerRef.current;
    if (!node) return;

    // Inisialisasi IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Saat pemicu ini 'isIntersecting' (berada di garis atas layar)
        if (entry.isIntersecting) {
          // Beri tahu Context untuk mengubah tema
          setTheme(theme);
        }
      },
      {
        root: null,
        // Targetkan garis 88px dari atas (sesuaikan jika tinggi navbar Anda berbeda)
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
  }, [theme, setTheme]); // Jalankan kembali jika tema berubah

  // Render 'div' tak terlihat yang akan diamati
  return <div ref={triggerRef} />;
}