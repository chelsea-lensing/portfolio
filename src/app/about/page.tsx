"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Experience from "@/components/Experience";

const TABS = ["Professional", "Personal"];

const OBSESSIONS = [
  "Cold water swimming",
  "Razor clam pasta",
  "The Pitt",
  "My dachshund, Bambi",
];

const JOBS = [
  {
    title: "Senior Product Designer",
    company: "Patagonia",
    dates: "December 2025 – Present",
    bullets: [
      "Lead end-to-end UX for Patagonia's full used integration onto Patagonia.com, defining a distinct resale shopping pathway that balances circular commerce goals with the mainline business",
      "Own end-to-end UX for the integration of Patagonia Provisions into Patagonia.com for the first time, with a goal of growing Provisions revenue from $2M to $5–8M annually",
      "Partner cross-functionally with Engineering, Product, Brand, Merchandising, and external vendors (Trove) to align on technical requirements, content strategy, and launch readiness",
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

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("Professional");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fading, setFading] = useState(false);
  const isProfessional = activeTab === "Professional";

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setFading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setOpenIndex(null);
      setFading(false);
    }, 150);
  };

  /* ── Static header: title + tabs (never fades) ── */
  const staticHeader = (
    <div className="flex flex-col gap-6 lg:gap-8">
      <h1 className="font-poiret text-[24px] lg:text-[36px] text-black leading-normal">
        ABOUT ME
      </h1>
      <div className="flex gap-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`flex h-10 items-center justify-center px-5 py-[11px] rounded-full text-[14px] font-public-sans font-normal leading-[20px] whitespace-nowrap border transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#3c3c3c] border-[#3c3c3c] text-white"
                  : "bg-[rgba(237,234,226,0.2)] border-[rgba(60,60,60,0.1)] text-dark"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );

  /* ── Bio text (fades) ── */
  const bio = isProfessional ? (
    <div className="font-public-sans font-normal text-[14px] lg:text-[16px] text-black leading-normal w-full flex flex-col gap-4">
      <p>My experience spans end-to-end design across consumer health apps, digital commerce, and complex product ecosystems.</p>
      <p>What I love most about this work is getting into the details — finding the edge cases, the moments where an experience quietly breaks down, and solving them in ways users never have to think about. I enjoy connecting directly with real people: understanding how they actually interact with a product, not just how we assume they do. That combination of close observation and careful craft is what I bring to every project.</p>
    </div>
  ) : (
    <p className="font-public-sans font-normal text-[14px] lg:text-[16px] text-black leading-normal w-full">
      When I&apos;m not behind a screen you can find me reading, cycling, swimming and spending time with friends, family and dogs.
    </p>
  );

  /* ── Desktop inline accordion ── */
  const desktopExperience = (
    <div className="flex gap-10 items-start pr-[120px]">
      <p className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal whitespace-nowrap shrink-0">
        EXPERIENCE
      </p>
      <div className="flex-1 min-w-0">
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
              <div className="pl-2 pr-6 pb-4">
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
    </div>
  );

  /* ── Desktop inline obsessions ── */
  const desktopObsessions = (
    <div className="flex gap-10 items-start">
      <p className="font-poiret text-[24px] text-accent tracking-[1.5px] leading-normal whitespace-nowrap shrink-0">
        CURRENT OBSESSIONS
      </p>
      <ul className="list-disc pl-5 font-public-sans font-normal text-[14px] text-black leading-normal flex flex-col gap-2">
        {OBSESSIONS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navigation />

      {/* ── Desktop layout: photo left + full text column right ── */}
      <div className="hidden lg:flex gap-10 items-start px-12 pt-10 pb-20">
        {/* Photo */}
        <div className={`shrink-0 w-[325px] transition-opacity duration-150 ${fading ? "opacity-50" : "opacity-100"}`}>
          <img
            src={isProfessional ? "/about-professional.jpg" : "/about-personal.jpeg"}
            alt={isProfessional ? "Chelsea Lensing" : "Chelsea and her dachshund Bambi"}
            className="w-full aspect-[3/4] object-cover rounded-[32px]"
          />
        </div>

        {/* Text column: static header + fading content */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {staticHeader}
          <div className={`flex flex-col gap-20 transition-opacity duration-150 ${fading ? "opacity-50" : "opacity-100"}`}>
            <div className={isProfessional ? "pr-[160px]" : ""}>{bio}</div>
            {isProfessional ? desktopExperience : desktopObsessions}
          </div>
        </div>
      </div>

      {/* ── Mobile layout: text → photo → section below ── */}
      <div className="lg:hidden flex flex-col gap-6 pt-10">
        <div className="px-4">
          <div className="px-2">{staticHeader}</div>
        </div>

        <div className={`flex flex-col gap-6 transition-opacity duration-150 ${fading ? "opacity-50" : "opacity-100"}`}>
          <div className="px-4">
            <div className="px-2">{bio}</div>
          </div>

          {/* Personal: obsessions above image */}
          {!isProfessional && (
            <section className="w-full flex flex-col gap-4 items-start px-4">
              <p className="font-poiret text-[16px] text-accent tracking-[1.5px] leading-normal whitespace-nowrap">
                CURRENT OBSESSIONS
              </p>
              <ul className="list-disc pl-5 font-public-sans font-normal text-[14px] text-black leading-normal flex flex-col gap-2">
                {OBSESSIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Professional: scroll prompt above image */}
          {isProfessional && (
            <div className="px-6">
              <a href="#mobile-experience" className="font-public-sans font-normal text-[14px] text-accent underline underline-offset-2 inline-flex items-center gap-1">
                Scroll to see experience
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}

          <div className="px-4">
            <img
              src={isProfessional ? "/about-professional.jpg" : "/about-personal.jpeg"}
              alt={isProfessional ? "Chelsea Lensing" : "Chelsea and her dachshund Bambi"}
              className="w-full aspect-[3/4] object-cover rounded-[32px]"
            />
          </div>

          {isProfessional && (
            <div id="mobile-experience">
              <Experience />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
