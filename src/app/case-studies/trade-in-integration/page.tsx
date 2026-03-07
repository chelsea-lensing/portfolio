"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

const SECTIONS = [
  { id: "discovery",    number: "01", label: "Discovery" },
  { id: "research",     number: "02", label: "Research" },
  { id: "hypothesis",   number: "03", label: "Hypothesis" },
  { id: "design",       number: "04", label: "Design" },
  { id: "test-iterate", number: "05", label: "Test + Iterate" },
  { id: "deliver",      number: "06", label: "Deliver" },
  { id: "results",      number: "07", label: "Results" },
];

export default function TradeInIntegrationPage() {
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
        <span>CIRCULARITY</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          Trade In Integration
        </h1>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          Migrating Patagonia&apos;s Trade-In program from a standalone WornWear.com experience to the main Patagonia.com shopping ecosystem — leading to a 1.5x increase in overall trade-in orders submitted, setting up the brand for future used product integration on the website.
        </p>
        <div>
          <a
            href="https://www.patagonia.com/trade-in/"
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
          <span>JANUARY - JULY 2025</span>
          <span aria-hidden="true">•</span>
          <span>WEB / MOBILE</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] overflow-hidden">
        <img
          src="/images/case-studies/patagonia-tradein/Patagonia_Trade In_Hero.jpg"
          alt="Image of a desktop and mobile mockup within the trade in flow. The desktop image is of the trade in landing page, showing three tabs under the Heading: Trade in your used Patagonia gear and Subheading: We'll buy back gently used Patagonia clothing and packs so they stay in play and out of the landfill. The three tabs below that are: 'Online', 'In Store' and 'Your Trade-In'. The 'Online' tab is selected and below that it says 'Trade in by mail. Take our quiz to see if your gear is eligible. If it's a go, print the $7 shipping label and mail your item(s) back to us. Every eligible item earns you credit to use in-store or at Wornwear.com or Patagonia.com.' Below that there is a button that says 'Start Your Trade-In'. The mobile image is an image of a mock up of Step 2 in the Trade In eligibility quiz."
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setLightbox({
            src: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Hero.jpg",
            alt: "Image of a desktop and mobile mockup within the trade in flow. The desktop image is of the trade in landing page, showing three tabs under the Heading: Trade in your used Patagonia gear and Subheading: We'll buy back gently used Patagonia clothing and packs so they stay in play and out of the landfill. The three tabs below that are: 'Online', 'In Store' and 'Your Trade-In'. The 'Online' tab is selected and below that it says 'Trade in by mail. Take our quiz to see if your gear is eligible. If it's a go, print the $7 shipping label and mail your item(s) back to us. Every eligible item earns you credit to use in-store or at Wornwear.com or Patagonia.com.' Below that there is a button that says 'Start Your Trade-In'. The mobile image is an image of a mock up of Step 2 in the Trade In eligibility quiz."
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

              <Card eyebrow="THE BRIEF" heading="Bring circularity to the center of how customers shop on Patagonia.com">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Patagonia&apos;s Trade-In program had lived on WornWear.com since its inception — a separate site, a separate mental model, a separate journey. For customers who discovered Patagonia through the main site, trade-in was effectively invisible. Phase 2 of Patagonia&apos;s circularity initiative set out to change that.</p>
                  <p>The goal was to migrate the Trade-In experience to Patagonia.com and meaningfully improve it — giving customers the ability to get an estimate before mailing or bringing gear to a store, trade in directly from past purchases in their account history, and track trade-in orders alongside their regular shopping.</p>
                </div>
              </Card>

              <Card eyebrow="STRATEGIC CONTEXT" heading="Part of a larger circularity vision">
                This project sat within a broader strategic shift: building a brand ecosystem where circular services — repair, resale, trade-in — aren&apos;t peripheral programs but core to how customers engage with the brand over time. Trade-in integration was identified as a key differentiator for driving retention, with data showing that customers who redeem trade-in credits spend roughly double the value of the gift card — the highest redemption lift of any type of merch credit.
              </Card>

              <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] overflow-hidden flex flex-col">
                <div className="px-4 pt-6 lg:px-8 lg:pt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4 font-poiret not-italic">
                    <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">UNDERSTANDING THE BEFORE STATE</p>
                    <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">What the WornWear.com experience revealed</h2>
                  </div>
                  <div className="flex flex-col gap-3 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                    <p>Before defining the new experience, I grounded the work in what we knew about the existing trade-in flow on WornWear.com.</p>
                    <p className="font-medium">Key structural gaps:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>No way to access trade-in from Patagonia.com — customers had to know WornWear existed</li>
                      <li>No item lookup by order history — customers had to locate their own style numbers</li>
                      <li>No way to track trade-in status within an account</li>
                      <li>Eligibility criteria were unclear before starting, leading to high rejection rates (35% digital, up to 50% in-store)</li>
                      <li>Shipping label printing was a recurring friction point</li>
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-4 lg:p-8">
                  <img
                    src="/images/case-studies/patagonia-tradein/Patagonia_Trade In_Current Exp.jpg"
                    alt="Screenshots of the Trade In experience on wornwear.com before integration"
                    className="w-full h-auto rounded-lg cursor-zoom-in"
                    onClick={() => setLightbox({
                      src: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Current Exp.jpg",
                      alt: "Screenshots of the Trade In experience on wornwear.com before integration"
                    })}
                  />
                </div>
              </div>

            </div>
          </section>

          {/* 02 Research */}
          <section id="research" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="RESEARCH" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="PRE-INTEGRATION SURVEY" heading="Benchmarking the current experience before redesigning it">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>In parallel with design, Patagonia&apos;s Customer &amp; Market Insights team ran a survey on the existing WornWear.com trade-in experience from February to March 2025 — capturing data at four touchpoints: confirmation, received, accepted, and rejected. 99% of respondents had made multiple Patagonia purchases. This was our pre-integration baseline — directly informing which problems the new design needed to solve.</p>
                  <div>
                    <p className="font-medium mb-2">Key Findings</p>
                    <ol className="list-decimal ml-6 flex flex-col gap-2 leading-[28px]">
                      <li>69% completely confident after initiating — but shipping label printing was the single biggest confidence-killer</li>
                      <li>78% of accepted users said they&apos;d trade in again vs. only 16% of rejected users. Rejection language was vague — customers wanted to understand why, not just that their item wasn&apos;t accepted.</li>
                      <li>Style numbers were a major friction point. Users had difficulty finding them, some with worn or unreadable labels. The WW experience provided no guidance.</li>
                      <li>Environment (61%) and trust in Patagonia (59%) were the top motivations. Convenience ranked last at 32%. This shaped how we framed the experience: values-forward, not transactional.</li>
                    </ol>
                  </div>
                </div>
              </Card>

              <Card eyebrow="COMPETITIVE & LANDSCAPE ANALYSIS" heading="Best-in-class trade-in and resale experiences">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>I built a best-in-class landscape board spanning trade-in programs, resale platforms, and eligibility quiz patterns to identify design conventions customers already understood, and opportunities where Patagonia could do meaningfully better. This informed early structural decisions about the quiz format, landing page layout, and how to handle ineligible outcomes.</p>
                  <OutlineButton
                    label="View Landscape Analysis"
                    href="https://www.figma.com/design/Ja9V1DlOXAzittQ507EyF1/Trade-In-Integration?node-id=2001-554&t=MgUh421Z4qzD1x1j-1"
                  />
                </div>
              </Card>

            </div>
          </section>

          {/* 03 Hypothesis */}
          <section id="hypothesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="HYPOTHESIS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="PROBLEM STATEMENT" heading="Trade-in was invisible to most Patagonia customers — and confusing to the ones who found it">
                Patagonia&apos;s trade-in program lived on a separate site, making it effectively invisible to customers most likely to use it. For those who did find WornWear.com, the experience lacked the guardrails to set expectations and reduce rejection: no upfront eligibility guidance, no style number help, no way to track progress or return to an in-progress trade-in, and unclear post-rejection communication that damaged loyalty.
              </Card>

              <Card eyebrow="DESIGN HYPOTHESIS" heading="If we make trade-in native to Patagonia.com, more customers will engage — and succeed">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>By integrating trade-in directly into Patagonia.com with a guided eligibility quiz, multiple access points (navigation, account, footer), and a dedicated trade-in order history in account, customers would be able to discover, complete, and track trade-ins without friction. A better-qualified funnel — not just more volume — would reduce rejection rates and build repeat trade-in behavior.</p>
                  <div>
                    <p className="font-medium mb-2">Success Measures Defined:</p>
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>20% increase in average monthly digital trade-ins (translating to ~11k unit annualized inventory increase)</li>
                      <li>Reduce digital rejection rate from 35% → 15% through improved UX with eligibility quiz</li>
                      <li>~$0.9M in projected incremental annual sales (assuming 90% sell-through)</li>
                    </ul>
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 04 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="INFORMATION ARCHITECTURE" heading="Entry points, landing page, and quiz architecture">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The new experience supports three distinct entry points: search, a footer link (&lsquo;Trade In, Get Credit&rsquo;), and a navigation text link. Each leads to the Trade-In landing page, designed around two parallel funnels: online mail-in and in-store.</p>
                  <p>
                    The eligibility quiz architecture was the most technically complex design challenge — handling two item lookup methods, five condition questions, three types of ineligible outcomes with contextual off-ramps, and an eligible path through to a trade-in bag, checkout, and confirmation. I mapped every state and branch into{" "}
                    <a
                      href="https://www.figma.com/board/r4c93g3Hb96TzyjQY32TzL/Trade-In-Integration?node-id=1-22&t=Ju2LdmVsrJ9Dag28-1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      detailed decision tree documentation
                    </a>
                    {" "}before moving to wireframes.
                  </p>
                </div>
              </Card>

              <Card eyebrow="LO-FI WIREFRAMES" heading="From structure to flow">
                Starting from napkin sketches and decision trees, I developed lo-fi wireframes covering the full end-to-end scope: the Trade-In landing page (online and in-store tabs), the eligibility quiz (all states and branches), the Trade-In bag, checkout, confirmation, and trade-in order history in account. The lo-fi phase was about stress-testing information hierarchy and flow logic before investing in visual execution.
              </Card>

              <Card eyebrow="KEY DESIGN DECISIONS" heading="What the design had to get right">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  {[
                    {
                      title: "Dual-funnel landing page:",
                      body: "The landing page was designed around two tabs — Online and In Store — giving customers immediate clarity about which path applied to them. Both tabs share a common structure: eligibility, estimated trade-in value, and a step-by-step process, with the online tab leading directly into the quiz.",
                    },
                    {
                      title: "Account integration for item lookup:",
                      body: "Rather than requiring customers to know their style number, the quiz offered a second entry: logging into account and selecting from order history. For eligible items, clicking 'Start a Trade-In' carries the product image, name, and estimated credit directly into step 2 of the quiz — dramatically reducing manual input friction.",
                    },
                    {
                      title: "Ineligible outcome off-ramps:",
                      body: "Rather than dead-ending customers whose items didn't qualify, the ineligible result screen provided contextual alternatives: repair services, donation options, in-store recycling with a store locator link, and the ability to add another item. This directly addressed the survey finding that rejected customers felt abandoned.",
                    },
                    {
                      title: "Trade-In order history in account:",
                      body: "A new 'Trade-In Orders' tab in account order history gave customers a dedicated place to track trade-in status, reprint shipping labels, and see credit amounts once issued. This closed the loop on a gap the WW survey had clearly surfaced: no reliable way to track what happened after mailing an item.",
                    },
                    {
                      title: "Estimated trade-in value, upfront:",
                      body: "Both landing page paths surface estimated credit ranges before any commitment is made. This transparency, absent in the previous experience, was designed to set expectations and reduce disappointment downstream.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <p><span className="font-medium">{i + 1}. {item.title}</span></p>
                      <p>{item.body}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] overflow-hidden flex flex-col">
                <div className="px-4 pt-6 lg:px-8 lg:pt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4 font-poiret not-italic">
                    <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">MID-FI WIRES &amp; PROTOTYPE</p>
                    <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">Building fidelity for testing</h2>
                  </div>
                  <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">With the lo-fi structure validated internally, I developed mid-fi wireframes and an interactive prototype across the full trade-in flow — landing page, eligibility quiz (all paths), trade-in bag, checkout, confirmation, and account trade-in history. The prototype was built to the fidelity needed to surface real usability issues: enough detail to feel like a real product, without the overhead of full visual design. This became the artifact used for usability testing.</p>
                </div>
                <div className="px-4 py-4 lg:p-8">
                  <img
                    src="/images/case-studies/patagonia-tradein/Patagonia_Trade In_Wireframes.jpg"
                    alt="Screenshot of a section of the mid fidelity wireframes."
                    className="w-full h-auto rounded-lg cursor-zoom-in"
                    onClick={() => setLightbox({
                      src: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Wireframes.jpg",
                      alt: "Screenshot of a section of the mid fidelity wireframes."
                    })}
                  />
                </div>
              </div>

            </div>
          </section>

          {/* 05 Test + Iterate */}
          <section id="test-iterate" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="TEST & ITERATE" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="USABILITY TESTING" heading="Validating the prototype before development handoff">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <div className="flex flex-col gap-3">
                    <p>I ran an unmoderated usability test on the mobile prototype with 5 participants — following the 5-user rule for identifying the majority of usability issues. 60% knew that Patagonia offered trade-ins before the test. Participants completed four tasks: find Trade-In, start a trade-in without completing checkout, browse jackets, then return to trade-in and complete checkout.</p>
                    <p>Synthesis combined quantitative survey ratings with qualitative affinity mapping of session recordings, surfacing five themes:</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        title: "Finding the Trade-In Program:",
                        body: "Most users looked for trade-in in the navigation first, with some expecting it on the homepage or footer. Despite variation in approach, users found it easy to locate. 80% rated discovery as 'very easy' (5/5).",
                      },
                      {
                        title: "Landing Page First Impressions:",
                        body: "Users found the page well-organized, clear, and informative. One issue surfaced: the term 'prepaid shipping label' was perceived as misleading since the cost is deducted from trade-in credit. → Removed 'prepaid' from the label language.",
                      },
                      {
                        title: "Understanding Eligibility:",
                        body: "The quiz was perceived as simple and intuitive. 100% of participants rated determining eligibility as 'very easy.' Some wanted more clarity on specific deal-breakers like missing size tags.",
                      },
                      {
                        title: "Returning to the Trade-In:",
                        body: "Several users struggled to find their Trade-In bag after navigating away — often checking the shopping cart first. 80% ultimately rated returning as easy (4/5), but the friction was real enough to warrant follow-up action.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        <p><span className="font-medium">{i + 1}. {item.title}</span></p>
                        <p>{item.body}</p>
                      </div>
                    ))}
                  </div>
                  <OutlineButton
                    label="Usability Test Results Deck"
                    href="https://www.figma.com/proto/Ja9V1DlOXAzittQ507EyF1/Trade-In-Integration?node-id=2001-1037&viewport=544%2C335%2C0.13&t=9WAT2kCe6AjIMUe6-1&scaling=min-zoom&content-scaling=fixed&page-id=2001%3A1028"
                  />
                </div>
              </Card>

              <QuoteCard
                quote="It was very easy to understand if my item was eligible for trade in."
                source="PARTICIPANT IN USABILITY TESTING"
              />

              <Card eyebrow="ITERATE — TERMINOLOGY SURVEY" heading="One finding led directly to a follow-up study">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Theme Four surfaced a naming problem: &lsquo;Trade-In Bag&rsquo; — the label for the in-progress trade-in cart — caused confusion. Some users thought it referred to a physical mailing bag. Rather than make an internal judgment call, I ran a 30-participant terminology survey on UserTesting.com to test four options.</p>
                  <p>&lsquo;My Trade-In&rsquo; won with 43.3% of participants — nearly double the next choice (Trade-In Cart at 26.7%). The name was updated before handoff. This detail matters: it&apos;s the persistent navigation element customers use to return to an in-progress trade-in, and getting it wrong would have caused ongoing drop-off.</p>
                </div>
              </Card>

              <SideBySideCard
                eyebrow="RESEARCH → DESIGN TRACEABILITY"
                heading="Closing the loop between research and design changes"
                image={{
                  src: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_StyleNum.jpg",
                  alt: "An image of two screens: 1. Trade In step 1 page where the user can either look up their style number or search from their order history. 2. Order status page where eligible items have a 'Start a Trade In' text link next to them.",
                  aspect: "aspect-square",
                }}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              >
                <div className="flex flex-col gap-4">
                  <p>The WornWear.com baseline survey surfaced two friction areas the new design directly addressed:</p>
                  <ol className="list-decimal ml-6 flex flex-col gap-2 leading-[28px]">
                    <li><span className="font-medium">Shipping label printing:</span> The new experience enables label printing from both the order confirmation page and Trade-In order history — the two moments customers need it most.</li>
                    <li><span className="font-medium">Style number difficulty:</span> The quiz provides a &lsquo;how to find your style number&rsquo; modal, and the account-based lookup eliminates the need to locate it at all for returning customers.</li>
                  </ol>
                  <p>This research-to-design traceability was shared in leadership reviews — showing explicitly how the new experience addressed documented customer pain points from the live experience.</p>
                </div>
              </SideBySideCard>

            </div>
          </section>

          {/* 06 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="DELIVER" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] overflow-hidden flex flex-col">
                <div className="px-4 pt-6 lg:px-8 lg:pt-8 flex flex-col gap-6">
                  <div className="flex flex-col gap-4 font-poiret not-italic">
                    <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">DELIVERABLES</p>
                    <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">What I produced for handoff and launch</h2>
                  </div>
                  <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                    <ul className="list-disc ml-6 leading-[28px]">
                      <li>Full Figma spec documentation — mobile and desktop</li>
                      <li>Annotated interaction behaviors for all component states</li>
                      <li>Decision tree documentation for quiz branching logic</li>
                      <li>Eligible and ineligible outcome flows</li>
                      <li>Account integration specs (order history, trade-in tab)</li>
                    </ul>
                    <div className="flex flex-wrap gap-3">
                      <OutlineButton
                        label="Mobile Specs"
                        href="https://www.figma.com/design/Ja9V1DlOXAzittQ507EyF1/Trade-In-Integration?node-id=2001-99019&t=MgUh421Z4qzD1x1j-1"
                      />
                      <OutlineButton
                        label="Desktop Specs"
                        href="https://www.figma.com/design/Ja9V1DlOXAzittQ507EyF1/Trade-In-Integration?node-id=3-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-6 lg:p-8">
                <img
                  src="/images/case-studies/patagonia-tradein/Patagonia_Trade In_Handoff.jpg"
                  alt="Image of 4 screens of the mobile trade-in experience: 1. Navigation Menu with 'Trade In. Get Credit' added. 2. Trade In landing page. 3. Step 2 of the Trade In eligibility quiz. 4. Order History page in account tabbed to new 'Trade-in Orders' tab showing past trade-ins submitted."
                  className="w-full h-auto rounded-lg cursor-zoom-in"
                  onClick={() => setLightbox({
                    src: "/images/case-studies/patagonia-tradein/Patagonia_Trade In_Handoff.jpg",
                    alt: "Image of 4 screens of the mobile trade-in experience: 1. Navigation Menu with 'Trade In. Get Credit' added. 2. Trade In landing page. 3. Step 2 of the Trade In eligibility quiz. 4. Order History page in account tabbed to new 'Trade-in Orders' tab showing past trade-ins submitted."
                  })}
                />
                </div>
              </div>

              <Card eyebrow="QA & MONITORING" heading="Ensuring quality through launch and beyond">
                I led design QA in the staging environment before moving to UAT, catching outstanding UI bugs and issues requiring UX sign-off before Business stakeholder approval. Post-launch, performance monitoring tracked trade-in volumes, rejection rates, and customer contacts.
              </Card>

            </div>
          </section>

          {/* 07 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              {/* Metrics row */}
              <div className="flex flex-col lg:flex-row">
                {[
                  { value: "3×",    label: "Increase in trade-in page visitors since launch (57k vs. 17k pre-launch avg)" },
                  { value: "28%",   label: "Reduction in digital rejection rate post-launch (35% → 25%, with a goal of reaching 15%)" },
                  { value: "1.5×",  label: "Increase in overall trade-in orders submitted (initial readings)" },
                ].map((m, i, arr) => (
                  <div
                    key={m.value}
                    className={`flex-1 bg-[#f8f6f4] border border-[#ebebeb] px-12 py-6 lg:p-8 flex flex-col gap-4 items-center justify-center ${
                      i === 0 ? "rounded-t-[16px] lg:rounded-t-none lg:rounded-l-[16px]" : i === arr.length - 1 ? "rounded-b-[16px] lg:rounded-b-none lg:rounded-r-[16px]" : ""
                    }`}
                  >
                    <p className="font-poiret text-[32px] text-accent leading-[20px] whitespace-nowrap">{m.value}</p>
                    <p className="font-public-sans font-normal text-[16px] text-black text-center leading-[24px]">{m.label}</p>
                  </div>
                ))}
              </div>

              <Card eyebrow="BUSINESS IMPACT" heading="Integration made trade-in visible — and drove real business value">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The Trade-In landing page saw a 3x increase in visitors compared to the pre-launch 30-day average — 57,000 vs. 17,000 — with 46% of those visitors new to Patagonia.com entirely. Beyond trade-in activity itself, $81.6k in mainline site revenue was generated by traffic that came through the trade-in experience, demonstrating a halo effect the previous WornWear.com experience couldn&apos;t produce.</p>
                  <p>Initial readings showed a 1.5x increase in overall trade-in orders submitted. August digital trade-in unit volumes were up 29% year-over-year, tracking toward the 20% annualized inventory growth goal set at launch.</p>
                </div>
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
          <span className="hidden lg:inline">PREVIOUS PROJECT</span>
        </a>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black cursor-pointer hover:opacity-60 transition-opacity"
        >
          BACK TO TOP
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <a href="#" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          <span className="hidden lg:inline">NEXT PROJECT</span>
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

