"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "discovery",    number: "01", label: "Discovery" },
  { id: "research",     number: "02", label: "Research" },
  { id: "synthesis",    number: "03", label: "Synthesis" },
  { id: "hypothesis",   number: "04", label: "Hypothesis" },
  { id: "design",       number: "05", label: "Design" },
  { id: "test-iterate", number: "06", label: "Test + Iterate" },
  { id: "deliver",      number: "07", label: "Deliver" },
  { id: "results",      number: "08", label: "Results" },
];

export default function CaseStudyPage() {
  const [activeSection, setActiveSection] = useState("discovery");
  const [jumpToOpen, setJumpToOpen] = useState(false);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [showJumpTo, setShowJumpTo] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
        setNavHidden(true);
      } else {
        setNavHidden(false);
      }
      lastScrollY.current = currentScrollY;

      const heroEl = document.getElementById("hero-image");
      if (heroEl) {
        setShowJumpTo(currentScrollY > heroEl.offsetTop + heroEl.offsetHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("footer-nav");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowPrevNext(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setJumpToOpen(false);
  };

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="px-4 lg:px-12 pt-6 pb-4 flex items-center gap-2 font-poiret text-[16px] text-black leading-normal">
        <a href="/case-studies" className="hover:opacity-60 transition-opacity">CASE STUDIES</a>
        <span>›</span>
        <span>PATAGONIA</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        {/* Title */}
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          Navigation Menu &amp; Taxonomy Redesign
        </h1>

        {/* Summary */}
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          A full overhaul of Patagonia.com&apos;s global navigation and category taxonomy — making it easier for customers to find what they&apos;re looking for, faster, while keeping Patagonia&apos;s mission visible throughout the journey.
        </p>

        {/* CTA button */}
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-1 border border-black text-black font-public-sans font-medium text-[14px] leading-[20px] px-6 py-[10px] rounded-full transition-colors hover:bg-black hover:text-white"
          >
            View Live Experience
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="border-t border-b border-[#ebebeb] px-4 lg:px-12 py-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-poiret text-[12px] tracking-[1.5px] text-black">
          <span>LEAD PRODUCT DESIGNER</span>
          <span aria-hidden="true">•</span>
          <span>PATAGONIA</span>
          <span aria-hidden="true">•</span>
          <span>FEBRUARY 2024 – OCTOBER 2024</span>
          <span aria-hidden="true">•</span>
          <span>WEB/MOBILE</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] bg-[#d9d9d9]" />

      {/* Mobile "Jump to" — floating pill, appears after scrolling past hero */}
      {showJumpTo && (
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center">
          <div className="w-[360px] flex flex-col gap-2">

            {/* Section list — expands upward above the pill */}
            {jumpToOpen && (
              <div className="flex flex-col font-public-sans font-normal text-[14px] leading-[20px]">
                {SECTIONS.map(({ id, number, label }, i) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`flex items-center gap-4 px-6 py-2 bg-[#f8f6f4] text-left cursor-pointer w-full border-[#e2e0dc] ${
                      i === 0
                        ? "border rounded-t-[16px]"
                        : i === SECTIONS.length - 1
                        ? "border-b border-l border-r rounded-b-[16px]"
                        : "border-b border-l border-r"
                    } ${activeSection === id ? "text-accent" : "text-black"}`}
                  >
                    <span className="shrink-0 w-6">{number}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Pill button */}
            <button
              onClick={() => setJumpToOpen(!jumpToOpen)}
              className="bg-[#1a1a1a] text-white px-6 py-[10px] rounded-full flex items-center justify-between w-full cursor-pointer"
            >
              <span className="font-public-sans font-medium text-[14px] leading-[20px]">Jump to</span>
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className={`transition-transform duration-200 ${jumpToOpen ? "" : "rotate-180"}`}
              >
                <path d="M4 6L8 10L12 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1">

        {/* Desktop sidebar */}
        <aside className={`hidden lg:flex flex-col justify-between border-r-2 border-[#ebebeb] pl-12 pr-10 pb-12 w-[260px] shrink-0 sticky top-0 h-screen transition-[padding-top] duration-300 ease-in-out ${navHidden ? "pt-12" : "pt-[120px]"}`}>
          {/* Section list — stays pinned to top (below nav) */}
          <div className="flex flex-col gap-2 font-public-sans text-[16px] leading-[20px] text-black">
            {SECTIONS.map(({ id, number, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-4 pl-2 py-2 w-full text-left cursor-pointer transition-colors ${
                  activeSection === id ? "text-accent" : "text-black hover:text-accent"
                }`}
              >
                <span>{number}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Prev / Next — stays pinned to bottom, hides when footer nav is visible */}
          {showPrevNext && (
            <div className="flex flex-col gap-4 transition-opacity duration-300">
              <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                PREVIOUS PROJECT
              </a>
              <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
                NEXT PROJECT
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 2L9 6L3 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </aside>

        {/* Section content */}
        <div className="flex-1 min-w-0 px-4 lg:px-12 pt-10 lg:pt-20 pb-24 lg:pb-[120px] flex flex-col gap-10 lg:gap-20">

          {/* 01 Discovery */}
          <section id="discovery" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="01" title="DISCOVERY" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="PROBLEM STATEMENT" heading="What problem were we solving?">
                Describe the business context and the problem that initiated this project. What was broken, missing, or creating friction? Reference supporting competitive audit findings or stakeholder alignment documents to ground the problem in evidence.
              </Card>
              <Card eyebrow="GOALS &amp; CONSTRAINTS">
                <div className="flex flex-col lg:flex-row gap-6 font-public-sans font-normal text-[16px] text-black leading-[32px]">
                  <div className="flex-1">
                    <p>BUSINESS GOALS:</p>
                    <ul className="list-disc ml-6">
                      <li>Increase conversion on key commerce flows</li>
                      <li>Drive awareness of underutilized product</li>
                      <li>Support a scalable, profitable business model</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <p>USER GOALS</p>
                    <ul className="list-disc ml-6">
                      <li>Easily discover relevant products or services</li>
                      <li>Understand value proposition clearly</li>
                      <li>Complete tasks with minimal friction</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 02 Research */}
          <section id="research" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="RESEARCH" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="METHODS" heading="How did we learn about the problem space?">
                Describe your research methods: interviews, surveys, analytics deep-dives, competitive analysis, heuristic evaluation. Explain why you chose these methods for this specific context. Link to interview session notes or a research synthesis board for detail.
              </Card>
              <QuoteCard
                quote="Insert a compelling user quote that captures the core pain point or need you uncovered."
                source="PARTICIPANT, USABILITY STUDY"
              />
            </div>
          </section>

          {/* 03 Synthesis */}
          <section id="synthesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="SYNTHESIS" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="KEY INSIGHTS" heading="What did the data tell us?">
                Summarize the patterns and insights that emerged from research. How did you move from raw data to actionable direction? Reference your affinity mapping or journey map to show how insights were organized.
              </Card>
              <Card eyebrow="COMPETING PRIORITIES">
                <div className="flex flex-col lg:flex-row gap-6 font-public-sans font-normal text-[16px] text-black leading-[32px]">
                  <div className="flex-1">
                    <p>TENSIONS IDENTIFIED:</p>
                    <ul className="list-disc ml-6">
                      <li>Business goal A vs. user expectation B</li>
                      <li>Technical constraint C limiting design option D</li>
                      <li>Brand requirement E vs. usability best practice</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <p>DESIGN PRINCIPLES SET:</p>
                    <ul className="list-disc ml-6">
                      <li>Clarity over cleverness</li>
                      <li>Progressive disclosure for complexity</li>
                      <li>Consistency with existing system patterns</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 04 Hypothesis */}
          <section id="hypothesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="HYPOTHESIS" />
            <Card eyebrow="DESIGN HYPOTHESIS" heading="What did we believe would solve it?">
              State your hypothesis clearly: &ldquo;If we [design intervention], then [expected user behavior change], which will result in [business outcome].&rdquo; Describe how you framed the opportunity for stakeholders and secured buy-in. Reference the strategic brief presented to leadership.
            </Card>
          </section>

          {/* 05 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="EXPLORATION" heading="How did we explore the solution space?">
                <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  Walk through your design process — from early lo-fi wireframes and concept explorations to the rationale behind key decisions. What did you try, what did you discard, and why?
                </p>
                <div className="aspect-[667/380] bg-[#d9d9d9] w-full mt-2" />
              </Card>
              <Card eyebrow="FINAL DIRECTION" heading="The solution we moved forward with">
                <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  Describe the final design direction and what made it the right call. How did it balance user needs, business goals, and technical constraints? Link to high-fidelity mockups or the component spec sheet.
                </p>
                <div className="aspect-[667/380] bg-[#d9d9d9] w-full mt-2" />
              </Card>
            </div>
          </section>

          {/* 06 Test & Iterate */}
          <section id="test-iterate" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="TEST &amp; ITERATE" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="USABILITY TESTING" heading="What did we validate — and what changed?">
                Describe your testing approach: moderated sessions, unmoderated testing, A/B experiments. What hypotheses were validated? What surprised you? How did findings directly inform design changes? Reference the testing synthesis report or before/after comparisons.
              </Card>
              <QuoteCard
                quote="Insert a quote from testing that led to a meaningful design change — showing your responsiveness to user feedback."
                source="PARTICIPANT, USABILITY STUDY"
              />
            </div>
          </section>

          {/* 07 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="DELIVER" />
            <Card eyebrow="HANDOFF &amp; LAUNCH" heading="How did we bring it to production?">
              <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">
                Describe your handoff process: developer specs, annotation, QA, and any cross-functional coordination required to launch successfully. Reference the Figma spec documentation or a QA checklist. Note any edge cases or logic you designed for.
              </p>
              <div className="aspect-[667/380] bg-[#d9d9d9] w-full mt-2" />
            </Card>
          </section>

          {/* 08 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="08" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Metric row */}
              <div className="flex">
                {[
                  { value: "+XX%", label: "Metric one — conversion, engagement, etc." },
                  { value: "$XM",  label: "Metric two — revenue, pipeline, etc." },
                  { value: "XX%",  label: "Secondary metric supporting the outcome" },
                ].map((m, i, arr) => (
                  <div
                    key={m.label}
                    className={`flex-1 bg-[#f8f6f4] border border-[#ebebeb] p-8 flex flex-col gap-4 items-center justify-center ${
                      i === 0 ? "rounded-l-[16px]" : i === arr.length - 1 ? "rounded-r-[16px]" : ""
                    }`}
                  >
                    <p className="font-poiret text-[32px] text-black leading-[20px] whitespace-nowrap">{m.value}</p>
                    <p className="font-public-sans font-normal text-[16px] text-black text-center leading-[24px]">{m.label}</p>
                  </div>
                ))}
              </div>
              <Card eyebrow="IMPACT &amp; LEARNINGS" heading="What did this project accomplish — and teach us?">
                Summarize quantitative results alongside qualitative outcomes. What did this project unlock for the business? What would you do differently? What did this teach you about users, systems, or your own design practice? Reference the post-launch analytics report for supporting data.
              </Card>
            </div>
          </section>

        </div>
      </div>

      {/* Footer nav */}
      <div id="footer-nav" className="border-t border-[#ebebeb] px-4 lg:px-12 py-8 lg:py-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          PREVIOUS PROJECT
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black cursor-pointer hover:opacity-60 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          BACK TO TOP
        </button>
        <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          NEXT PROJECT
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 2L9 6L3 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <Footer />
    </main>
  );
}

/* ── Sub-components ── */

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 font-poiret text-black leading-[20px]">
        <span className="text-[16px] tracking-[2px]">{number}</span>
        <span className="text-[40px]">{title}</span>
      </div>
      <div className="h-px w-full bg-[#ebebeb]" />
    </div>
  );
}

function Card({
  eyebrow,
  heading,
  children,
}: {
  eyebrow: string;
  heading?: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4 font-poiret not-italic">
        <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">{eyebrow}</p>
        {heading && <h2 className="text-[24px] text-black leading-[20px]">{heading}</h2>}
      </div>
      {typeof children === "string" ? (
        <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">{children}</p>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}

function QuoteCard({ quote, source }: { quote: string; source: string }) {
  return (
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-8">
      <div className="flex gap-6 items-center">
        <div className="w-px self-stretch bg-[#ebebeb] shrink-0" />
        <div className="flex flex-col gap-4">
          <p className="font-poiret text-[24px] text-black leading-[32px]">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="font-poiret text-[14px] text-accent tracking-[1.5px] leading-normal">
            -{source}
          </p>
        </div>
      </div>
    </div>
  );
}
