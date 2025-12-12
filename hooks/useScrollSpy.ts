"use client"

// src/hooks/useScrollSpy.ts (Contoh penamaan file)
import { useState, useEffect } from 'react';

// Ambil semua ID bagian (section IDs) dari page.tsx
const sectionIds = [
  "company-overview", 
  "vision-mision", 
  "history", // Berdasarkan prop id di History.tsx (asumsi ada)
  "milestone", // Berdasarkan prop id di Milestone.tsx (asumsi ada)
  "company-profile" // Berdasarkan prop id di CompanyProfile.tsx
];

export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]); // Default ke yang pertama

  useEffect(() => {
    // Memetakan sectionIds ke elemen DOM
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Jika elemen terlihat, set ID-nya sebagai bagian yang aktif
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '0px 0px -70% 0px', // Aktifkan ketika bagian mencapai 30% dari bagian atas viewport
        threshold: 0,
      }
    );

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return activeSection;
};