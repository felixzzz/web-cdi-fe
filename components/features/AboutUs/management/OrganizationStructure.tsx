"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ZoomIn } from "lucide-react";
import { ImageZoomModal } from "./ImageZoomModal";
import { useTranslations } from "next-intl";

interface OrganizationStructureProps {
  chartImageUrl: string;
  chartImageAlt: string;
}


export const OrganizationStructure: React.FC<OrganizationStructureProps> = ({
  chartImageUrl,
  chartImageAlt,
}) => {
  const t = useTranslations('Management')
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="organization-structure"
      className="border-b-2 border-neutral-5"
    >
      <h2 className="sr-only">{t('Organization_Structure')}</h2>
      <div
        className={`bg-neutral-50 text-neutral-13 font-medium text-2xl lg:text-[38px] lg:leading-[44px] transition hover:bg-[#2474A5] hover:text-white
          ${isOpen ? "!bg-[#2474A5] !text-white" : ""}
        `}
      >
        <section className="container mx-auto  ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between py-8 cursor-pointer w-full"
            aria-expanded={isOpen}
            aria-controls="org-structure-content"
          >
            <span className="font-medium">{t('Organization_Structure')}</span>
            <ChevronDown
              size={36}
              className={`transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </section>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="org-structure-content"
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="py-20 overflow-hidden"
          >
            <div className="container mx-auto  ">
              <h3 className="text-2xl md:text-[28px] font-medium text-[#2474A5] mb-6">
                {t('Organization_Structure')}
              </h3>
              <Image
                src={chartImageUrl} 
                alt={chartImageAlt} 
                width={1200}
                height={800}
                className="w-full h-auto"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2474A5] px-6 py-2 rounded-full text-white font-medium cursor-pointer flex items-center gap-2 w-fit mx-auto mt-10"
              >
                <ZoomIn size={16} /> Click to Zoom
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {isModalOpen && (
        <ImageZoomModal
          imageUrl={chartImageUrl} 
          imageAlt={chartImageAlt} 
          title={t('Organization_Structure')}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};