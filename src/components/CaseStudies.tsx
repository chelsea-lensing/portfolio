"use client";

import { useState, useRef, useEffect } from "react";
import CaseStudyCard from "./CaseStudyCard";

const FILTERS = ["All", "Circularity", "Commerce", "Health & Wellness"];

const CASE_STUDIES = [
  {
    company: "PATAGONIA",
    title: "Provisions Integration",
    description: "Defining the information architecture and UX strategy for integrating Patagonia Provisions onto Patagonia.com, with a goal of growing Provisions revenue from $2M to $5–$8M annually.",
    tags: ["Systems Design", "Commerce"],
    href: "/case-studies/patagonia-provisions",
    image: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PERSONAL",
    title: "Designing with AI",
    description: "Designing and building a personal portfolio site from napkin sketch to deployed product, using Figma, Claude Code, and MCP to close the gap between design and code.",
    tags: ["Design Portfolio", "AI Workflow"],
    href: "/case-studies/portfolio",
    image: "/images/case-studies/portfolio/Portfolio_Card Image.jpg",
    category: "Personal",
  },
  {
    company: "PATAGONIA",
    title: "Global Navigation Redesign",
    description: "A redesign of the global navigation menu, driving a 25.7% lift in menu engagement and generating $6.6M in attributable revenue with a projected annual impact of up to $13.7M.",
    tags: ["Info Architecture", "End-to-End Design"],
    href: "/case-studies/navigation-redesign",
    image: "/images/case-studies/navigation-redesign/Patagonia_Nav_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PATAGONIA",
    title: "Trade In Integration",
    description: "Migrating Patagonia's Trade-In program from a standalone WornWear.com experience to the main Patagonia.com shopping ecosystem — leading to a 1.5x increase in overall trade-in orders submitted, setting up the brand for future used product integration on the website.",
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
    title: "iOS Native App",
    description: "End to end design for a native mobile iOS application that provides practical, evidence-based therapy skills to parents and gives feedback through machine learning technology. The app was subsequently acquired by Manatee, a leading virtual mental health platform.",
    tags: ["Native App", "End-to-End Design"],
    href: "/case-studies/happypillar",
    image: "/images/case-studies/happypillar/Happypillar_Nav_Card Image.jpg",
    category: "Health & Wellness",
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [fading, setFading] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setMinHeight(containerRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    const { scrollWidth, clientWidth } = scrollRef.current;
    setShowIndicator(scrollWidth > clientWidth + 8);
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    setFading(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setShowLeftIndicator(false);
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
      setFading(false);
    }, 300);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowIndicator(scrollLeft < scrollWidth - clientWidth - 8);
    setShowLeftIndicator(scrollLeft > 8);
  };

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === activeFilter);

  return (
    <section className="bg-cream w-full overflow-hidden flex flex-col gap-6 pt-12 pb-14 lg:pb-20">

      {/* Label + filters */}
      <div className="flex flex-col gap-6 items-start w-full px-4 lg:px-12">
        <a href="/case-studies" className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal w-full transition-opacity duration-200 hover:opacity-60">
          CASE STUDIES
        </a>
        <div className="flex gap-2 items-center overflow-x-auto scrollbar-hide">
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
      </div>

      {/* Horizontal scroll carousel — same on mobile and desktop */}
      <div
        ref={containerRef}
        className={`relative transition-opacity duration-300 ${fading ? "opacity-50" : "opacity-100"}`}
        style={minHeight ? { minHeight } : undefined}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 items-stretch overflow-x-auto pb-2 scrollbar-hide pl-4 pr-4 lg:pl-12 lg:pr-12"
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
                onClick={() => scrollRef.current?.scrollBy({ left: -360, behavior: "smooth" })}
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
                onClick={() => scrollRef.current?.scrollBy({ left: 360, behavior: "smooth" })}
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
  );
}
