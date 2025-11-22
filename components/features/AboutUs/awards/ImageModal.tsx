"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Search, Minus, Plus } from "lucide-react";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  imageUrl,
  onClose,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isZoomMode, setIsZoomMode] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.5, 1));

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="rounded-2xl bg-[#091A24] relative z-[1001] w-[50%] md:w-2xl lg:w-4xl xl:w-5xl max-h-[90vh] flex flex-col text-white border border-white/10">
        <div className="px-10 py-5 flex items-center justify-between border-b border-white/16 bg-[#091A24] rounded-t-2xl">
          <p className="font-medium text-[22px]">Photo</p>
          <button onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        <div className="p-10 flex flex-col gap-10 overflow-y-auto items-center">
          {!isZoomMode ? (
            <div className="w-full">
              <div className="relative w-full flex justify-center bg-white rounded-xl border-2 border-blue-dark outline-2 outline-[#f8f192c4] p-1">
                <Image
                  src={imageUrl}
                  alt="Full view"
                  width={800}
                  height={1000}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <button
                onClick={() => setIsZoomMode(true)}
                className="bg-[#47C1EA] px-6 py-2 rounded-full text-white font-medium cursor-pointer flex items-center gap-2 w-fit mx-auto mt-10 hover:bg-[#3ab0d8] transition-colors"
              >
                <Search size={20} />
                Click to Zoom
              </button>
            </div>
          ) : (
            <div className="fixed inset-0 bg-white z-[1100] flex flex-col text-neutral-900">
              <div className="py-3 px-4 flex justify-between items-center h-[10vh] border-b">
                <h2 className="text-[28px] font-medium">Photo</h2>
                <button
                  onClick={() => setIsZoomMode(false)}
                  className="text-neutral-900"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-neutral-100">
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: "transform 0.2s ease-out",
                  }}
                  className="origin-center"
                >
                  <Image
                    src={imageUrl}
                    alt="Zoomed view"
                    width={1200}
                    height={1200}
                    className="object-contain max-h-[80vh] w-auto"
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="bg-white py-3 px-6 flex items-center justify-center gap-4 h-[10vh] border-t">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleZoomOut}
                    className="border border-neutral-300 rounded-lg w-11 h-11 flex items-center justify-center text-[#47C1EA] hover:bg-gray-50"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-lg font-light text-neutral-500 w-16 text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    className="border border-neutral-300 rounded-lg w-11 h-11 flex items-center justify-center text-[#47C1EA] hover:bg-gray-50"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// "use client";

// import React from 'react';
// import Image from 'next/image';
// import { X } from 'lucide-react';

// interface ImageModalProps {
//   imageUrl: string;
//   onClose: () => void;
// }

// export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
//   return (
//     <div
//       className="fixed top-0 left-0 right-0 bottom-0 z-[999] flex flex-col items-center justify-center"
//       role="dialog"
//       aria-modal="true"
//     >
//       <div
//         className="bg-black/40 fixed top-0 left-0 right-0 bottom-0"
//         onClick={onClose}
//       />
//       <div className="rounded-2xl bg-blue-dark relative z-[1] w-[90%] md:w-2xl lg:w-4xl xl:w-5xl max-h-[90%] overflow-y-auto text-white">
//         <div className="px-10 py-5 flex items-center justify-between border-b border-white/16 sticky top-0 bg-blue-dark">
//           <p className="font-medium text-[22px]">Photo</p>
//           <button onClick={onClose} aria-label="Close modal">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="p-4">
//           <Image
//             src={imageUrl}
//             alt="Award full view"
//             width={1200}
//             height={800}
//             className="w-full h-auto"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };
