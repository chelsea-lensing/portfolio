"use client";

import { useState } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Tag from "@/components/Tag";

const FILTERS = ["All", "Circularity", "Commerce", "Health & Wellness"];

const CASE_STUDIES = [
  {
    company: "PATAGONIA",
    title: "Provisions Integration",
    description:
      "Defining the information architecture and UX strategy for integrating Patagonia Provisions onto Patagonia.com, with a goal of growing Provisions revenue from $2M to $5–$8M annually.",
    tags: ["Systems Design", "Commerce"],
    href: "/case-studies/patagonia-provisions",
    image: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PERSONAL",
    title: "Designing with AI",
    description:
      "Designing and building a personal portfolio site from napkin sketch to deployed product, using Figma, Claude Code, and MCP to close the gap between design and code.",
    tags: ["Design Portfolio", "AI Workflow"],
    href: "/case-studies/portfolio",
    image: "/images/case-studies/portfolio/Portfolio_Card Image.jpg",
    category: "Personal",
  },
  {
    company: "PATAGONIA",
    title: "Trade In Integration",
    description:
      "Migrating Patagonia's Trade-In program from a standalone WornWear.com experience to the main Patagonia.com shopping ecosystem — leading to a 1.5x increase in overall trade-in orders submitted, setting up the brand for future used product integration on the website.",
    tags: ["Circularity", "End-to-End Design"],
    href: "/case-studies/trade-in-integration",
    image: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Card Image.jpg",
    category: "Circularity",
  },
  {
    company: "PATAGONIA",
    title: "Global Navigation Redesign",
    description:
      "A redesign of the global navigation menu, driving a 25.7% lift in menu engagement and generating $6.6M in attributable revenue with a projected annual impact of up to $13.7M.",
    tags: ["Info Architecture", "End-to-End Design"],
    href: "/case-studies/navigation-redesign",
    image: "/images/case-studies/navigation-redesign/Patagonia_Nav_Card Image.jpg",
    category: "Commerce",
  },
  {
    company: "PATAGONIA",
    title: "Shop Used Integration",
    description:
      "Surfacing used product alternatives on new product pages — connecting Patagonia's Worn Wear resale business directly into the core commerce experience, leading to Worn Wear's most successful Q1 to date.",
    tags: ["Circularity", "End-to-End Design"],
    href: "/case-studies/shop-used-integration",
    image: "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Card Image.jpg",
    category: "Circularity",
  },
  {
    company: "HAPPYPILLAR",
    title: "Happypillar Native App",
    description:
      "End to end design for a native mobile iOS application that provides practical, evidence-based therapy skills to parents and gives feedback through machine learning technology. The app was subsequently acquired by Manatee, a leading virtual mental health platform.",
    tags: ["End-to-End Design", "Native App"],
    href: "/case-studies/happypillar",
    image: "/images/case-studies/happypillar/Happypillar_Nav_Card Image.jpg",
    category: "Health & Wellness",
  },
];

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [fading, setFading] = useState(false);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    setFading(true);
    setTimeout(() => {
      setActiveFilter(filter);
      setFading(false);
    }, 300);
  };

  const filtered = CASE_STUDIES.filter(
    (cs) =>
      activeFilter === "All" ||
      cs.category === activeFilter
  );

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navigation />

      <section className="bg-cream w-full flex flex-col gap-8 pt-12 pb-14 lg:pb-12 px-4 lg:px-12">
        {/* Label + filters */}
        <div className="flex flex-col gap-6 items-start">
          <p className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal">
            CASE STUDIES
          </p>
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

        {/* Grid */}
        <div
          className={`transition-opacity duration-300 ${fading ? "opacity-50" : "opacity-100"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {filtered.map((cs) => (
              <a
                key={`${cs.company}-${cs.title}`}
                href={cs.href}
                className="bg-white flex flex-col gap-4 overflow-hidden cursor-pointer rounded-2xl p-4 lg:rounded-[32px] xl:p-6"
              >
                {/* Image area */}
                <div className="group relative w-full aspect-square lg:aspect-auto lg:h-[400px] overflow-hidden rounded-xl lg:rounded-2xl">
                  {"image" in cs && cs.image ? (
                    <Image
                      src={cs.image as string}
                      alt={cs.title}
                      fill
                      className="object-cover transition-opacity duration-300 lg:group-hover:opacity-0"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#d9d9d9] transition-opacity duration-300 lg:group-hover:opacity-0" />
                  )}
                  <div className="absolute inset-0 bg-cream flex items-center justify-center p-6 opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
                    <p className="font-public-sans font-normal text-[12px] text-black text-center leading-[20px]">
                      {cs.description}
                    </p>
                  </div>
                </div>

                {/* Company + title */}
                <div className="shrink-0 flex flex-col gap-2 items-start w-full font-poiret text-black leading-normal">
                  <p className="text-[12px] tracking-[1.5px] whitespace-nowrap">
                    {cs.company}
                  </p>
                  <p className="text-[20px] lg:text-[24px] w-full">{cs.title}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 items-start w-full mt-auto">
                  {cs.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="flex justify-center pt-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-poiret text-[14px] lg:text-[16px] text-dark tracking-[1.5px] inline-flex items-center gap-2 cursor-pointer"
          >
            BACK TO TOP
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 9L7 5L11 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
