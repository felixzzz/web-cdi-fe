"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-[999] flex flex-col items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-black/40 fixed top-0 left-0 right-0 bottom-0"
        onClick={onClose}
      />
      <div className="rounded-2xl bg-blue-dark relative z-[1] w-[90%] md:w-2xl lg:w-4xl xl:w-5xl max-h-[90%] overflow-y-auto text-white">
        <div className="px-10 py-5 flex items-center justify-between border-b border-white/16 sticky top-0 bg-blue-dark">
          <p className="font-medium text-[22px]">Photo</p>
          <button onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          <Image
            src={imageUrl}
            alt="Award full view"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};