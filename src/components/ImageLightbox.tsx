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
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const getClampedOffset = (x: number, y: number, s: number) => {
    if (!imgRef.current || !containerRef.current) return { x, y };
    const img = imgRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();
    // How far the scaled image extends beyond the container on each side
    const maxX = Math.max(0, (img.width * s - container.width) / 2);
    const maxY = Math.max(0, (img.height * s - container.height) / 2);
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const applyScale = (next: number) => {
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    setScale(clamped);
    if (clamped === 1) setOffset({ x: 0, y: 0 });
    else setOffset((prev) => getClampedOffset(prev.x, prev.y, clamped));
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    applyScale(scale - e.deltaY * 0.003);
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
    setOffset(getClampedOffset(
      offsetAtDragStart.current.x + dx,
      offsetAtDragStart.current.y + dy,
      scale
    ));
  };

  const handleMouseUp = () => { dragging.current = false; };

  const handleDoubleClick = () => {
    if (scale > 1) { setScale(1); setOffset({ x: 0, y: 0 }); }
    else applyScale(2.5);
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
      {/* Image container — sized to fit, used for bounds calculation */}
      <div
        ref={containerRef}
        className="p-4 lg:p-12 w-full h-full flex items-center justify-center overflow-hidden"
        onWheel={handleWheel}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
          onClick={(e) => e.stopPropagation()}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
          style={{
            transform: `scale(${scale}) translate(${offset.x / scale}px, ${offset.y / scale}px)`,
            cursor,
            transition: dragging.current ? "none" : "transform 0.1s ease",
          }}
        />
      </div>

      {/* Controls — rendered after image so they're always on top */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); applyScale(scale - 0.5); }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Zoom out"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
            <path d="M5 7H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); applyScale(scale + 0.5); }}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Zoom in"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.5" />
            <path d="M5 7H9M7 5V9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M11 11L14 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
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

      {/* Zoom badge */}
      {scale > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-[12px] font-public-sans px-3 py-1 rounded-full pointer-events-none">
          {Math.round(scale * 100)}%
        </div>
      )}

      {scale === 1 && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-[12px] font-public-sans pointer-events-none whitespace-nowrap">
          Scroll or double-click to zoom
        </p>
      )}
    </div>
  );
}
