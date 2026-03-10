"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import CaseStudyCard from "./CaseStudyCard";

const FILTERS = ["All", "Circularity", "Commerce", "Health & Wellness"];

const CASE_STUDIES = [
  {
    company: "PATAGONIA",
    title: "Provisions Integration",
    description: "Defining the information architecture and UX strategy for integrating Patagonia Provisions into Patagonia.com, with a goal of growing Provisions revenue from $2M to $5–8M annually.",
    tags: ["Systems Design", "Commerce"],
    href: "/case-studies/patagonia-provisions",
    image: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PERSONAL",
    title: "Designing with AI",
    description: "From napkin sketch to deployed portfolio site — a design-to-code workflow using Figma, Claude Code, and MCP.",
    tags: ["Design Portfolio", "AI Workflow"],
    href: "/case-studies/portfolio",
    image: "/images/case-studies/portfolio/Portfolio_Card Image.jpg",
    category: "Personal",
  },
  {
    company: "PATAGONIA",
    title: "Global Navigation Redesign",
    description: "Redesigning global navigation and taxonomy, driving a 27.5% lift in menu engagement and generating $6.6M in attributable revenue with projected annual impact of up to $13.7M.",
    tags: ["Info Architecture", "End-to-End Design"],
    href: "/case-studies/navigation-redesign",
    image: "/images/case-studies/navigation-redesign/Patagonia_Nav_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PATAGONIA",
    title: "Trade In Integration",
    description: "Led UX design for the Trade-In migration to Patagonia.com, resulting in a 200%+ increase in visitors and the digital rejection rate dropping from 35% to 25%.",
    tags: ["Circularity", "End-to-End Design"],
    href: "/case-studies/trade-in-integration",
    image: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Card Image.jpg",
    category: "Circularity",
  },
  {
    company: "PATAGONIA",
    title: "Shop Used Integration",
    description: "Surfacing used product alternatives on new product pages — connecting Patagonia's Worn Wear resale business directly into the core commerce experience, leading to Worn Wear's most successful Q1 to date.",
    tags: ["Circularity", "End-to-End Design"],
    href: "/case-studies/shop-used-integration",
    image: "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Card Image.jpg",
    category: "Circularity",
  },
  {
    company: "HAPPYPILLAR",
    title: "Native iOS App",
    description: "Led end-to-end design for a mental wellness app from beta through Apple App Store launch. The app was subsequently acquired by Manatee, a leading virtual mental health platform.",
    tags: ["Native App", "End-to-End Design"],
    href: "/case-studies/happypillar",
    image: "/images/case-studies/happypillar/Happypillar_Nav_Card Image.jpg",
    category: "Health & Wellness",
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [fading, setFading] = useState(false);
  const [extraHeight, setExtraHeight] = useState(0);

  // Mobile scroll indicators
  const [showIndicator, setShowIndicator] = useState(true);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop scroll-jacking refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === activeFilter);

  // Compute how much extra vertical scroll space the wrapper needs
  const computeExtraHeight = useCallback(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    if (!trackRef.current) return;
    const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
    setExtraHeight(Math.max(0, maxTranslate));
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(computeExtraHeight);
    window.addEventListener("resize", computeExtraHeight);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", computeExtraHeight);
    };
  }, [computeExtraHeight, activeFilter]);

  // Drive horizontal translation directly from scroll position (no React state = no lag)
  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current || !trackRef.current || window.innerWidth < 1024) return;
      const { top } = wrapperRef.current.getBoundingClientRect();
      const maxTranslate = trackRef.current.scrollWidth - window.innerWidth;
      const progress = Math.max(0, Math.min(-top, Math.max(0, maxTranslate)));
      trackRef.current.style.transform = `translateX(-${progress}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    setFading(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setFading(false);
      // Reset mobile scroll position
      if (mobileScrollRef.current) mobileScrollRef.current.scrollLeft = 0;
      setShowLeftIndicator(false);
    }, 300);
  };

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = mobileScrollRef.current;
    setShowIndicator(scrollLeft < scrollWidth - clientWidth - 8);
    setShowLeftIndicator(scrollLeft > 8);
  };

  const FilterPills = ({ className }: { className?: string }) => (
    <div className={`flex gap-2 items-center ${className ?? ""}`}>
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`shrink-0 flex h-10 items-center justify-center px-5 py-[11px] rounded-full text-[14px] font-public-sans font-normal leading-[20px] whitespace-nowrap border transition-colors cursor-pointer ${
              isActive
                ? "bg-[#3c3c3c] border-[#3c3c3c] text-white"
                : "bg-[rgba(237,234,226,0.2)] border-[rgba(60,60,60,0.1)] text-dark"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── DESKTOP: scroll-jacked horizontal carousel ── */}
      <div
        ref={wrapperRef}
        className="hidden lg:block relative bg-cream"
        style={{ height: `calc(100vh + ${extraHeight}px)` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-cream flex flex-col gap-6 pt-12 pb-14">
          {/* Label + filters */}
          <div className="flex flex-col gap-6 items-start w-full px-12">
            <a
              href="/case-studies"
              className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal w-full transition-opacity duration-200 hover:opacity-60"
            >
              CASE STUDIES
            </a>
            <FilterPills />
          </div>

          {/* Card track — translated by scroll */}
          <div
            ref={trackRef}
            className={`flex gap-4 items-stretch pl-12 pr-12 transition-opacity duration-300 ${fading ? "opacity-50" : "opacity-100"}`}
            style={{ willChange: "transform" }}
          >
            {filtered.map((cs) => (
              <CaseStudyCard
                key={`${cs.company}-${cs.title}`}
                company={cs.company}
                title={cs.title}
                description={cs.description}
                tags={cs.tags}
                href={"href" in cs ? cs.href : undefined}
                image={"image" in cs ? cs.image : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: swipe carousel (unchanged) ── */}
      <section className="lg:hidden bg-cream w-full overflow-hidden flex flex-col gap-6 pt-12 pb-14">
        {/* Label + filters */}
        <div className="flex flex-col gap-6 items-start w-full px-4">
          <a
            href="/case-studies"
            className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal w-full transition-opacity duration-200 hover:opacity-60"
          >
            CASE STUDIES
          </a>
          <FilterPills className="overflow-x-auto scrollbar-hide" />
        </div>

        {/* Scroll carousel */}
        <div
          className={`relative transition-opacity duration-300 ${fading ? "opacity-50" : "opacity-100"}`}
        >
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 items-stretch overflow-x-auto pb-2 scrollbar-hide px-4"
          >
            {filtered.map((cs) => (
              <CaseStudyCard
                key={`${cs.company}-${cs.title}`}
                company={cs.company}
                title={cs.title}
                description={cs.description}
                tags={cs.tags}
                href={"href" in cs ? cs.href : undefined}
                image={"image" in cs ? cs.image : undefined}
              />
            ))}
          </div>

          {/* Left scroll indicator */}
          {showLeftIndicator && (
            <div className="absolute left-0 top-0 bottom-2 flex items-center pointer-events-none">
              <div className="w-20 h-full flex items-center justify-start pl-5">
                <button
                  className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md pointer-events-auto cursor-pointer"
                  onClick={() => mobileScrollRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8L10 13" stroke="#3c3c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Right scroll indicator */}
          {showIndicator && (
            <div className="absolute right-0 top-0 bottom-2 flex items-center pointer-events-none">
              <div className="w-20 h-full flex items-center justify-end pr-5">
                <button
                  className="bg-white rounded-full w-9 h-9 flex items-center justify-center shadow-md pointer-events-auto cursor-pointer"
                  onClick={() => mobileScrollRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="#3c3c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
