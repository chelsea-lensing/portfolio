"use client";
import { useState, useRef, useEffect } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`bg-white w-full h-[96px] lg:h-[104px] sticky top-0 z-40 flex items-center px-4 lg:px-12 transition-transform duration-300 ease-in-out ${hidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="w-full flex items-center justify-between">
          <a href="/" className="font-poiret text-[24px] lg:text-[36px] text-black leading-normal">
            CHELSEA LENSING
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setIsOpen(true)}
            className="w-6 h-6 flex flex-col justify-between py-[3px] cursor-pointer"
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
          <div className="w-full h-[96px] lg:h-[104px] px-4 lg:px-12 flex items-center justify-between shrink-0">
            <a href="/" className="font-poiret text-[24px] lg:text-[36px] text-white leading-normal">
              CHELSEA LENSING
            </a>
            <button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border border-white flex items-center justify-center shrink-0 cursor-pointer"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <line x1="1" y1="1" x2="11" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="11" y1="1" x2="1" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Menu content */}
          <div className="flex-1 flex flex-col items-center justify-start gap-[48px] pt-10 pb-10 font-poiret text-white text-center overflow-y-auto">
            <div className="flex flex-col gap-5">
              <a href="/" onClick={() => setIsOpen(false)} className="text-[48px] lg:text-[80px] leading-normal">
                HOME
              </a>
              <a href="/case-studies" onClick={() => setIsOpen(false)} className="text-[48px] lg:text-[80px] leading-normal">
                CASE STUDIES
              </a>
              <a href="/about" onClick={() => setIsOpen(false)} className="text-[48px] lg:text-[80px] leading-normal">
                ABOUT
              </a>
            </div>
            <div className="flex gap-[24px] lg:gap-[40px] text-[24px] lg:text-[36px]">
              <a href="https://drive.google.com/file/d/1Q2epHSCox4mNbJk_M41YvJzsXKnaBR0q/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="shrink-0">RESUME</a>
              <a href="mailto:cjlensing@gmail.com" className="shrink-0">EMAIL</a>
              <a href="https://www.linkedin.com/in/chelsealensing/" target="_blank" rel="noopener noreferrer" className="shrink-0">LINKEDIN</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
