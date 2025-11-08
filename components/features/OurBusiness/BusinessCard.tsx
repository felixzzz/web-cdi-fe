"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";

export interface BusinessCardProps {
  title: string;
  imageUrl: string;
  descriptionHtml: string;
  tags: string[];
  route: string; // Add route prop
}

export function BusinessCard({
  title,
  imageUrl,
  descriptionHtml,
  tags,
  route, // Destructure route
}: BusinessCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      animate={{ flexGrow: isExpanded ? 2 : 1 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 40,
      }}
      className={clsx(
        "relative cursor-pointer overflow-hidden",
        "h-64 md:h-auto"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Image
        src={imageUrl}
        alt={title}
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      <div className="overlay-card-2 absolute inset-0 z-[1] bg-black/50"></div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pb-5 text-white md:p-10 md:pb-10">
        <h3 className="font-medium text-2xl md:text-[32px] 2xl:text-[40px] 3xl:text-[52px] 3xl:leading-[60px] mb-5">
          {title}
        </h3>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: "500px" }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                delay: 0.1,
              }}
              className="overflow-hidden"
            >
              <div
                className="text-[12px] leading-[24px] font-light text-white space-y-6"
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />

              <ul className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag}>
                    {/* Update Link href to use the route */}
                    <Link
                      href={route} // Use the business's main route
                      className="flex cursor-pointer items-center gap-2 rounded-full border border-white px-[15px] py-[6px] text-sm transition-colors hover:bg-white/20"
                    >
                      {tag}
                      <ArrowRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}