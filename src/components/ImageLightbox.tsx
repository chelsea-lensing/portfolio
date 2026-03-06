"use client";

import { useEffect, useRef, useState } from "react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;

export default function ImageLightbox({ src, alt, onClose }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetAtDragStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Reset pan when scale returns to 1
  useEffect(() => {
    if (scale === 1) setOffset({ x: 0, y: 0 });
  }, [scale]);

  const clampOffset = (x: number, y: number, s: number) => {
    // Allow panning only within the scaled image bounds
    const maxX = (s - 1) * 50; // percent-based approximation
    const maxY = (s - 1) * 50;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev - e.deltaY * 0.002));
      return next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale === 1) return;
    e.preventDefault();
    dragging.current = true;
    hasDragged.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetAtDragStart.current = { ...offset };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged.current = true;
    setOffset(clampOffset(
      offsetAtDragStart.current.x + dx,
      offsetAtDragStart.current.y + dy,
      scale
    ));
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  const handleBackdropClick = () => {
    if (!hasDragged.current) onClose();
  };

  const cursor = scale > 1 ? (dragging.current ? "grabbing" : "grab") : "zoom-in";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {/* Zoom out */}
        <button
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(MIN_SCALE, s - 0.5)); }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Zoom out"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
            <path d="M5 7H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {/* Zoom in */}
        <button
          onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(MAX_SCALE, s + 0.5)); }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Zoom in"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
            <path d="M5 7H9M7 5V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        {/* Close */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Zoom level badge */}
      {scale > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[12px] font-public-sans px-3 py-1 rounded-full pointer-events-none">
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Image */}
      <div
        className="p-4 lg:p-12 w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none transition-transform duration-100"
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            cursor,
          }}
        />
      </div>

      {/* Hint */}
      {scale === 1 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[12px] font-public-sans pointer-events-none whitespace-nowrap">
          Scroll or double-click to zoom
        </p>
      )}
    </div>
  );
}
