"use client";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-white w-full px-12 py-12">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <p className="font-poiret text-[36px] text-black leading-normal">
            CHELSEA LENSING
          </p>
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="w-6 h-6 flex flex-col justify-between py-[3px]"
          >
            <span className="block w-full h-[1.5px] bg-accent" />
            <span className="block w-full h-[1.5px] bg-accent" />
            <span className="block w-full h-[1.5px] bg-accent" />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-accent flex flex-col">
          {/* Nav bar — mirrors regular nav but on red bg */}
          <div className="w-full px-12 py-12 flex items-center justify-between shrink-0">
            <p className="font-poiret text-[36px] text-white leading-normal">
              CHELSEA LENSING
            </p>
            <button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border border-white flex items-center justify-center shrink-0"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col items-center justify-center gap-[48px] py-10 font-poiret text-white text-center overflow-y-auto">
            <div className="flex flex-col gap-5">
              <a href="/" onClick={() => setIsOpen(false)} className="text-[80px] leading-normal">
                HOME
              </a>
              <a href="#case-studies" onClick={() => setIsOpen(false)} className="text-[80px] leading-normal">
                CASE STUDIES
              </a>
              <a href="#about" onClick={() => setIsOpen(false)} className="text-[80px] leading-normal">
                ABOUT
              </a>
            </div>
            <div className="flex gap-[40px] text-[36px]">
              <a href="#" className="shrink-0">RESUME</a>
              <a href="#" className="shrink-0">EMAIL</a>
              <a href="#" className="shrink-0">LINKEDIN</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
