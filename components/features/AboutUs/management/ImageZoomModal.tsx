"use client";

import React, { useState, useRef, MouseEvent, WheelEvent } from "react";
import Image from "next/image";
import { X, Plus, Minus } from "lucide-react";

interface ImageZoomModalProps {
  imageUrl: string;
  imageAlt: string;
  title: string;
  onClose: () => void;
}

export const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  imageUrl,
  imageAlt,
  title,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const startPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    startPos.current = {
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prevZoom) => Math.min(3, Math.max(1, prevZoom + delta)));
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(3, prevZoom + 0.1));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(1, prevZoom - 0.1));
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-neutral-13"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="w-full bg-white py-3 px-4 flex justify-between items-center h-[10vh]">
        <h2 id="modal-title" className="text-[20px] md:text-[28px] font-medium truncate pr-4">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-neutral-13 cursor-pointer flex-shrink-0"
          aria-label="Close modal"
        >
          <X size={30} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-white cursor-grab p-4"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <Image
          src={imageUrl}
          alt={imageAlt}
          title={imageAlt}
          width={1000}
          height={1000}
          className="select-none max-w-full max-h-full object-contain pointer-events-none"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom})`,
            transition: dragging ? "none" : "transform 0.2s",
          }}
          draggable={false}
        />
      </div>

      {/* Footer Controls */}
      <div className="bg-white py-3 px-6 flex items-center gap-4 h-[10vh] w-full">
        <div className="flex items-center gap-4 mx-auto">
          <button
            onClick={handleZoomOut}
            className="border border-neutral-5 rounded-lg w-11 h-11 flex items-center justify-center text-blue-base cursor-pointer hover:bg-neutral-50"
          >
            <Minus size={24} />
          </button>
          <span className="text-lg font-light text-neutral-10 w-16 text-center select-none">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="border border-neutral-5 rounded-lg w-11 h-11 flex items-center justify-center text-blue-base cursor-pointer hover:bg-neutral-50"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};