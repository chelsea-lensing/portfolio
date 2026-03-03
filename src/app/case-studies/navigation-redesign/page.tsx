"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SECTIONS = [
  { id: "discovery",    number: "01", label: "Discovery" },
  { id: "research",     number: "02", label: "Research" },
  { id: "hypothesis",   number: "03", label: "Hypothesis" },
  { id: "design",       number: "04", label: "Design" },
  { id: "test-iterate", number: "05", label: "Test + Iterate" },
  { id: "deliver",      number: "06", label: "Deliver" },
  { id: "results",      number: "07", label: "Results" },
];

export default function NavigationRedesignPage() {
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
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          Global Navigation Redesign
        </h1>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          A full overhaul of Patagonia.com&apos;s global navigation and category taxonomy, making it easier for customers to find what they&apos;re looking for, faster, while keeping Patagonia&apos;s mission visible throughout the journey.
        </p>
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-1 bg-black text-white font-public-sans font-medium text-[14px] leading-[20px] px-6 py-[10px] rounded-full transition-colors hover:opacity-80"
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
          <span>MAY – SEPTEMBER 2025</span>
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
          {showPrevNext && (
            <div className="flex flex-col gap-4">
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

              {/* The Brief */}
              <Card eyebrow="THE BRIEF" heading="Define the biggest possible vision for Patagonia's product discovery experience">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The brief from leadership was to imagine what Patagonia&apos;s path to purchase could be at its best. The vision was an experience akin to shopping with a trusted outdoor gear expert: intuitive discovery that connects customers to the right products for their preferences and goals, immersive storytelling that highlights quality, responsibility, and real-world use, and personalized recommendations based on sport, environment, and budget.</p>
                  <p>Customers would shop confidently with guidance, authentic storytelling, and seamless navigation — making informed decisions while feeling connected to Patagonia&apos;s mission. This was the north star. Our job was to figure out where to start.</p>
                </div>
              </Card>

              {/* Data Sources */}
              <Card eyebrow="DATA SOURCES">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[32px]">
                  <p className="leading-[24px]">To pressure-test the vision against reality, we anchored the discovery work in three primary sources: Fullstory behavioral data, a Brand Health Report, and a SWOT analysis gathered by the product manager.</p>
                  <div>
                    <p className="font-semibold mb-1">FULLSTORY DATA:</p>
                    <ul className="list-disc ml-6 leading-[32px]">
                      <li>Session replays and heatmaps revealed where customers struggled to navigate the catalog</li>
                      <li>Funnel data showed significant drop-off points between homepage and category pages</li>
                      <li>Mobile sessions highlighted how the current nav failed users on smaller screens</li>
                      <li>Search usage patterns indicated customers were defaulting to search when the nav let them down</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">BRAND HEALTH REPORT</p>
                    <ul className="list-disc ml-6 leading-[32px]">
                      <li>Surfaced how customers perceive and emotionally connect with the brand versus how they shop it</li>
                      <li>Revealed gaps between brand affinity and product discoverability — strong loyalty, weak catalog exploration</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">SWOT ANALYSIS</p>
                    <ul className="list-disc ml-6 leading-[32px]">
                      <li>Strengths: deep brand loyalty, unique product storytelling, strong sustainability positioning</li>
                      <li>Weaknesses: fragmented taxonomy, outdated navigation structure, poor mobile conversion</li>
                      <li>Opportunities: activity-based discovery, circularity integration, new catalog expansion (Provisions, Shop Used)</li>
                      <li>Threats: competitors with more intuitive browsing; 42% of customers don&apos;t consider Patagonia for exercise/training</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Friction Point Affinity Mapping */}
              <Card eyebrow="FRICTION POINT AFFINITY MAPPING" heading="Quantifying where customer pain is most intense">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>We organized customer friction points into natural groupings, quantifying where pain was most intense across six clusters: Understanding Gaps, Filtering &amp; Sorting, Homepage &amp; Discovery Barriers, Versatility/Longevity Confidence Fatigue, Personalization, and Guided Shopping. Cross-referencing these with funnel data gave us a prioritized view of where to focus.</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-semibold mb-2">Highest Impact Friction Areas</p>
                      <ul className="list-disc ml-6 leading-[32px]">
                        <li>Navigation Structure — 42% don&apos;t consider Patagonia for exercise/training; over-categorization forces siloed paths</li>
                        <li>Filtering &amp; Sorting — only &ldquo;Waterproof&rdquo; appears in top 20 filters at 1% usage; missing multi-select functionality</li>
                        <li>Homepage Discovery — no products above fold; 33% drop off immediately after homepage</li>
                        <li>Mobile — 65% of traffic is mobile but conversion lags significantly behind desktop</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Open Questions Identified</p>
                      <ul className="list-disc ml-6 leading-[32px]">
                        <li>Where does filtering make more sense than navigation depth?</li>
                        <li>How much category depth actually supports vs. overwhelms product discovery?</li>
                        <li>What internal constraints (backend systems, merchandising, brand) need to be considered if structural changes are made?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Personas & Journey Mapping */}
              <Card eyebrow="PERSONAS & JOURNEY MAPPING" heading="Two distinct customer personas to guide the work">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-3">
                    <p>After we identified the friction points, we grounded the work in real user behavior across two core personas and created journey maps for each to connect leadership to actual user challenges and surface opportunities that would anchor future solutions.</p>
                    <p>Two distinct customer personas anchored our journey mapping:</p>
                    <ul className="list-disc ml-6 leading-[32px]">
                      <li>Olivia, a new customer planning a spring hiking trip who struggles to know where to start</li>
                      <li>Leo, a core sport customer who shops with precision and expertise but hits friction around cross-category discovery</li>
                    </ul>
                  </div>
                  <OutlineButton
                    label="View Personas & User Journeys in FigJam"
                    href="https://www.figma.com/board/D5M1xSfonTOmjrOQB7YkQI/Patagonia_Nav-Discovery---Research?node-id=9-5291&t=w11TWxhJfdjUPv1M-1"
                  />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="aspect-[4/3] bg-[#d9d9d9] rounded-lg" />
                    <div className="aspect-[4/3] bg-[#d9d9d9] rounded-lg" />
                  </div>
                </div>
              </Card>

              {/* Discovery Wrap Up */}
              <Card eyebrow="DISCOVERY WRAP UP" heading="Focus on Navigation">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-3">
                    <p>With journey mapping complete and friction points organized through affinity mapping, we needed to move from problem framing to solution shaping. The opportunity solution tree exercise was the bridge — taking the opportunities we&apos;d identified across both personas and stress-testing them against each other to understand which would have the greatest impact on the user&apos;s product discovery experience.</p>
                    <p>Each opportunity was mapped against the friction points it addressed. What emerged wasn&apos;t a list of features — it was a clear hierarchy of impact. The exercise made one thing difficult to argue with: a navigation redesign would do more for product discovery than any other single intervention. It was the most direct path to reducing the friction that was causing customers to abandon, default to search, or never explore the catalog at all.</p>
                  </div>
                  <ul className="list-disc ml-6 leading-[32px]">
                    <li>Navigation friction was the highest-impact, most directly addressable problem in the funnel</li>
                    <li>42% of customers don&apos;t consider Patagonia for exercise or training — a reach problem rooted in discoverability</li>
                    <li>33% of users drop off immediately after the homepage — a flow problem the navigation could directly address</li>
                    <li>A fixed taxonomy foundation would reduce complexity for future work</li>
                  </ul>
                  <p>This finding gave the team — and leadership — a concrete, evidence-backed rationale for where to focus.</p>
                  <OutlineButton
                    label="View Discovery Exercises in FigJam"
                    href="https://www.figma.com/board/D5M1xSfonTOmjrOQB7YkQI/Patagonia_Nav-Discovery---Research?node-id=0-1&t=w11TWxhJfdjUPv1M-1"
                  />
                </div>
              </Card>

            </div>
          </section>

          {/* 02 Research */}
          <section id="research" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="RESEARCH" />
            <div className="flex flex-col gap-4 lg:gap-6">

              {/* Taxonomy Audit */}
              <Card eyebrow="TAXONOMY & NAVIGATION AUDIT" heading="Understanding how customers navigate and where they get lost">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-3">
                    <p>We combined a Taxonomy &amp; Navigation Audit, a Baymard UX audit, funnel analysis, user journey mapping, and a friction point affinity mapping exercise to build a comprehensive picture of the problem. The taxonomy audit was conducted in June 2025 with three goals:</p>
                    <ol className="list-decimal ml-6 leading-[32px]">
                      <li>Identify friction points in the current structure</li>
                      <li>Build cross-functional alignment between UX, merch, brand, and product teams</li>
                      <li>Lay a foundation for system-level decisions about how we define categories, filters, and activities across the site.</li>
                    </ol>
                  </div>
                  <OutlineButton
                    label="View Taxonomy Audit Findings Deck"
                    href="https://www.figma.com/proto/XnYsPROwHKKWMCbcrVYLj1/Product-Discovery-Navigation?node-id=3-62466&p=f&viewport=60%2C194%2C0.07&t=bTXE8XIXYBbu3sYE-1&scaling=min-zoom&content-scaling=fixed&page-id=3%3A7"
                  />
                  <div className="aspect-[667/380] bg-[#d9d9d9] w-full rounded-lg" />
                </div>
              </Card>

              {/* Referencing Past Work */}
              <Card eyebrow="REFERENCING PAST WORK" heading="Build on, don't repeat">
                Before moving to design, I revisited the navigation redesign A/B test results from 2022. This ensured the new direction built on — rather than repeated — past learning, and gave the team a richer foundation for the structural decisions ahead.
              </Card>

            </div>
          </section>

          {/* 03 Hypothesis */}
          <section id="hypothesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="HYPOTHESIS" />
            <Card eyebrow="DESIGN HYPOTHESIS" heading="What did we believe would solve it?">
              State your hypothesis clearly: &ldquo;If we [design intervention], then [expected user behavior change], which will result in [business outcome].&rdquo; Describe how you framed the opportunity for stakeholders and secured buy-in. Reference the strategic brief presented to leadership.
            </Card>
          </section>

          {/* 04 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="DESIGN" />
            <Card eyebrow="HANDOFF & SPECS" heading="How did we explore the solution space?">
              <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>Walk through your design process — from early lo-fi wireframes and concept explorations to the rationale behind key decisions. What did you try, what did you discard, and why?</p>
                <div className="aspect-[667/380] bg-[#d9d9d9] w-full mt-2 rounded-lg" />
              </div>
            </Card>
          </section>

          {/* 05 Test + Iterate */}
          <section id="test-iterate" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="TEST & ITERATE" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="USABILITY TESTING" heading="What did we validate — and what changed?">
                Describe your testing approach: moderated sessions, unmoderated testing, A/B experiments. What hypotheses were validated? What surprised you? How did findings directly inform design changes? Reference the testing synthesis report or before/after comparisons.
              </Card>
              <QuoteCard
                quote="Insert a quote from testing that led to a meaningful design change — showing your responsiveness to user feedback."
                source="PARTICIPANT, USABILITY STUDY"
              />
              <Card eyebrow="FINAL DIRECTION" heading="The solution we moved forward with">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Describe the final design direction and what made it the right call. How did it balance user needs, business goals, and technical constraints? Link to high-fidelity mockups or the component spec sheet.</p>
                  <div className="aspect-[667/380] bg-[#d9d9d9] w-full mt-2 rounded-lg" />
                </div>
              </Card>
            </div>
          </section>

          {/* 06 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="DELIVER" />
            <Card eyebrow="HANDOFF & SPECS" heading="Cross-functional coordination to ship a global navigation change">
              <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>Shipping a global nav change required tight coordination across Engineering, Merchandising, Brand Creative, and international teams in EU and JP. I produced Figma specifications for every component state and worked directly with engineering through a phased build review process.</p>
                <OutlineButton
                  label="Figma Spec Documentation"
                  href="https://www.figma.com/design/XnYsPROwHKKWMCbcrVYLj1/Product-Discovery-Navigation?node-id=3-4&t=p92bY4EuzwKrffCL-1"
                />
                <div className="flex flex-col lg:flex-row gap-6 leading-[32px]">
                  <div className="flex-1">
                    <p className="font-semibold mb-1">DELIVERABLES PRODUCED:</p>
                    <ul className="list-disc ml-6">
                      <li>Figma component library with all nav states</li>
                      <li>Annotated interaction behavior</li>
                      <li>International variant specs for EU and JP</li>
                    </ul>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold mb-1">CROSS-FUNCTIONAL WORK:</p>
                    <ul className="list-disc ml-6">
                      <li>Design QA period — caught critical rendering issues before moving to UAT</li>
                      <li>Weekly syncs with Merchandising to validate taxonomy mapping against backend catalog structure</li>
                      <li>Post-launch monitoring: weekly check-ins for four weeks to surface and resolve production edge cases</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* 07 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              {/* Metric row */}
              <div className="flex">
                {[
                  { value: "+27.5%", label: "Navigation engagement rate vs. baseline" },
                  { value: "2X",     label: "Conversion rate vs. users not engaging with the nav (3.75% vs. 1.6%)" },
                  { value: "$6.6M",  label: "Revenue generated through the redesigned experience" },
                ].map((m, i, arr) => (
                  <div
                    key={m.value}
                    className={`flex-1 bg-[#f8f6f4] border border-[#ebebeb] p-8 flex flex-col gap-4 items-center justify-center ${
                      i === 0 ? "rounded-l-[16px]" : i === arr.length - 1 ? "rounded-r-[16px]" : ""
                    }`}
                  >
                    <p className="font-poiret text-[32px] text-accent leading-[20px] whitespace-nowrap">{m.value}</p>
                    <p className="font-public-sans font-normal text-[16px] text-black text-center leading-[24px]">{m.label}</p>
                  </div>
                ))}
              </div>

              <Card eyebrow="BUSINESS IMPACT — 3 MONTHS POST LAUNCH" heading="Customers are discovering more of Patagonia, faster">
                Three months post-launch, users interacting with the new navigation converted at more than double the rate of users who weren&apos;t (3.75% vs. 1.6%). This isn&apos;t a launch spike, it&apos;s sustained performance that reflects a fundamentally more intuitive experience. PLP click-through rate increased 12.9%, and users were reaching a product detail page in under 45 seconds on average.
              </Card>

              <Card eyebrow="LEARNINGS" heading="A scalable foundation — not a finished product">
                The most durable outcome of this project isn&apos;t a nav redesign — it&apos;s a taxonomy framework Patagonia can build on as the catalog and brand continue to evolve. With Provisions and Shop Used coming online, the system is designed to absorb new categories without requiring structural surgery.
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

function OutlineButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="self-start inline-flex items-center gap-1 border border-[#1a1a1a] text-[#1a1a1a] font-public-sans font-medium text-[14px] leading-[20px] px-4 py-[10px] rounded-full hover:bg-[#1a1a1a] hover:text-white transition-colors"
    >
      {label}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
