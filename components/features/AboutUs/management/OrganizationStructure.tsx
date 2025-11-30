"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ZoomIn } from "lucide-react";
import { ImageZoomModal } from "./ImageZoomModal";

interface OrganizationStructureProps {
  chartImageUrl: string;
  chartImageAlt: string;
}

const TITLE = "Organization Structure";

export const OrganizationStructure: React.FC<OrganizationStructureProps> = ({
  chartImageUrl,
  chartImageAlt,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="organization-structure"
      className="border-b-2 border-neutral-5"
    >
      <h2 className="sr-only">{TITLE}</h2>
      <div
        className={`bg-neutral-50 text-neutral-13 font-medium text-2xl md:text-[38px] md:leading-[44px] transition hover:bg-[#2474A5] hover:text-white
          ${isOpen ? "!bg-[#2474A5] !text-white" : ""}
        `}
      >
        <section className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between py-8 cursor-pointer w-full"
            aria-expanded={isOpen}
            aria-controls="org-structure-content"
          >
            <span className="font-medium">{TITLE}</span>
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
            <div className="container mx-auto px-4 md:px-4 lg:px-20 xl:px-8 2xl:px-44">
              <h3 className="text-2xl md:text-[28px] font-medium text-[#2474A5] mb-6">
                {TITLE}
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
          title={TITLE}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};