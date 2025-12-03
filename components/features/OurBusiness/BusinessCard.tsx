"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface BusinessCardProps {
  title: string;
  imageUrl: string;
  descriptionHtml: string;
  tags: string[];
  route: string;
}

export function BusinessCard({
  title,
  imageUrl,
  descriptionHtml,
  tags,
  route,
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
        "relative cursor-pointer overflow-hidden group",
        "aspect-[9/16]", 
        "md:aspect-auto md:h-full"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Link href={route}>
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="z-0"
          priority
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pb-5 text-white md:p-10 md:pb-10">
          <h3 className="font-medium text-xl lg:text-[28px] 2xl:text-[44px] 3xl:text-[58px] leading-normal 3xl:leading-[60px]">
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
                  className="text-xs md:text-base text-white leading-relaxed md:leading-loose text-justify font-light space-y-6 drop-shadow-md line-clamp-3 lg:line-clamp-none"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                />

                <ul className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <li key={tag}>
                      <Button className="flex cursor-pointer items-center gap-2 rounded-full border border-white p-2 md:px-[15px] md:py-[6px] text-[10px] md:text-sm transition-colors hover:bg-white/20 bg-transparent text-wrap">
                        {tag}
                        <ArrowRight size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.article>
  );
}
