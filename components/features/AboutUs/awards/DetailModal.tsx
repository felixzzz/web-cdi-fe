"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ImageIcon, X } from "lucide-react";
import { Award } from "./AwardCard";

interface DetailModalProps {
  award: Award;
  onClose: () => void;
  onImageClick: (imgUrl: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  award,
  onClose,
  onImageClick,
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="rounded-2xl bg-[#091A24] relative z-[1000] w-[50%] md:w-2xl lg:w-4xl xl:w-5xl max-h-[80vh] flex flex-col text-white shadow-2xl">
        <div className="px-10 py-5 flex items-center justify-between border-b border-white/16 bg-[#091A24] rounded-t-2xl sticky top-0 z-10">
          <p className="font-medium text-[22px]">Detail Certification</p>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        <div className="p-10 overflow-y-auto custom-scrollbar bg-[#091A24] rounded-b-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div>
              <div onClick={() => onImageClick(award.imageUrl)}>
                {/* <Image
                  src={award.imageUrl}
                  alt={award.title}
                  width={400}
                  height={500}
                  className="aspect-[9/10] object-cover rounded-xl border-2 border-[#091A24] outline-2 outline-[#f8f192c4] bg-white cursor-pointer w-full hover:opacity-95 transition-opacity"
                /> */}
                {award.imageUrl ? (
                  <Image
                    src={award.imageUrl}
                    alt={award.title}
                    width={400}
                    height={500}
                    className="aspect-[9/10] object-cover rounded-xl border-2 border-[#091A24] outline-2 outline-[#f8f192c4] bg-white cursor-pointer w-full hover:opacity-95 transition-opacity"
                  />
                ) : (
                  <div className="aspect-[9/10] w-full rounded-xl border-2 border-[#091A24] bg-neutral-800 flex flex-col items-center justify-center text-neutral-500">
                    <ImageIcon size={48} className="mb-2 opacity-50" />
                    <p className="text-sm font-medium">No Image Available</p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex gap-3">
                <div className="relative w-[92px] h-[92px] rounded-sm cursor-pointer">
                  <div className="bg-neutral-900/70 w-full h-full rounded-sm flex items-center justify-center absolute z-10 top-0 left-0">
                    <p className="text-sm text-white">Displayed</p>
                  </div>
                  {/* <Image
                    src={award.imageUrl}
                    alt="Thumbnail"
                    width={92}
                    height={92}
                    className="object-cover rounded-sm bg-white w-full h-full"
                  /> */}

                  {award.imageUrl ? (
                    <Image
                      src={award.imageUrl}
                      alt="Thumbnail"
                      width={92}
                      height={92}
                      className="object-cover rounded-sm bg-white w-full h-full"
                    />
                  ) : (
                    <div className="aspect-[9/10] w-full rounded-xl border-2 border-[#091A24] bg-neutral-800 flex flex-col items-center justify-center text-neutral-500">
                      <ImageIcon size={48} className="mb-2 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-sm text-neutral-400">{award.year}</p>

              <p className="text-2xl font-medium text-white">{award.title}</p>

              <div
                className="content primary !text-sm text-neutral-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: award.description }}
              />

              <div className="mt-2">
                <p className="text-sm font-medium mb-1 text-white">Awarder</p>
                <p className="font-light text-neutral-400 text-sm">
                  {award.awarder}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-1 text-white">
                  Categories
                </p>
                <p className="font-light text-neutral-400 text-sm">
                  {award.category || "New"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
