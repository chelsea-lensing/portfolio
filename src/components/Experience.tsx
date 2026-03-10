"use client";

import { useState } from "react";

const JOBS = [
  {
    title: "Senior Product Designer",
    company: "Patagonia",
    dates: "December 2025 – Present",
    bullets: [
      "Lead end-to-end UX for Patagonia's full used integration onto Patagonia.com, defining a distinct resale shopping pathway that balances circular commerce goals with the mainline business",
      "Own end-to-end UX for the integration of Patagonia Provisions into Patagonia.com for the first time, with a goal of growing Provisions revenue from $2M to $5–8M annually",
      "Partner cross-functionally with Engineering, Product, Brand, Merchandising, and external vendors to align on technical requirements, content strategy, and launch readiness",
      "Present strategic UX recommendations to senior leadership to drive alignment, secure budget, and balance business objectives with user needs",
    ],
  },
  {
    title: "Product Designer",
    company: "Patagonia",
    dates: "February 2023 – December 2025",
    bullets: [
      "Designed the Shop Used PDP component, surfacing used product alternatives on new product pages; 22% of all Worn Wear purchasers came through this component and converted at a rate 32% higher than other sources",
      "Led UX design for the Trade-In migration to Patagonia.com, resulting in 200%+ increase in visitors and digital rejection rate dropping from 35% to 25%",
      "Redesigned global navigation and taxonomy, driving a 27.5% lift in menu engagement and generating $6.6M in revenue with projected incremental annual impact of up to $13.7M",
      "Conducted user research, usability testing, and iterative design to balance business objectives with user needs across commerce, navigation, and circular experiences",
    ],
  },
  {
    title: "User Experience Designer",
    company: "RealLift",
    dates: "October 2022 – February 2023",
    bullets: [
      "Designed user flows, wireframes, and high-fidelity UI in Figma for RealSize, a machine-learning fit solution offering personalized sizing recommendations",
      "Solved UX challenges around onboarding and interaction, helping shoppers navigate sizing tools with confidence",
      "Designed a fit and style solution for Levi's and presented the product vision directly to their leadership team",
    ],
  },
  {
    title: "Product Designer",
    company: "Happypillar",
    dates: "March 2022 – October 2022",
    bullets: [
      "Led end-to-end design for the mobile app from beta through Apple App Store launch; the app was subsequently acquired by Manatee, a leading virtual mental health platform",
      "Defined MVP goals and core flows in collaboration with stakeholders and engineering",
      "Conducted user research and translated insights into actionable design improvements",
      "Built and launched the responsive marketing site, attracting over 100 early beta users",
    ],
  },
  {
    title: "Fiber & Textile Artist",
    company: "Self Employed",
    dates: "June 2019 – March 2022",
    bullets: [
      "Founded and ran a direct-to-consumer e-commerce brand specializing in handmade apparel and fiber art",
      "Led the end-to-end digital experience, from designing the brand identity and building the website to shaping the user journey and refining the product based on real customer insights",
    ],
  },
  {
    title: "Lead Apparel Designer",
    company: "Lee Jeans",
    dates: "January 2015 – June 2018",
    bullets: [
      "Led the design of two new contemporary women's collections that opened new market distribution for the brand for the first time in over a decade",
      "Combined deep user and market research with creative strategy, translating consumer insights, trend forecasting, and performance needs into products that aligned with both brand and business goals",
      "Collaborated closely with cross-functional teams across retail, wholesale, and international markets to bring concepts to market and drive sales",
    ],
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
    <section className="w-full flex flex-col lg:flex-row gap-6 lg:gap-20 items-start px-8 lg:pl-[120px] lg:pr-12 pb-20">
      {/* Label */}
      <p className="font-poiret text-[16px] lg:text-[24px] text-accent tracking-[1.5px] leading-normal whitespace-nowrap">
        EXPERIENCE
      </p>

      {/* Accordion list */}
      <div className="flex-1 min-w-0 w-full lg:pr-[120px]">
        {JOBS.map((job, i) => (
          <div key={`${job.title}-${job.company}`}>
            <div className="h-px w-full bg-border" />
            <button
              className="flex items-center justify-between px-2 py-4 w-full text-left cursor-pointer"
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
            {openIndex === i && (
              <div className="pl-2 pr-6 lg:pr-12 pb-4">
                <ul className="list-disc pl-[18px] font-public-sans font-light text-[12px] text-black leading-[20px]">
                  {job.bullets.map((bullet, j) => (
                    <li key={j}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
        <div className="h-px w-full bg-border" />
      </div>
    </section>
  );
}
