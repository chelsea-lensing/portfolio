"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

const SECTIONS = [
  { id: "discovery",  number: "01", label: "Discovery" },
  { id: "mvp-scope",  number: "02", label: "MVP Scope" },
  { id: "research",   number: "03", label: "Research" },
  { id: "design",     number: "04", label: "Design" },
  { id: "deliver",    number: "05", label: "Deliver" },
  { id: "qa-uat",     number: "06", label: "QA + UAT" },
  { id: "results",    number: "07", label: "Results" },
];

export default function PatagoniaProvisionsPage() {
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

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="px-4 lg:px-12 pt-6 pb-4 flex items-center gap-2 font-poiret text-[16px] text-black leading-normal">
        <a href="/case-studies" className="hover:opacity-60 transition-opacity">CASE STUDIES</a>
        <span>›</span>
        <span>COMMERCE</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          PATAGONIA PROVISIONS INTEGRATION
        </h1>
        <p className="font-public-sans font-light italic text-[14px] lg:text-[16px] text-accent leading-[26px] tracking-[0.4px]">
          Live experience launching March 18, 2026
        </p>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          Bringing food into the core Patagonia.com commerce experience — balancing mission-driven storytelling, new product modeling, and cross-functional complexity across an 8-month end-to-end engagement.
        </p>
        <div>
          <a
            href="https://www.figma.com/proto/zStWb8SIf53O5xl973ltmf/Provisions-Integration?node-id=2012-291254&p=f&viewport=275%2C-138%2C0.13&t=slKAImnNdG9ijJgX-1&scaling=scale-down&content-scaling=fixed&page-id=3%3A5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-black text-white font-public-sans font-medium text-[14px] leading-[20px] px-6 py-[10px] rounded-full transition-colors hover:opacity-80"
          >
            View Prototype
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Metadata bar */}
      <div className="border-t border-b border-[#ebebeb] px-4 lg:px-12 py-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-poiret text-[12px] tracking-[1.5px] text-black">
          <span>LEAD UX DESIGNER</span>
          <span aria-hidden="true">•</span>
          <span>PATAGONIA</span>
          <span aria-hidden="true">•</span>
          <span>AUGUST 2025 - MARCH 2026</span>
          <span aria-hidden="true">•</span>
          <span>WEB/MOBILE</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] overflow-hidden">
        <img
          src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Hero.jpg"
          alt="Desktop and mobile views of the Provisions Smoked Wild Pink Salmon product detail page integrated into Patagonia.com, showing the Food & Beer navigation, multi-pack size selector, and lifestyle photography."
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setLightbox({
            src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Hero.jpg",
            alt: "Desktop and mobile views of the Provisions Smoked Wild Pink Salmon product detail page integrated into Patagonia.com, showing the Food & Beer navigation, multi-pack size selector, and lifestyle photography."
          })}
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

              <Card eyebrow="THE BRIEF" heading="Integrate Provisions into Patagonia.com for the first time — without losing what makes it distinct">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Patagonia Provisions had existed as a standalone ecommerce business at patagoniaprovisions.com. The goal was to migrate it into Patagonia.com — bringing food into the core commerce experience — while ensuring the integration would support a scalable, profitable business model and preserve Provisions&apos; unique brand identity and mission-driven storytelling.</p>
                  <p>The project required the integration to clearly communicate why Patagonia is in food, position Provisions credibly within the core product assortment, and do so in a way that was technically feasible and operationally sustainable across the combined business.</p>
                </div>
              </Card>

              <Card eyebrow="PROBLEM STATEMENT">
                Patagonia Provisions has operated as a standalone ecommerce business with significant awareness gaps and high operational costs — limiting its ability to scale. Meanwhile, Patagonia.com lacks a food presence despite the brand&apos;s deep commitment to regenerative agriculture. The two businesses exist in separate digital ecosystems, creating friction for customers, redundant overhead, and a missed opportunity to connect Patagonia&apos;s mission to something as fundamental as what we eat.
              </Card>

              <QuoteCard
                quote="To me, Provisions is more than just another business venture. It's a matter of human survival."
                source="YVON CHOUINARD"
                footnote={
                  <p className="font-public-sans font-normal italic text-[14px] lg:text-[16px] text-black leading-[24px]">
                    In September 2025, the New York Times profiled Patagonia Provisions and the question at the heart of this project:{" "}
                    <a
                      href="https://www.nytimes.com/2025/09/07/business/patagonia-provisions-dirtbag-billionaire.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      Patagonia Changed the Apparel Business. Can It Change Food, Too?
                    </a>
                  </p>
                }
              />

            </div>
          </section>

          {/* 02 MVP Scope */}
          <section id="mvp-scope" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="MVP SCOPE" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="BUSINESS REQUIREMENTS">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>During a three day on-site, I worked alongside Product, Technology, and the Provisions business team to map 15 distinct business requirements spanning navigation, PDPs, search, cart/checkout, order history, and more — each with defined success criteria and cross-team dependencies.</p>
                  <div>
                    <p className="font-medium mb-2">Key Business Requirement Areas for UX:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Navigation integration</li>
                      <li>PDP requirements for food storytelling</li>
                      <li>Handling of non-sellable products like beer</li>
                      <li>Mixed cart functionality</li>
                    </ul>
                  </div>
                </div>
              </Card>


            </div>
          </section>

          {/* 03 Research */}
          <section id="research" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="RESEARCH" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8 flex flex-col gap-6">
                <div className="flex flex-col gap-4 font-poiret not-italic">
                  <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">CUSTOMER PERSONAS</p>
                  <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">Two distinct target consumers to anchor design decisions</h2>
                </div>
                <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  The target customer was defined as the &ldquo;Organic Outdoor Enthusiast&rdquo; — people who buy Patagonia apparel and purchase 40%+ natural/organic groceries. Two personas were shared by the Provisions team to help support the integration work.
                </p>
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  <div className="flex-1 min-w-0 rounded-lg overflow-hidden aspect-[433/263]">
                    <img
                      src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Customer1.jpg"
                      alt="Persona diagram for the Growth Consumer — The Organic Outdoor Enthusiast: Start-up Families. Active Millennial parents who prioritize health, wellness, and sustainable food choices for their families."
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setLightbox({
                        src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Customer1.jpg",
                        alt: "Persona diagram for the Growth Consumer — The Organic Outdoor Enthusiast: Start-up Families. Active Millennial parents who prioritize health, wellness, and sustainable food choices for their families."
                      })}
                    />
                  </div>
                  <div className="flex-1 min-w-0 rounded-lg overflow-hidden aspect-[433/263]">
                    <img
                      src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Customer2.jpg"
                      alt="Persona diagram for the Seafood Cohort — The Organic Outdoor Enthusiast: Young Transitionals. Active young adults (18–34) who prioritize health, wellness, and seeking out new food experiences."
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setLightbox({
                        src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Customer2.jpg",
                        alt: "Persona diagram for the Seafood Cohort — The Organic Outdoor Enthusiast: Young Transitionals. Active young adults (18–34) who prioritize health, wellness, and seeking out new food experiences."
                      })}
                    />
                  </div>
                </div>
              </div>

              <Card eyebrow="COMPETITIVE RESEARCH">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>To establish a design foundation grounded in industry patterns and emerging best practices, I conducted a competitive landscape analysis across direct food-brand comparators. Brands analyzed included Graza, Heyday Canning Co, Ayoh!, Fishwife, CABI, King Arthur — evaluated across four surfaces directly mirroring Provisions&apos; design scope: Home/Landing Page, PLP, PDP, and Recipes.</p>
                    <p>Key patterns that directly informed design decisions: food-brand PDPs consistently prioritize lifestyle photography before product specs; recipe content is a high-trust bridge to purchase; brand story modules work best when integrated into the product page rather than siloed in a separate &ldquo;about&rdquo; section.</p>
                  </div>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Landscape.jpg"
                      alt="Competitive landscape analysis across food brands including Graza, Heyday, CABI, and King Arthur — showing annotated screenshots of their PDPs and landing pages with observations on how each brand handles sourcing information, storytelling, and ingredient transparency."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => setLightbox({
                        src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Landscape.jpg",
                        alt: "Competitive landscape analysis across food brands including Graza, Heyday, CABI, and King Arthur — showing annotated screenshots of their PDPs and landing pages with observations on how each brand handles sourcing information, storytelling, and ingredient transparency."
                      })}
                    />
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 04 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="INFORMATION ARCHITECTURE" heading="An integration structure designed for discoverability, education, and future scale">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>Provisions had to live meaningfully within Patagonia.com&apos;s existing taxonomy while establishing its own browsable identity. The IA covered Provisions&apos; integration across the full site — navigation entry points, landing page structure, PLP hierarchy, PDP content architecture, search behavior, store locator, cart/checkout flows, account/order history and added stories and recipes.</p>
                    <p>Key structural decisions: Provisions would live under a dedicated &ldquo;Food &amp; Beer&rdquo; category within Patagonia.com&apos;s primary navigation, with the Provisions landing page serving as the brand entry point. PLPs would use Patagonia&apos;s existing product listing infrastructure with Provisions-tailored filter logic. PDPs required a new content model to support recipe content, sourcing story, and multi-pack variants.</p>
                  </div>
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_IA.jpg"
                      alt="Information architecture diagram showing Provisions integration across the full Patagonia.com site — navigation entry points, landing page structure, PLP hierarchy, PDP content architecture, and more."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => setLightbox({
                        src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_IA.jpg",
                        alt: "Information architecture diagram showing Provisions integration across the full Patagonia.com site — navigation entry points, landing page structure, PLP hierarchy, PDP content architecture, and more."
                      })}
                    />
                  </div>
                  <OutlineButton
                    label="View Provisions IA"
                    href="https://www.figma.com/design/zStWb8SIf53O5xl973ltmf/Provisions-Integration?node-id=3-2"
                  />
                </div>
              </Card>

              <Card eyebrow="LO-FI WIREFRAMES" heading="Seven surface areas wireframed across the full customer journey">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>Lo-fi wireframes were developed and iterated on based on cross-functional feedback. The wireframe set covered the full scope of Provisions integration surfaces:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Landing Page: brand storytelling, best sellers, category navigation, recipe entry points</li>
                      <li>Product Listing Page: Provisions category browsing with food-appropriate filter logic</li>
                      <li>Navigation &amp; Discovery: search integration</li>
                      <li>Product Detail Page: food product detail page with recipe content, sourcing story, multi-pack variants</li>
                      <li>Store Locator: where to find Provisions products in retail</li>
                      <li>Cart &amp; Checkout: mixed cart experience (food + apparel), food-specific checkout edge cases</li>
                      <li>Account / Order History: order visibility and return flows for Provisions purchases</li>
                    </ul>
                  </div>
                  <OutlineButton
                    label="View Lo-Fi Wireframes"
                    href="https://www.figma.com/design/zStWb8SIf53O5xl973ltmf/Provisions-Integration?node-id=2002-223854&t=LT94CvYHbOWtq5PO-1"
                  />
                </div>
              </Card>

              <Card eyebrow="STORYTELLING" heading={`Designing for "why" across every surface`}>
                <div className="flex flex-col gap-8 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-2">
                    <p>A clear directive from Ryan, Patagonia&apos;s CEO, shaped the design from the start: the integration couldn&apos;t just sell food — it had to explain why Patagonia is making food, and why each specific product exists.</p>
                    <p>I translated this into intentional storytelling touchpoints across three surfaces:</p>
                  </div>
                  <div className="flex flex-col gap-10">
                    <div className="flex flex-col">
                      <div className="font-medium mb-1">1. Navigation</div>
                      <div className="text-[14px] leading-[22px] mb-2">A link to Yvon Chouinard&apos;s &ldquo;Why Food?&rdquo; essay was surfaced directly within the Food &amp; Beer navigation, giving customers access to the founding mission before they&apos;d even landed on a product.</div>
                      <div className="rounded-lg overflow-hidden w-full">
                        <img
                          src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Navigation.jpg"
                          alt="Desktop and mobile views of the Food & Beer navigation on Patagonia.com, showing a dedicated 'Learn More' column with links to Why Food?, Our Impact, Sourcing Practices, Stories, and Recipes — alongside an editorial marketing tile asking 'Why is a clothing company making food?' linking to Yvon Chouinard's essay."
                          className="block w-full h-auto cursor-zoom-in"
                          onClick={() => setLightbox({
                            src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Navigation.jpg",
                            alt: "Desktop and mobile views of the Food & Beer navigation on Patagonia.com, showing a dedicated 'Learn More' column with links to Why Food?, Our Impact, Sourcing Practices, Stories, and Recipes — alongside an editorial marketing tile asking 'Why is a clothing company making food?' linking to Yvon Chouinard's essay."
                          })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium mb-1">2. Landing Page</div>
                      <div className="text-[14px] leading-[22px] mb-2">The Provisions landing experience was designed to answer &ldquo;why Patagonia is in food&rdquo; as part of the core page architecture, not tucked away in an about section.</div>
                      <div className="rounded-lg overflow-hidden w-full">
                        <img
                          src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Landing Page.jpg"
                          alt="Desktop and mobile views of the Provisions landing page featuring the 'Why is a clothing company making food?' editorial module — a full-bleed photo of Yvon Chouinard in his workshop alongside mission-driven copy explaining why Patagonia makes food, with a quote from Chouinard and a call to action to explore."
                          className="block w-full h-auto cursor-zoom-in"
                          onClick={() => setLightbox({
                            src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Landing Page.jpg",
                            alt: "Desktop and mobile views of the Provisions landing page featuring the 'Why is a clothing company making food?' editorial module — a full-bleed photo of Yvon Chouinard in his workshop alongside mission-driven copy explaining why Patagonia makes food, with a quote from Chouinard and a call to action to explore."
                          })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium mb-1">3. PDP</div>
                      <div className="text-[14px] leading-[22px] mb-2">A new content block was introduced on each product detail page to tell the story of why we&apos;re making this specific product. This was net-new to the Patagonia PDP template.</div>
                      <div className="rounded-lg overflow-hidden w-full">
                        <img
                          src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_PDP.jpg"
                          alt="Desktop and mobile views of the Spicy Mussels product detail page on Patagonia.com, highlighting the new 'Why Mussels?' content block — a dark full-width module explaining the sourcing story and environmental benefits of mussel farming, with links to read more and watch a mussel story video."
                          className="block w-full h-auto cursor-zoom-in"
                          onClick={() => setLightbox({
                            src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_PDP.jpg",
                            alt: "Desktop and mobile views of the Spicy Mussels product detail page on Patagonia.com, highlighting the new 'Why Mussels?' content block — a dark full-width module explaining the sourcing story and environmental benefits of mussel farming, with links to read more and watch a mussel story video."
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card eyebrow="FINAL DESIGN" heading="The Provisions integrated experience — commerce and mission in balance">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The final design brought together discovery insights, IA decisions, and cross-functional requirements into a cohesive Provisions experience within Patagonia.com. I created a high-fidelity prototype to conduct walkthroughs with executive leadership — including the VP, CEO, CTO, and CFO — securing final sign-off and buy-in to move the project into development.</p>
                  <OutlineButton
                    label="View Prototype"
                    href="https://www.figma.com/proto/zStWb8SIf53O5xl973ltmf/Provisions-Integration?node-id=2012-291254&p=f&viewport=275%2C-138%2C0.13&t=slKAImnNdG9ijJgX-1&scaling=scale-down&content-scaling=fixed&page-id=3%3A5"
                  />
                </div>
              </Card>

            </div>
          </section>

          {/* 05 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="DELIVER" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="HANDOFF & SPECS" heading="From design to development — specs built for a complex integration">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-4">
                    <p>The Figma spec set for Provisions was one of the most comprehensive I&apos;ve produced — covering a new product category across the full purchase journey, integrated into an existing design system that was not originally built with food in mind.</p>
                    <p>The spec documentation included all new component states, interaction annotations, and product-type-specific variations (e.g., multi-pack variants, non-sellable beer SKU handling, mixed cart edge cases).</p>
                  </div>
                  <OutlineButton
                    label="Figma Spec Documentation"
                    href="https://www.figma.com/design/zStWb8SIf53O5xl973ltmf/Provisions-Integration?node-id=3-10"
                  />
                  <div className="rounded-lg overflow-hidden w-full">
                    <img
                      src="/images/case-studies/patagonia-provisions/Patagonia_Provisions_Specs.jpg"
                      alt="Annotated Figma spec for the Provisions Food & Beer PLP showing mobile and desktop layouts with detailed callouts for filter logic, product type display names, hover functionality, image guidance, and merch notes for the 'Why is a Clothing Company Making Food?' editorial tile."
                      className="w-full h-auto cursor-zoom-in"
                      onClick={() => setLightbox({
                        src: "/images/case-studies/patagonia-provisions/Patagonia_Provisions_Specs.jpg",
                        alt: "Annotated Figma spec for the Provisions Food & Beer PLP showing mobile and desktop layouts with detailed callouts for filter logic, product type display names, hover functionality, image guidance, and merch notes for the 'Why is a Clothing Company Making Food?' editorial tile."
                      })}
                    />
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 06 QA + UAT */}
          <section id="qa-uat" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="QA + UAT" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="QA CYCLE" heading="Sustained collaboration through the full development and QA cycle">
                Rather than stepping back at handoff, I stayed involved through the build to review the staging experience against design specs. This included identifying a critical product image cropping and zoom issue that was causing poor customer experience — caught and resolved before launch through close collaboration with the development team and a third-party image editing partner.
              </Card>

            </div>
          </section>

          {/* 07 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="BUSINESS IMPACTS" heading="A foundation for Provisions to grow from $2M to $5–8M annually">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The Provisions integration will go live on March 18, 2026 — marking the first time food products will be available for purchase within the core Patagonia.com experience. The integration establishes a scalable commerce foundation for Provisions&apos; long-term growth within the Patagonia digital ecosystem.</p>
                  <p className="italic">*Results will be added post launch.</p>
                </div>
              </Card>

            </div>
          </section>

        </div>
      </div>

      {/* Footer nav */}
      <div id="footer-nav" className="border-t border-[#ebebeb] px-4 lg:px-12 py-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          PREVIOUS PROJECT
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity cursor-pointer"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-90">
            <path d="M3 2L9 6L3 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function QuoteCard({ quote, source, footnote }: { quote: string; source: string; footnote?: ReactNode }) {
  return (
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8 flex flex-col gap-6">
      <div className="flex gap-3 lg:gap-6 items-center">
        <div className="w-px self-stretch bg-[#ebebeb] shrink-0" />
        <div className="flex flex-col gap-4">
          <p className="font-public-sans font-extralight italic text-[16px] lg:text-[20px] text-black leading-[26px] lg:leading-[30px]">
            &ldquo;{quote}&rdquo;
          </p>
          <p className="font-poiret text-[14px] text-accent tracking-[1.5px] leading-normal">
            - {source}
          </p>
        </div>
      </div>
      {footnote && <div>{footnote}</div>}
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
