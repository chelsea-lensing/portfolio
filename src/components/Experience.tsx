"use client";

import { useState } from "react";

const JOBS = [
  {
    title: "Senior Product Designer",
    company: "Patagonia",
    dates: "December 2025 – Present",
  },
  {
    title: "User Experience Designer",
    company: "Patagonia",
    dates: "February 2023 – December 2025",
  },
  {
    title: "User Experience Designer",
    company: "RiseLift",
    dates: "October 2022 – February 2023",
  },
  {
    title: "Product Designer",
    company: "Happypiller",
    dates: "February 2020 – October 2022",
  },
  {
    title: "User Experience Designer (Volunteer)",
    company: "Hack for LA, Ballot",
    dates: "November 2020",
  },
  {
    title: "Fiber & Textile Artist",
    company: "Self Employed",
    dates: "June 2019 – February 2022",
  },
  {
    title: "Lead Designer",
    company: "Los Jeans",
    dates: "January 2005 – May 2019",
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full flex gap-20 items-start pl-[120px] pr-12 pb-20">
      {/* Label */}
      <p className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal whitespace-nowrap">
        EXPERIENCE
      </p>

      {/* Accordion list */}
      <div className="flex-1 min-w-0">
        {JOBS.map((job, i) => (
          <div key={`${job.title}-${job.company}`}>
            <div className="h-px w-full bg-border" />
            <button
              className="flex items-center justify-between px-2 py-4 w-full text-left"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex flex-col gap-1 items-start leading-[20px] text-black">
                <p className="font-poiret text-[16px] leading-[20px]">{job.title}</p>
                <p className="font-public-sans font-light text-[12px] text-[#666]">
                  {job.company} ({job.dates})
                </p>
              </div>
              <ChevronIcon open={openIndex === i} />
            </button>
          </div>
        ))}
        <div className="h-px w-full bg-border" />
      </div>
    </section>
  );
}
