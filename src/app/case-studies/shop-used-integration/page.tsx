"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

const SECTIONS = [
  { id: "discovery",    number: "01", label: "Discovery" },
  { id: "hypothesis",   number: "02", label: "Hypothesis" },
  { id: "design",       number: "03", label: "Design" },
  { id: "test-iterate", number: "04", label: "Test + Iterate" },
  { id: "deliver",      number: "05", label: "Deliver" },
  { id: "results",      number: "06", label: "Results" },
];

export default function ShopUsedIntegrationPage() {
  const [activeSection, setActiveSection] = useState("discovery");
  const [jumpToOpen, setJumpToOpen] = useState(false);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [showJumpTo, setShowJumpTo] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
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

  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="px-4 lg:px-12 pt-6 pb-4 flex items-center gap-2 font-poiret text-[16px] text-black leading-normal">
        <a href="/case-studies" className="hover:opacity-60 transition-opacity">CASE STUDIES</a>
        <span>›</span>
        <span>CIRCULARITY</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          SHOP USED PDP COMPONENT
        </h1>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          Designing a responsive &lsquo;Shop Used&rsquo; component that surfaces secondhand inventory directly on Patagonia.com product detail pages — making resale visible, credible, and actionable at the moment of purchase consideration.
        </p>
        <div>
          <a
            href="https://www.patagonia.com/product/mens-classic-retro-x-fleece-jacket/23057.html?dwvar_23057_color=DNSE"
            target="_blank"
            rel="noopener noreferrer"
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
          <span>MAY 2024 - OCTOBER 2024</span>
          <span aria-hidden="true">•</span>
          <span>WEB / MOBILE</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] overflow-hidden">
        <img
          src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Hero.jpg"
          alt="Desktop and mobile mockup showing the Shop Used PDP component on Patagonia.com. The desktop view shows the Men's Retro Pile Jacket product detail page with the Shop Used tab selected, displaying a used match with condition details, pricing ($63–$79), and available colors. The mobile view shows the same component in a compact layout with the Shop Used tab active."
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => openLightbox(
            "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Hero.jpg",
            "Desktop and mobile mockup showing the Shop Used PDP component on Patagonia.com."
          )}
        />
      </div>

      {/* Mobile "Jump to" */}
      {showJumpTo && (
        <div className="lg:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center">
          <div className="w-[300px] flex flex-col gap-2">
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
              <a href="/case-studies/navigation-redesign" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                PREVIOUS PROJECT
              </a>
              <a href="/case-studies/happypillar" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
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

              <Card eyebrow="THE PROBLEM" heading="Resale was invisible at the moment it mattered most">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Before this project, customers shopping on Patagonia.com had no way to encounter used products. The only path to resale was through a global navigation link that took them off Patagonia.com entirely and onto WornWear.com — a separate site, a separate mental model, a separate journey. Most customers shopping a new jacket never knew a used version existed.</p>
                  <p>The result was a structural gap: resale was invisible during one of the most important decision-making moments in the customer&apos;s path to purchase. Patagonia had no data on how customers would evaluate used options alongside new, and no surface to test it on.</p>
                </div>
              </Card>

              <Card eyebrow="STRATEGIC CONTEXT" heading="The 'Test & Learn' phase of Worn Wear integration">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>This project was Phase 1 — the &lsquo;Test &amp; Learn&rsquo; — of Patagonia&apos;s Worn Wear integration strategy, with the PDP chosen as the starting surface because purchase intent is highest there. The broader integration roadmap spanned four stages: Test &amp; Learn (PDP component), Full Integration (Trade-In and Resale Phase Two on Patagonia.com), and All Circularity (full circularity services integrated). This case study covers the Test &amp; Learn phase.</p>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-usedcomponent/Patagonia_Integration phases_1.jpg"
                      alt="Diagram titled 'Integration Phases | User Experience' showing three phases across a horizontal timeline: Test & Learn, Full Integration, and All Circularity. The Test & Learn phase is outlined with a dashed green border indicating the current phase, containing Resale Phase One targeting Fall 2024 completion with the Shop Used PDP component integration."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => openLightbox(
                        "/images/case-studies/patagonia-usedcomponent/Patagonia_Integration phases_1.jpg",
                        "Diagram titled 'Integration Phases | User Experience' showing three phases across a horizontal timeline: Test & Learn, Full Integration, and All Circularity."
                      )}
                    />
                  </div>
                </div>
              </Card>

              <Card eyebrow="AUDIENCE & COMPETITIVE RESEARCH" heading="What the data told us about who we were designing for">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>Before component design began, I consumed a foundational audience research report produced by Patagonia&apos;s Insights &amp; Analytics team — combining an influence mapping framework, digital audience data via SparkToro, and a Worn Wear Messaging Survey. This research shaped what the component needed to communicate, not just what it needed to show.</p>
                    <p>A key insight from the audience profile: the Worn Wear audience shares a similar digital behavior profile to the main brand, but with a higher affinity for discounts, value, and sustainable fashion. They do brand, price, and product discovery across specialty retail sites, gear review sites, ethical shopping apps, and third-party resellers — meaning many potential Worn Wear customers were already comparing Patagonia gear against eBay and Poshmark listings before ever encountering Worn Wear directly.</p>
                    <p>Insights also identified Worn Wear as a potential acquisition engine for Patagonia — broadening the customer base where price is a barrier and appealing to younger customers excited to participate in the circular economy. Worn Wear&apos;s customer base skews younger — over 80% of under-35&apos;s shop used clothing at least a few times a year — and repeat Worn Wear customers deliver comparable lifetime value to main brand repeat customers, with 29% of repeat WW customers having 10+ lifetime orders vs. 18% of mainline customers. This was as much an acquisition and retention play as a circularity one.</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="rounded-lg overflow-hidden w-full lg:w-3/4">
                      <img
                        src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Insights.jpg"
                        alt="Grouped bar chart comparing the share of new customers by age group for Worn Wear versus the Patagonia main brand. Worn Wear skews younger, with notably higher representation in the 25–34 age group."
                        className="w-full h-auto cursor-zoom-in"
                        onClick={() => openLightbox(
                          "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Insights.jpg",
                          "Grouped bar chart comparing the share of new customers by age group for Worn Wear versus the Patagonia main brand."
                        )}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card eyebrow="AUDIENCE PERSONAS" heading="Four personas developed to ground the integration vision">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>In parallel with the component design, I developed four customer personas synthesized from the insights research, internal analytics, and business goals. These personas were developed as forward-looking artifacts to keep the full range of Worn Wear customers visible throughout design decisions, even as Test &amp; Learn phase constraints limited scope to the PDP component alone. They went on to anchor the Full Integration phase roadmap and journey mapping work.</p>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Personas.jpg"
                      alt="Four customer personas — Kenji, Zoe, Theo, and Cleo — each shown with a profile photo, age, location, archetype label, a representative quote, and columns for motivations, pain points, and opportunity."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => openLightbox(
                        "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Personas.jpg",
                        "Four customer personas — Kenji, Zoe, Theo, and Cleo — each shown with a profile photo, age, location, archetype label, a representative quote, and columns for motivations, pain points, and opportunity."
                      )}
                    />
                  </div>
                </div>
              </Card>

              <Card eyebrow="THE CORE DESIGN CHALLENGE" heading="Most inventory isn't a perfect match">
                The vast majority of Worn Wear inventory does not have a perfect style-color-size match to new Patagonia products. If the component only surfaced perfect matches, it would be empty most of the time and functionally useless at scale. This raised the central question: would customers meaningfully consider used options if they weren&apos;t exact matches? The answer needed to come from research before any design decisions could be made.
              </Card>

            </div>
          </section>

          {/* 02 Hypothesis */}
          <section id="hypothesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="HYPOTHESIS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="PROBLEM STATEMENT">
                Customers shopping on Patagonia.com were never exposed to used alternatives at the moment of highest purchase intent. The path to resale required leaving the site entirely, keeping resale invisible to the majority of Patagonia.com shoppers and leaving a significant acquisition and retention opportunity unrealized.
              </Card>

              <Card eyebrow="DESIGN HYPOTHESIS">
                Implementing a &lsquo;Shop Used&rsquo; component on Patagonia.com PDPs — in partnership with Trove — would make resale visible at the moment of consideration, drive qualified traffic to Worn Wear, and generate the behavioral data needed to inform future integration phases. The component needed to remain useful across the full range of inventory availability, and not disrupt the primary purchase flow.
              </Card>

            </div>
          </section>

          {/* 03 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="DESIGNING FOR LOGIC" heading="A single component that adapts to real inventory">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>One of the most significant design challenges wasn&apos;t visual — it was logical. The component needed to handle every possible inventory state gracefully: a customer who hadn&apos;t selected a size yet, one who had an exact used match, one whose size had no exact match but similar products existed, and one browsing a category where used inventory wasn&apos;t available at all. Each state required its own distinct UI, copy, and behavior.</p>
                    <p>The matching hierarchy was built on a working assumption — that customers would prioritize size over color — which shaped the cascade: the component always attempts the most specific match first, stepping down to broader alternatives rather than disappearing when inventory isn&apos;t ideal. The usability study later confirmed this assumption and solidified the logic before development handoff.</p>
                    <p>The matching logic for each state was defined precisely:</p>
                  </div>
                  <div className="flex flex-col gap-6">
                    {/* Row 1: States 1 & 2 */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
                      {/* State 1 */}
                      <div className="flex-1 bg-cream border border-[#ebebeb] rounded-2xl p-5 lg:p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-[16px] text-black">
                          <ol className="list-decimal font-semibold font-public-sans" start={1}>
                            <li className="ml-6">New Tab State</li>
                          </ol>
                          <p className="font-normal">Customer lands on a PDP and sees a new tabbed buying cluster for Shop New and Shop Used. Shop New is selected by default.</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_New Tab State.jpg"
                            alt="Mobile mockup of the Men's Retro Pile Jacket product detail page showing the new tab state — the 'Shop New' tab is selected by default in the buying cluster, with the 'Shop Used' tab visible alongside it."
                            className="w-full h-auto cursor-zoom-in object-contain"
                            onClick={() => openLightbox(
                              "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_New Tab State.jpg",
                              "Mobile mockup of the Men's Retro Pile Jacket PDP showing the new tab state."
                            )}
                          />
                        </div>
                      </div>
                      {/* State 2 */}
                      <div className="flex-1 bg-cream border border-[#ebebeb] rounded-2xl p-5 lg:p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-[16px] text-black">
                          <ol className="list-decimal font-semibold font-public-sans" start={2}>
                            <li className="ml-6">Exact 1:1 Match</li>
                          </ol>
                          <p className="font-normal">A used item matching gender, SKU, and size is available. The used tab surfaces the item with condition grade, price, available colors, and a direct path to Worn Wear.</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Perfect Match.jpg"
                            alt="Mobile mockup of the Shop Used component in the exact 1:1 match state. The 'Shop Used' tab is selected in the buying cluster, displaying 'Matching Used Options' with condition grade, pricing, and a Browse Used button. A Worn Wear marketing tile describes the Ironclad Guarantee."
                            className="w-full h-auto cursor-zoom-in object-contain"
                            onClick={() => openLightbox(
                              "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Perfect Match.jpg",
                              "Mobile mockup of the Shop Used component in the exact 1:1 match state."
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Row 2: States 3 & 4 */}
                    <div className="flex flex-col lg:flex-row gap-6 lg:items-stretch">
                      {/* State 3 */}
                      <div className="flex-1 bg-cream border border-[#ebebeb] rounded-2xl p-5 lg:p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-[16px] text-black">
                          <ol className="list-decimal font-semibold font-public-sans" start={3}>
                            <li className="ml-6">Similar Match</li>
                          </ol>
                          <p className="font-normal">Size is selected but no 1:1 match exists. Shows used options matching gender, product sub-category, and category — labeled &lsquo;Similar Used Options&rsquo; and framed as a curated recommendation, not a consolation.</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Similar Match.jpg"
                            alt="Mobile mockup of the Shop Used component in the similar match state. The 'Shop Used' tab is selected, displaying 'Similar Used Options' with two used product tiles side by side, each with a product name, strikethrough price, discounted price, and condition label."
                            className="w-full h-auto cursor-zoom-in object-contain"
                            onClick={() => openLightbox(
                              "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Similar Match.jpg",
                              "Mobile mockup of the Shop Used component in the similar match state."
                            )}
                          />
                        </div>
                      </div>
                      {/* State 4 */}
                      <div className="flex-1 bg-cream border border-[#ebebeb] rounded-2xl p-5 lg:p-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2 text-[16px] text-black">
                          <ol className="list-decimal font-semibold font-public-sans" start={4}>
                            <li className="ml-6">No Used Results</li>
                          </ol>
                          <p className="font-normal">For ineligible categories or zero inventory across all tiers, the component surfaces &lsquo;Why Buy Used?&rsquo; copy — maintaining program awareness and using an empty moment to educate rather than abandon.</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                          <img
                            src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_No Match.jpg"
                            alt="Mobile mockup of the Shop Used component in the no used results state. The 'Shop Used' tab is selected, displaying 'Why Buy Used?' copy with a Worn Wear logo badge and a Browse Used button."
                            className="w-full h-auto cursor-zoom-in object-contain"
                            onClick={() => openLightbox(
                              "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_No Match.jpg",
                              "Mobile mockup of the Shop Used component in the no used results state."
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 04 Test + Iterate */}
          <section id="test-iterate" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="TEST + ITERATE" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="MID-FI WIRES & PROTOTYPE" heading="Building fidelity for testing">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Before moving to testing, I developed mid-fi wireframes and an interactive prototype across all four component states for both mobile and desktop. The prototype was built to the fidelity needed to surface real usability issues with the component logic and interaction model, without the overhead of full visual design. This became the artifact used in the usability study.</p>
                  <OutlineButton
                    label="View Prototype"
                    href="https://www.figma.com/proto/Hsw0IeGOBL7Rf4sXxjyybC/Circularity_Shop-Used-PDP-Component?node-id=1-21045&p=f&viewport=1032%2C1263%2C0.13&t=cie1hoG59lsr2MZw-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A21045&show-proto-sidebar=1&page-id=1%3A9274"
                  />
                </div>
              </Card>

              <Card eyebrow="USABILITY TESTING" heading="Testing the component states with real customers">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>A planned usability study was scoped around three core goals:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Understand customer response to matching scenarios — perfect vs. similar — to support used recommendation logic</li>
                      <li>Understand how new vs. returning customer types engage with the component</li>
                      <li>Understand user purchasing behavior to inform UI for future integration work</li>
                    </ul>
                    <p>I designed and ran an unmoderated usability study with 10 participants — an even split of customers familiar and unfamiliar with Worn Wear. The test moved through four stages: first impressions on the PDP with the component, exploration of new and used options side by side, comparison questions, and open feedback. Synthesis surfaced four general themes:</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-medium mb-2">1. Motivation (to shop used):</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Navigation &amp; comparison: Customers want clear information and to compare new and used on the same page</li>
                        <li>Money savings: Cost savings drive shopping used — customers compare new vs. used pricing to assess value</li>
                        <li>Size importance: Customers will not compromise on size when buying used over new</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">2. Compromise (when shopping used):</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Different colors: 100% said they&apos;d consider the same style in a different color if their size was available</li>
                        <li>Similar styles: 100% would consider a similar style if their size was available and the product felt comparable</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">3. Trust (in buying used from Patagonia):</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Condition info: Customers prioritize condition details</li>
                        <li>Ironclad Guarantee: The Guarantee reassures customers when evaluating used items — and many didn&apos;t know it applied to used</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">4. Nice to Have:</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Stock notifications: Three customers mentioned they&apos;d appreciate in-stock notifications for used items</li>
                        <li>Trade-in awareness: Trade-In placed in proximity to Worn Wear content positively increased awareness of both programs</li>
                      </ul>
                    </div>
                  </div>
                  <OutlineButton
                    label="View Usability Findings Deck"
                    href="https://www.figma.com/proto/Hsw0IeGOBL7Rf4sXxjyybC/Circularity_Shop-Used-PDP-Component?node-id=3-41553&p=f&viewport=-2613%2C114%2C0.25&t=tREhvPICxl2uQ9AD-1&scaling=scale-down&content-scaling=fixed&page-id=3%3A41520"
                  />
                </div>
              </Card>

              {/* Two quotes side by side */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <QuoteCard
                  quote="If it's similar in style, who knows I might like it better — if the price is right, the color's right, the size is right, why not?"
                  source="PARTICIPANT IN USABILITY TESTING"
                />
                <QuoteCard
                  quote="I'm more likely to buy used when they are side by side like this and I don't have to go to the Worn Wear portion of the website."
                  source="PARTICIPANT IN USABILITY TESTING"
                />
              </div>

              <Card eyebrow="ITERATE" heading="One design change, driven by a clear insight">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p><span className="font-medium">Adding &lsquo;Select Your Size&rsquo; to Used Tab:</span> When a customer lands on the Used Tab in the PDP without selecting a size, the component was updated to actively prompt size selection. Because size is the most critical factor in surfacing a relevant used result, nudging customers to select their size earlier improves the quality of the used recommendation they see and reduces time spent in the lower-fidelity Similar Products state.</p>
                    <p>This change reflected the core insight directly: customers are open to similar items, but only if size is available. Getting size selection to happen earlier in the browsing flow meant more customers would see a higher-quality match — or know sooner that one wasn&apos;t available.</p>
                  </div>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_PDP.jpg"
                      alt="Desktop mockup of the Men's Retro Pile Jacket PDP with the Shop Used tab selected, displaying a used match with a 'Choose your size' prompt to help customers surface the most relevant used result."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => openLightbox(
                        "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_PDP.jpg",
                        "Desktop mockup of the Men's Retro Pile Jacket PDP with the Shop Used tab selected and 'Choose your size' prompt."
                      )}
                    />
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 05 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="DELIVER" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="STAKEHOLDER COLLABORATION" heading="Built across Patagonia, Trove, and multiple internal teams">
                This project required close partnership across Engineering, Merchandising, the Worn Wear team, Trove, and Brand Creative. I presented design directions and usability findings at leadership reviews throughout, and collaborated directly with Trove on ensuring the design could adapt to the technical realities of how Worn Wear inventory is structured and surfaced at scale.
              </Card>

              <Card eyebrow="HI-FI SPECS" heading="Full specifications across mobile and desktop">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>With the logic confirmed and the one design iteration resolved, I developed full hi-fi widget specifications for mobile and desktop — every component state, match scenario, copy need, and marketing tile variation documented. Spec files were organized around the size-selection decision point, with color-coded scenario branches making handoff clear for Engineering and Trove.</p>
                    <div>
                      <p className="font-medium mb-2">What I Delivered:</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Documented components</li>
                        <li>Hi-fi specs — mobile and desktop, all match states, copy needs, marketing tiles</li>
                        <li>Logic scenarios documentation — color-coded flow maps per match state for mobile and desktop</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <OutlineButton
                      label="View Mobile Specs"
                      href="https://www.figma.com/design/Hsw0IeGOBL7Rf4sXxjyybC/Circularity_Shop-Used-PDP-Component?node-id=1-9274"
                    />
                    <OutlineButton
                      label="View Desktop Specs"
                      href="https://www.figma.com/design/Hsw0IeGOBL7Rf4sXxjyybC/Circularity_Shop-Used-PDP-Component?node-id=1-36767"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Specs.jpg"
                      alt="Screenshot of hi-fi component specification documentation in Figma showing color-coded logic scenario flows for the Shop Used PDP component across mobile and desktop screens."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => openLightbox(
                        "/images/case-studies/patagonia-usedcomponent/Patagonia_Used Component_Specs.jpg",
                        "Screenshot of hi-fi component specification documentation in Figma showing color-coded logic scenario flows for the Shop Used PDP component."
                      )}
                    />
                  </div>
                </div>
              </Card>

              <Card eyebrow="UAT" heading="Catching issues before they reached customers">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The UAT period surfaced a set of issues requiring resolution before launch and a second set flagged as non-launch-blocking.</p>
                  <div>
                    <p className="font-medium mb-2">Resolved Pre-Launch:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Similar results not relevant — women&apos;s products rendering for men&apos;s items and vice versa</li>
                      <li>Color swatches intermittently not displaying on Shop Used tab</li>
                      <li>Product tile showing &lsquo;multiple sizes&rsquo; after size selection</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Post-Launch Fixes:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Mobile optimization — scroll required to see marketing tile</li>
                      <li>UI feedback — badge alignment, tile padding, no-match spacing</li>
                      <li>Similar result image cropping — isolated to dresses</li>
                    </ul>
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 06 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              {/* Stat row */}
              <div className="flex flex-col lg:flex-row border border-[#ebebeb] rounded-[16px] overflow-hidden">
                <div className="flex-1 bg-[#f8f6f4] flex flex-col items-center justify-center gap-4 p-8 border-b lg:border-b-0 lg:border-r border-[#ebebeb]">
                  <p className="font-poiret text-[32px] text-accent leading-[20px]">50×</p>
                  <p className="font-public-sans font-normal text-[14px] text-black text-center leading-[24px]">Used gear engagement growth — from 1% of PDP visitors clicking to WW, to 50% of component engagers continuing to shop used</p>
                </div>
                <div className="flex-1 bg-[#f8f6f4] flex flex-col items-center justify-center gap-4 p-8 border-b lg:border-b-0 lg:border-r border-[#ebebeb]">
                  <p className="font-poiret text-[32px] text-accent leading-[20px]">1.5×</p>
                  <p className="font-public-sans font-normal text-[14px] text-black text-center leading-[24px]">Component conversion vs. other WW sessions (2.45% vs. 1.94%)</p>
                </div>
                <div className="flex-1 bg-[#f8f6f4] flex flex-col items-center justify-center gap-4 p-8">
                  <p className="font-poiret text-[32px] text-accent leading-[20px]">33%</p>
                  <p className="font-public-sans font-normal text-[14px] text-black text-center leading-[24px]">Of plugin purchasers new to Patagonia DTC — component driving new customer acquisition</p>
                </div>
              </div>

              <Card eyebrow="BUSINESS IMPACT" heading="The component exceeded every success metric">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The Shop Used PDP component launched to Patagonia.com&apos;s highest-traffic surface and held mainline conversion. The launch contributed directly to Worn Wear&apos;s most successful Q1 to date: $3M in net merchandise value with relatively flat inventory levels — driven by increased awareness, traffic, and conversion from the component.</p>
                  <p>The component also proved its value as a customer acquisition tool: 41% more WW purchasers were new to Patagonia Direct year-over-year, with 33% of all used purchasers through the component being new to Patagonia DTC. The component traffic converts 32% higher than other sources.</p>
                </div>
              </Card>

              <Card eyebrow="LEARNINGS" heading="A Test & Learn phase that set up Full Integration">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The PDP component answered the foundational question — would customers engage with used options while shopping new — with a definitive yes. The 50x engagement increase is sustained performance across categories and seasons, representing a structural improvement in how resale integrates into the Patagonia shopping experience.</p>
                  <p>The most durable outcome: resale is now a first-class surface on Patagonia.com — not a detour. The test confirmed the design, the data validated the hypothesis, and the learnings directly shaped the Full Integration phase roadmap.</p>
                </div>
              </Card>

            </div>
          </section>

        </div>
      </div>

      {/* Footer nav */}
      <div id="footer-nav" className="border-t border-[#ebebeb] px-4 lg:px-12 py-12 flex items-center justify-between">
        <a href="/case-studies/navigation-redesign" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          PREVIOUS PROJECT
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="-rotate-90">
            <path d="M3 2L9 6L3 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          BACK TO TOP
        </button>
        <a href="/case-studies/happypillar" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          NEXT PROJECT
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 2L9 6L3 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <Footer />

      {lightbox && (
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  );
}

/* ── Sub-components ── */

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 font-poiret text-black leading-[20px]">
        <span className="text-[16px] tracking-[2px]">{number}</span>
        <span className="text-[28px] lg:text-[40px]">{title}</span>
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
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8 flex flex-col gap-6 overflow-hidden">
      <div className="flex flex-col gap-4 font-poiret not-italic">
        <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">{eyebrow}</p>
        {heading && <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">{heading}</h2>}
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
    <div className="flex-1 bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex gap-3 lg:gap-6 items-center">
        <div className="w-px self-stretch bg-[#ebebeb] shrink-0" />
        <div className="flex flex-col gap-4">
          <p className="font-public-sans font-extralight italic text-[16px] lg:text-[18px] text-black leading-[26px] lg:leading-[28px]">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="font-poiret text-[14px] text-accent tracking-[1.5px] leading-normal">
            - {source}
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
