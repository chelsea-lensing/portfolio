"use client";

import { useState } from "react";
import CaseStudyCard from "./CaseStudyCard";

const FILTERS = ["All", "UX Design", "Product", "Research"];

const CASE_STUDIES = [
  {
    company: "PATAGONIA",
    title: "Product Discovery Redesign",
    tags: ["UX Research", "Product", "E-commerce"],
    category: "UX Design",
  },
  {
    company: "PATAGONIA",
    title: "Circularity Commerce Platform",
    tags: ["Strategy", "Product", "Sustainability"],
    category: "Product",
  },
  {
    company: "PATAGONIA",
    title: "Mobile Cart Experience",
    tags: ["Mobile", "UX Design", "Commerce"],
    category: "UX Design",
  },
  {
    company: "RISEUP",
    title: "User Onboarding Flow",
    tags: ["UX Design", "Mobile"],
    category: "UX Design",
  },
  {
    company: "HAPPYPILLER",
    title: "Subscription Dashboard",
    tags: ["Product Design", "Data Viz"],
    category: "Product",
  },
  {
    company: "HACK FOR LA",
    title: "Ballot Design System",
    tags: ["Design Systems", "Civic Tech"],
    category: "Research",
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === activeFilter);

  return (
    <section className="bg-cream w-full flex flex-col gap-6 items-start overflow-hidden pb-20 pl-12 pt-12">
      <div className="flex flex-col gap-6 items-start w-full pr-12">
        <p className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal w-full">
          CASE STUDIES
        </p>

        {/* Filter chips */}
        <div className="flex gap-2 items-center">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex h-10 items-center justify-center px-5 py-[11px] rounded-full text-[14px] font-public-sans font-normal leading-[20px] whitespace-nowrap border transition-colors ${
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

      {/* Scrollable cards row */}
      <div className="flex gap-4 items-stretch overflow-x-auto pb-4 pr-12 scrollbar-hide">
        {filtered.map((cs) => (
          <CaseStudyCard
            key={`${cs.company}-${cs.title}`}
            company={cs.company}
            title={cs.title}
            tags={cs.tags}
          />
        ))}
      </div>
    </section>
  );
}
