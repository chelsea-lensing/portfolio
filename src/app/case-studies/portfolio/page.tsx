"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";

const SECTIONS = [
  { id: "overview",  number: "01", label: "Overview" },
  { id: "concept",   number: "02", label: "Concept" },
  { id: "design",    number: "03", label: "Design" },
  { id: "mcp-code",  number: "04", label: "MCP + Code" },
  { id: "github",    number: "05", label: "Github" },
  { id: "vercel",    number: "06", label: "Vercel" },
  { id: "learnings", number: "07", label: "Learnings" },
];

export default function PortfolioCaseStudyPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [jumpToOpen, setJumpToOpen] = useState(false);
  const [showPrevNext, setShowPrevNext] = useState(true);
  const [showJumpTo, setShowJumpTo] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const lastScrollY = useRef(0);
  const openLightbox = (src: string, alt: string) => setLightbox({ src, alt });

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
        <span>PERSONAL</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          DESIGNING WITH AI
        </h1>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          From napkin sketch to deployed portfolio site — a design-to-code workflow using Figma, Claude Code, and MCP.
        </p>
      </div>

      {/* Metadata bar */}
      <div className="border-t border-b border-[#ebebeb] px-4 lg:px-12 py-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-poiret text-[12px] tracking-[1.5px] text-black">
          <span>DESIGNER &amp; DEVELOPER</span>
          <span aria-hidden="true">•</span>
          <span>DESIGN PORTFOLIO</span>
          <span aria-hidden="true">•</span>
          <span>MARCH 2026</span>
          <span aria-hidden="true">•</span>
          <span>WEB</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] overflow-hidden">
        <img
          src="/images/case-studies/portfolio/Portfolio_Hero.jpg"
          alt="Chelsea Lensing portfolio site shown on desktop and mobile devices — desktop displays the homepage with case study grid and filter tabs, mobile shows the open navigation menu with red background."
          className="w-full h-full object-cover cursor-zoom"
          onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Hero.jpg", "Chelsea Lensing portfolio site shown on desktop and mobile devices — desktop displays the homepage with case study grid and filter tabs, mobile shows the open navigation menu with red background.")}
        />
      </div>

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
              <a href="/case-studies/patagonia-provisions" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                PREVIOUS PROJECT
              </a>
              <a href="/case-studies/navigation-redesign" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
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

          {/* 01 Overview */}
          <section id="overview" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="01" title="OVERVIEW" />
            <Card eyebrow="THE PROJECT" heading="A new kind of design-to-code workflow">
              <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>This project documents the end-to-end process of building my personal portfolio website — not just as a design exercise, but as an exploration of what AI-assisted design workflows can look like in practice. Rather than handing off specs to a developer, I used Claude Code as a collaborative build partner, bridging the gap between Figma and production code through a Figma MCP integration.</p>
                <p>The result is a fully designed, fully deployed site that I conceived, designed, and shipped using a workflow that&apos;s increasingly available to designers willing to engage with AI tools at the terminal level.</p>
                <img
                  src="/images/case-studies/portfolio/Portfolio_Terminal.jpg"
                  alt="Terminal window titled 'Portfolio — Claude Code' showing a diff of React component code alongside a Claude Code summary of changes made to match the Figma design."
                  className="w-full h-auto rounded-lg cursor-zoom"
                  onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Terminal.jpg", "Terminal window titled 'Portfolio — Claude Code' showing a diff of React component code alongside a Claude Code summary of changes made to match the Figma design.")}
                />
              </div>
            </Card>
          </section>

          {/* 02 Concept */}
          <section id="concept" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="CONCEPT" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="STARTING ANALOG" heading="Napkin sketches and direction setting">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The idea started analog. Before opening Figma or any digital tool, I spent time sketching rough layouts, thinking about information architecture, and establishing what I wanted the portfolio to communicate. The sketches weren&apos;t precious — they were fast explorations of page structure, content hierarchy, and navigation patterns.</p>
                  <img
                    src="/images/case-studies/portfolio/Portfolio_Napkin Sketches.jpg"
                    alt="Two open sketchbooks showing hand-drawn napkin sketches for the portfolio case study template — left page shows early layout explorations, right page shows further iteration including card structures and navigation patterns."
                    className="w-full h-auto rounded-lg cursor-zoom"
                    onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Napkin Sketches.jpg", "Two open sketchbooks showing hand-drawn napkin sketches for the portfolio case study template.")}
                  />
                </div>
              </Card>
              <Card eyebrow="VISUAL DIRECTION" heading="Editorial minimalism as a north star">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Inspiration gathering ran alongside sketching. The primary visual reference was Stout Books — its clean grid, confident type scale, and restrained palette. I also drew from editorial design and minimal commerce sites that prioritized typography and whitespace over decoration.</p>
                  <img
                    src="/images/case-studies/portfolio/Portfolio_Inspiration.jpg"
                    alt="Design inspiration moodboard showing Poiret One typeface specimen, a minimalist grid drawing by Agnes Martin, architecture book covers, art deco building facade, and a red geometric graphic design."
                    className="w-full h-auto rounded-lg cursor-zoom"
                    onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Inspiration.jpg", "Design inspiration moodboard.")}
                  />
                </div>
              </Card>
            </div>
          </section>

          {/* 03 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="STEP ONE: COMPONENT LIBRARY" heading="Designing the system before the screens">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The design process followed a deliberate sequence: components first, layouts second. Before touching a single page, I built out the component library in Figma — defining type styles, color tokens, and spacing rules, then assembling them into the UI elements the site would be built from.</p>
                  <p>Every component was designed with code handoff in mind: consistent naming conventions, organized layers, and deliberate variant states. This up-front investment paid off throughout the build — both in Figma and in code.</p>
                  <img
                    src="/images/case-studies/portfolio/Portfolio_Components.jpg"
                    alt="Figma file showing the Components page with the layer panel, canvas displays the component library with navigation bar variants, footer variants, case study card designs, and a case study carousel preview."
                    className="w-full h-auto rounded-lg cursor-zoom"
                    onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Components.jpg", "Figma component library.")}
                  />
                </div>
              </Card>
              <Card eyebrow="STEP TWO: PAGE LAYOUTS" heading="Assembling components into full site layouts">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>With the component library established, I moved into full page design — assembling components into the homepage, resume page, and overall site structure. Because the building blocks were already defined, layout decisions became faster and more consistent. The design language held together naturally because it was all pulling from the same system.</p>
                  <img
                    src="/images/case-studies/portfolio/Portfolio_Layout.jpg"
                    alt="Figma file showing the Specs page with the full page list, canvas displays annotated wireframe layouts for the homepage, navigation menu, and case study landing page."
                    className="w-full h-auto rounded-lg cursor-zoom"
                    onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Layout.jpg", "Figma page layouts.")}
                  />
                </div>
              </Card>
              <Card eyebrow="STEP THREE: CASE STUDY TEMPLATE" heading="Designing a template that would scale">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The case study page wasn&apos;t designed as a one-off — it was designed as a template. I built a reusable layout that could accommodate any project: a consistent structure for the hero, meta information, section content, image placements, and navigation. The template was intentional from the start, designed to be applied across every project highlighted on the site.</p>
                  <p>Once the template was built and validated in Figma, I used it to design each individual case study, keeping the experience consistent for visitors while allowing each project&apos;s content to breathe within the structure.</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <img
                      src="/images/case-studies/portfolio/Portfolio_Case Study Template.jpg"
                      alt="Figma file showing the Case Study Template page with the layer panel expanded to reveal the full template structure including numbered sections."
                      className="w-full h-auto rounded-lg cursor-zoom"
                      onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Case Study Template.jpg", "Figma case study template.")}
                    />
                    <img
                      src="/images/case-studies/portfolio/Portfolio_Case Studies.jpg"
                      alt="Figma file showing all individual case study pages visible side by side, demonstrating how the reusable template was applied consistently across all six projects."
                      className="w-full h-auto rounded-lg cursor-zoom"
                      onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Case Studies.jpg", "All case studies in Figma.")}
                    />
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* 04 MCP + Code */}
          <section id="mcp-code" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="FIGMA MCP + CLAUDE CODE" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="THE CORE WORKFLOW" heading="Bridging design and code with AI">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Rather than exporting assets and writing specs for a developer, I connected Figma directly to Claude Code using a Figma MCP (Model Context Protocol) server. This gave Claude Code live read access to my Figma file — so instead of describing my designs in text, Claude could see them.</p>
                  <p>Working in the terminal, I used Claude Code to translate Figma components into HTML and CSS, iterating in real time. When a layout didn&apos;t match design intent, I pointed to the Figma frame directly and asked Claude to reconcile the discrepancy. The workflow felt less like prompting a tool and more like working alongside a technical collaborator who had access to my design files.</p>
                </div>
              </Card>
              <Card eyebrow="KEY MOMENTS" heading="What the workflow actually looked like">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The process was iterative and genuinely collaborative:</p>
                  <ul className="list-disc ml-6 leading-[32px]">
                    <li>Establishing the MCP connection between Figma Desktop and Claude Code CLI</li>
                    <li>Translating the component library into responsive HTML/CSS</li>
                    <li>Iterating on type scale and spacing to match Figma intent in the browser</li>
                    <li>Building the multi-page structure: homepage, case study pages, resume</li>
                    <li>Working through React/component integration challenges collaboratively</li>
                  </ul>
                </div>
              </Card>
            </div>
          </section>

          {/* 05 Github */}
          <section id="github" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="GITHUB" />
            <Card eyebrow="VERSION CONTROL" heading="Connecting the codebase to GitHub">
              <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>With a working codebase taking shape, I connected the project to GitHub directly from the terminal. Using Git from the command line — guided by Claude Code when needed — I committed the site in logical increments, treating each component or page as its own unit of work.</p>
                <p>For a designer accustomed to Figma&apos;s version history, Git introduced a more intentional relationship with change. Rather than autosaved states, each commit required naming and framing what had changed — a small discipline that reinforced clearer thinking about the work.</p>
                <img
                  src="/images/case-studies/portfolio/Patagonia_Github.jpg"
                  alt="GitHub repository page for the portfolio showing the public Next.js codebase with commits, deployments linked to Vercel, and two contributors — chelsea-lensing and claude."
                  className="w-full h-auto rounded-lg cursor-zoom"
                  onClick={() => openLightbox("/images/case-studies/portfolio/Patagonia_Github.jpg", "GitHub repository for the portfolio.")}
                />
              </div>
            </Card>
          </section>

          {/* 06 Vercel */}
          <section id="vercel" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="VERCEL" />
            <Card eyebrow="DEPLOYMENT" heading="From repo to live site">
              <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>Deployment was handled through Vercel, connected directly to the GitHub repository. Every push to the main branch triggered an automatic build and deploy — meaning the live site stayed in sync with the codebase without manual intervention.</p>
                <img
                  src="/images/case-studies/portfolio/Portfolio_Vercel.jpg"
                  alt="Vercel project dashboard for the portfolio site showing a successful Production Deployment, custom domain chelsealensing.design, and a live preview of the homepage."
                  className="w-full h-auto rounded-lg cursor-zoom"
                  onClick={() => openLightbox("/images/case-studies/portfolio/Portfolio_Vercel.jpg", "Vercel deployment dashboard for the portfolio.")}
                />
              </div>
            </Card>
          </section>

          {/* 07 Learnings */}
          <section id="learnings" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="LEARNINGS" />
            <div className="flex flex-col gap-4 lg:gap-6">
              <Card eyebrow="SEEING THE WORK THROUGH A DEVELOPER'S EYES" heading="The most valuable shift was in perspective">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Working this deeply in the build layer gave me something I don&apos;t usually get as a designer: a firsthand view of what it actually feels like to work from a Figma file. When I was the one trying to translate my own designs into code, every ambiguity became immediately visible — missing states, inconsistent spacing, layers that weren&apos;t named with any intention. It was humbling in the best way.</p>
                  <p>This experience gave me a much deeper appreciation for the work developers do to interpret design files, and made clear how much friction lives in the gap between what a designer intends and what a developer can actually act on. Experiencing that gap from the other side changed how I think about handoff entirely.</p>
                </div>
              </Card>
              <Card eyebrow="FIGMA AS A COMMUNICATION TOOL, NOT JUST A DESIGN TOOL" heading="Annotations and organization are the real handoff">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>As I worked deeper into the project, I started treating my Figma file differently. What began as a personal design document had to become something that could communicate clearly to another system. That reframing changed how I worked.</p>
                  <p>I began leaning more intentionally into Figma features: component descriptions and annotations to document behavior and intent, design tokens to keep color and spacing consistent across components, and more disciplined layer naming and grouping so the file&apos;s structure made sense at a glance. These aren&apos;t extras — they&apos;re what make the difference between a file that requires interpretation and one that speaks for itself.</p>
                  <p>The result was a smoother, more seamless transition between Figma and the shipped site. The better the file, the less translation was required — and the closer the final output was to what I&apos;d designed.</p>
                </div>
              </Card>
            </div>
          </section>

        </div>
      </div>

      {/* Footer nav */}
      <div id="footer-nav" className="border-t border-[#ebebeb] px-4 lg:px-12 py-8 lg:py-12 flex items-center justify-between">
        <a href="/case-studies/patagonia-provisions" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 2L3 6L9 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          PREVIOUS PROJECT
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
        <a href="/case-studies/navigation-redesign" className="flex items-center gap-2 font-poiret text-[12px] tracking-[1.5px] text-black hover:opacity-60 transition-opacity">
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
      <div className="flex items-center gap-3 lg:gap-4 font-poiret text-black leading-[20px]">
        <span className="text-[14px] lg:text-[16px] tracking-[2px]">{number}</span>
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
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-5 lg:p-8 flex flex-col gap-5 lg:gap-6">
      <div className="flex flex-col gap-3 lg:gap-4 font-poiret not-italic">
        <p className="text-[12px] lg:text-[14px] text-accent tracking-[1.5px] leading-normal">{eyebrow}</p>
        {heading && <h2 className="text-[20px] lg:text-[24px] text-black leading-snug">{heading}</h2>}
      </div>
      {typeof children === "string" ? (
        <p className="font-public-sans font-normal text-[16px] text-black leading-[24px]">{children}</p>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