function SideBySideCard({
  eyebrow,
  heading,
  image,
  children,
  onImageClick,
}: {
  eyebrow: string;
  heading: string;
  image: { src: string; alt: string; aspect: string };
  children: ReactNode;
  onImageClick: (src: string, alt: string) => void;
}) {
  return (
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-6">
          <div className="flex flex-col gap-4 font-poiret not-italic">
            <p className="text-[14px] text-accent tracking-[1.5px] leading-normal">{eyebrow}</p>
            <h2 className="text-[24px] font-[550] text-black leading-[32px] tracking-wide [word-spacing:-2px]">{heading}</h2>
          </div>
          <div className="font-public-sans font-normal text-[16px] text-black leading-[24px]">
            {typeof children === "string" ? <p>{children}</p> : children}
          </div>
        </div>
        <div className={`shrink-0 w-full lg:w-[340px] ${image.aspect} rounded-lg overflow-hidden`}>
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover cursor-zoom-in"
            onClick={() => onImageClick(image.src, image.alt)}
          />
        </div>
      </div>
    </div>
  );
}

function QuoteCard({ quote, source }: { quote: string; source: string }) {
  return (
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8">
      <div className="flex gap-3 lg:gap-6 items-center">
        <div className="w-px self-stretch bg-[#ebebeb] shrink-0" />
        <div className="flex flex-col gap-4">
          <p className="font-public-sans font-extralight italic text-[16px] lg:text-[20px] text-black leading-[26px] lg:leading-[30px]">
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
