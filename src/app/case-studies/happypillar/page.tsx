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

export default function HappypillarPage() {
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
        <span>HEALTH &amp; WELLNESS</span>
      </div>

      {/* Hero */}
      <div className="px-4 lg:px-12 pb-8 lg:pb-10 flex flex-col gap-5 lg:gap-6">
        <h1 className="font-poiret text-[28px] lg:text-[36px] text-black leading-normal">
          HAPPYPILLAR NATIVE iOS APP
        </h1>
        <p className="font-public-sans font-light italic text-[14px] lg:text-[16px] text-accent leading-[26px] tracking-[0.4px]">
          Note: Happypillar has since been acquired by and rebranded as{" "}
          <a href="https://www.getmanatee.com/" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">Manatee</a>.
        </p>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-[#666] leading-[26px] tracking-[0.4px] max-w-[800px]">
          End-to-end product design for the release of Happypillar&apos;s mobile application — an AI-powered platform helping parents build stronger relationships with their children through evidence-based therapy techniques.
        </p>
        <div>
          <a
            href="https://www.figma.com/proto/xaIUa19rJ0UEl1AIMbNsaM/Happypillar-Native-iOS-App?node-id=1322-9652&p=f&viewport=43%2C-269%2C0.35&t=HasuJcJzXM1IRWaX-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1322%3A9652&show-proto-sidebar=1&page-id=1260%3A6713"
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
          <span>LEAD PRODUCT DESIGNER</span>
          <span aria-hidden="true">•</span>
          <span>HAPPYPILLAR</span>
          <span aria-hidden="true">•</span>
          <span>APRIL - OCTOBER 2022</span>
          <span aria-hidden="true">•</span>
          <span>MOBILE (iOS)</span>
        </div>
      </div>

      {/* Hero image */}
      <div id="hero-image" className="w-full aspect-[667/380] overflow-hidden">
        <img
          src="/images/case-studies/happypillar/Happypillar_hero.jpg"
          alt="Image of 3 screens of the mobile application. The first one with an image of a sun and clouds and text stating 'How does Happypillar work? Parents spend one-on-one time with their kids - we call this Happy Time - and use several of the same skills play therapists do for just five minutes per day.' Second screen is of the login screen on the app - showing the logo in 'Happypillar green' and input boxes to enter email and password to login. There is also the ability to sign up, log in with Google or Apple. The last screen is of the home screen in the app which has an illustration of 'Petey', the Happypillar mascot and says 'Good morning, Natalie & Isabelle!'. There are 4 modules in view: Happy Time module with the ability to start a session, Happy Time Reminders module, Daily Report module, and Weekly Check-in module. There is also a navigation bar at the bottom with a home icon, progress icon, record icon, learn icon and profile icon."
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setLightbox({
            src: "/images/case-studies/happypillar/Happypillar_hero.jpg",
            alt: "Image of 3 screens of the mobile application. The first one with an image of a sun and clouds and text stating 'How does Happypillar work? Parents spend one-on-one time with their kids - we call this Happy Time - and use several of the same skills play therapists do for just five minutes per day.' Second screen is of the login screen on the app - showing the logo in 'Happypillar green' and input boxes to enter email and password to login. There is also the ability to sign up, log in with Google or Apple. The last screen is of the home screen in the app which has an illustration of 'Petey', the Happypillar mascot and says 'Good morning, Natalie & Isabelle!'. There are 4 modules in view: Happy Time module with the ability to start a session, Happy Time Reminders module, Daily Report module, and Weekly Check-in module. There is also a navigation bar at the bottom with a home icon, progress icon, record icon, learn icon and profile icon."
          })}
        />
      </div>

      {/* Mobile "Jump to" — floating pill, appears after scrolling past hero */}
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

              <Card eyebrow="ABOUT HAPPYPILLAR" heading="Practical, evidence-based therapy skills for caregivers">
                Happypillar provides caregivers with evidence-based therapy skills to strengthen their relationships with children through 5-minute &quot;Happy Time&quot; sessions. The app uses machine learning to listen to and analyze sessions, providing personalized feedback to improve caregiver technique. These skills are proven to decrease tantrum frequency, increase child self-esteem, improve social and sharing skills, and reduce caregiver stress.
              </Card>

              <Card eyebrow="THE BRIEF" heading="Moving from Beta to General Availability">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>After two rounds of beta testing, Happypillar had gathered enough data and feedback to move forward with the design and build of the general availability version of their application. As the design lead, I cross-collaborated with stakeholders and the engineering lead to define short- and long-term product goals to inform the roadmap for the MVP.</p>
                  <p>To move from beta to GA, we needed to focus on three things: an informative onboarding experience, a straightforward recording page, and the ability for users to view short- and long-term data and growth within the app.</p>
                </div>
              </Card>

            </div>
          </section>

          {/* 02 Research */}
          <section id="research" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="02" title="RESEARCH" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="BETA FEEDBACK" heading="Four areas of opportunity surfaced from beta testers">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>To begin strategizing, we revisited research conducted and gathered for beta and combined that with feedback gathered directly from beta testers. Upon reviewing the feedback, we discovered four areas of opportunity:</p>
                  <ol className="list-decimal ml-6 flex flex-col gap-3">
                    <li>
                      <span className="font-medium">Onboarding Flow:</span>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Users wanted a clearer picture of how many steps were involved in the onboarding process. They also wanted to be informed of the research and data backing Happypillar&apos;s technology before signing up.</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Survey Design &amp; Flow:</span>
                      <ul className="list-disc ml-6 mt-1">
                        <li>The design of the Likert scale survey was difficult to read given the amount of information on one page. The colors did not meet accessibility standards.</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Recording Page:</span>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Users felt there were unnecessary buttons and worried about pausing or stopping their session and losing data.</li>
                      </ul>
                    </li>
                    <li>
                      <span className="font-medium">Video Content &amp; Accessibility:</span>
                      <ul className="list-disc ml-6 mt-1">
                        <li>Users wanted to see progress bars within videos and have access to captions and alternative ways of consuming the information shared in the videos.</li>
                      </ul>
                    </li>
                  </ol>
                  <OutlineButton
                    label="View Research & Synthesis Deck"
                    href="https://www.figma.com/proto/2M10MSv9O0bcpjxNEmImWP/Discovery---Research?node-id=602-4712&viewport=193%2C45%2C0.1&t=QOGpBWatgTfgr5A4-1&scaling=scale-down&content-scaling=fixed&page-id=602%3A4704"
                  />
                </div>
              </Card>

            </div>
          </section>

          {/* 03 Hypothesis */}
          <section id="hypothesis" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="03" title="HYPOTHESIS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="PROBLEM STATEMENT" heading="Beta users lacked confidence and clarity at critical moments">
                The beta experience left users uncertain during onboarding, anxious during recording sessions, and without a meaningful view of their progress over time. To move to GA, Happypillar needed a seamless, end-to-end experience that built trust from first open to long-term engagement.
              </Card>

              <Card eyebrow="PRODUCT ROADMAP" heading="MoSCoW prioritization to define the MVP">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>After reviewing beta feedback and discussing scope with the stakeholders, I created a MoSCoW chart that helped inform the creation of a product roadmap. I used Notion to create the roadmap and a system to request copy and video needs from the stakeholders. This roadmap ensured the project stayed on track and that all tasks were assigned, resulting in the MVP&apos;s timely delivery.</p>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="font-medium mb-2">Must:</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Onboarding: Welcome Video, Fitness Questions, Subscription/Free Trial, Child Intro, Happy Time Intro</li>
                        <li>Training: Intro to Happy Time Video, How to Do&apos;s &amp; Don&apos;ts, Gamified/Interactive Skills Lessons</li>
                        <li>Ability to set reminders</li>
                        <li>Happy Time Feedback Report</li>
                        <li>Progress tracking</li>
                        <li>Interactive Home Screen with to-do section</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Should:</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Notifications: skill/training sessions, weekly survey</li>
                        <li>NICE Skills Sheet available on recording page</li>
                        <li>Streak Tracking</li>
                        <li>Data visualization: intersection of HT Feedback Reports &amp; Weekly Behavioral Check-Ins</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Won&apos;t (for MVP):</p>
                      <ul className="list-disc ml-6 leading-[28px]">
                        <li>Multiple Users</li>
                        <li>Accessibility for multiple languages</li>
                        <li>Ability to add notes to the Happy Time recording</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>

            </div>
          </section>

          {/* 04 Design */}
          <section id="design" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="04" title="DESIGN" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="USER JOURNEY MAPPING" heading="Mapping out the user journey with cross-functional input">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>Through collaboration with stakeholders, the therapist-in-residence, and the engineer, we built out user flows that led to the full design of the app map. We broke the user journeys into smaller sections to ensure we captured all information and flows necessary for the MVP. By breaking the full journey into smaller flows, we were able to eventually create the app map, showcasing the entire experience within the app.</p>
                  <OutlineButton
                    label="View App Map"
                    href="https://www.figma.com/design/xaIUa19rJ0UEl1AIMbNsaM/Happypillar-Native-iOS-App?node-id=1544-15857"
                  />
                  <img
                    src="/images/case-studies/happypillar/Happypillar_app_map.jpg"
                    alt="Screenshot of a portion of the app map starting from the splash screen of the app and going through every user interaction and page. A key for the map is on the left."
                    className="w-full h-auto rounded-lg cursor-zoom-in"
                    onClick={() => setLightbox({
                      src: "/images/case-studies/happypillar/Happypillar_app_map.jpg",
                      alt: "Screenshot of a portion of the app map starting from the splash screen of the app and going through every user interaction and page. A key for the map is on the left."
                    })}
                  />
                </div>
              </Card>

              <Card eyebrow="WIREFRAMING" heading="Bringing the user journey to life">
                After planning out the user flows and app map, we moved into wireframing. Since we had wireframes from the beta design, we were able to elevate and update those as well as design new screens needed for the MVP.
              </Card>

              <Card eyebrow="ONBOARDING THE USER" heading="Building trust through a therapist-informed onboarding flow">
                <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>We worked with Happypillar&apos;s therapist-in-residence to create an onboarding experience that mimicked the in-person process — establishing trust and gathering the appropriate information to ensure the best possible experience for the user and their child/children while using Happypillar.</p>
                  <img
                    src="/images/case-studies/happypillar/Happypillar_onboarding.jpg"
                    alt="Screenshot of low fidelity wireframes for the onboarding flow for the app."
                    className="w-full h-auto rounded-lg cursor-zoom-in"
                    onClick={() => setLightbox({
                      src: "/images/case-studies/happypillar/Happypillar_onboarding.jpg",
                      alt: "Screenshot of low fidelity wireframes for the onboarding flow for the app."
                    })}
                  />
                </div>
              </Card>

              <SideBySideCard
                eyebrow="WELCOME HOME"
                heading="A task tracker that motivates consistent engagement"
                image={{ src: "/images/case-studies/happypillar/Happypillar_Home.jpg", alt: "An image of the home screen in the app which has an illustration of 'Petey', the Happypillar mascot and says 'Good morning, Natalie & Isabelle!'. There are 4 modules in view: Happy Time module with the ability to start a session, Happy Time Reminders module, Daily Report module, and Weekly Check-in module. There is also a navigation bar at the bottom with a home icon, progress icon, record icon, learn icon and profile icon.", aspect: "aspect-[280/300]" }}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              >
                We designed the Happypillar home screen to feel inviting and informative. We created a task tracker so users could easily see what they need to do each time they log in. By creating a checkbox toggle bar, we motivated users to complete their Happy Time sessions and continue learning new skills to improve their relationships and make progress with their child/children.
              </SideBySideCard>

              <SideBySideCard
                eyebrow="RECORDING A SESSION"
                heading="The core feature — designed for simplicity and confidence"
                image={{ src: "/images/case-studies/happypillar/Happypillar_HappyTime.jpg", alt: "Image of the Happy Time recording screen. 'Petey' the Happypillar mascot is shown with a progress bar on top indicating that the full 5 minutes has been reached in the session. There are haptics and three buttons at the bottom: reset, resume and submit.", aspect: "aspect-[280/300]" }}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              >
                Recording a Happy Time session is the main feature within the Happypillar app, so we prioritized it for two rounds of usability testing. By conducting a heuristic evaluation, we ensured our design used familiar words and buttons. To achieve a minimal, straightforward design, we removed unnecessary information and kept vital elements like sound haptics, a progress bar, and minimal button design.
              </SideBySideCard>

              <SideBySideCard
                eyebrow="TRACKING PROGRESS"
                heading="Data visualization to show the impact of consistent app usage"
                image={{ src: "/images/case-studies/happypillar/Happypillar_Progress.jpg", alt: "An image of two screens: the first is of the daily report which has a date scroller at the top and a module underneath showing the Nice Skills scores for the Happy Time session. The second screen is of long term progress showing how many hours of 'Happy Time' have been recording and an improvements in the child's behavior over the course of the apps usage.", aspect: "aspect-square" }}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              >
                <div className="flex flex-col gap-4">
                  <p>We worked closely with the stakeholders and therapist-in-residence to create data visualizations that display the relationship between consistent app usage and behavioral improvement. By using tab navigation, we were able to share in-depth information without overwhelming the user.</p>
                  <p>Outside of the Happy Time Report, users can view highlights from their time using Happypillar and review longer-term progress and milestones.</p>
                </div>
              </SideBySideCard>

              <SideBySideCard
                eyebrow="LEARN | SKILLS & QUIZZES"
                heading="Empowering caregivers to go deeper between sessions"
                image={{ src: "/images/case-studies/happypillar/Happypillar_Learn.jpg", alt: "Image of the Learn screen in the app. The top module features 'Today's Lesson' which is 'Avoiding Commands'. Underneath that module there is a carousel with other skills to work on. Beneath that there is a link to 'Quizzes'.", aspect: "aspect-[280/300]" }}
                onImageClick={(src, alt) => setLightbox({ src, alt })}
              >
                <div className="flex flex-col gap-4">
                  <p>Within the app, users have the opportunity to learn more about the skills they use during Happy Time sessions. We created a Learn landing page to house all the different skill categories as well as a variety of templates for different quiz options. Users can complete a daily lesson that includes an overview of the skill along with a quiz. Specific topics are recommended based on their Happy Time feedback reports to help them further develop lacking skills.</p>
                  <p>In addition to the core screens, we designed a variety of additional screens necessary for the MVP, including Account Settings, Child Profiles, FAQs &amp; About, Reminders, and the ability to share Happypillar with friends.</p>
                </div>
              </SideBySideCard>

            </div>
          </section>

          {/* 05 Test + Iterate */}
          <section id="test-iterate" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="05" title="TEST & ITERATE" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="USABILITY TESTING" heading="Two rounds of testing on the recording experience">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The recording page was prioritized for two rounds of usability testing given it is the core feature of the app. Testing validated the minimal, straightforward design direction — removing unnecessary buttons and keeping only vital elements such as sound haptics, the progress bar, and minimal button design addressed the key concern from beta testers about accidentally stopping a session and losing data.</p>
                  <p>A heuristic evaluation was also conducted to ensure the design used words and buttons familiar to the user, reinforcing confidence throughout the session flow.</p>
                </div>
              </Card>

              <QuoteCard
                quote="Routines with my child need to be consistent in order to implement them long-term."
                source="ANNIE, MOM WHO PARTICIPATED IN BETA TESTING"
              />

            </div>
          </section>

          {/* 06 Deliver */}
          <section id="deliver" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="06" title="DELIVER" />
            <Card eyebrow="DESIGN SYSTEM & INTERACTIVE PROTOTYPE" heading="A scalable design system built for the GA release">
              <div className="flex flex-col gap-6 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                <p>Alongside the full screen designs, we built out a complete design system in Figma covering typography, color, iconography, navigation patterns, and component states. This system served as the foundation for the interactive prototype and ensured consistency across all screens delivered to engineering.</p>
                <div>
                  <p className="font-medium mb-2">Deliverables produced:</p>
                  <ul className="list-disc ml-6 leading-[28px]">
                    <li>Complete Figma component library</li>
                    <li>Annotated interaction behaviors</li>
                    <li>Interactive prototype</li>
                    <li>Full wireframe documentation for engineering handoff</li>
                  </ul>
                </div>
                <OutlineButton
                  label="Figma Spec Documentation"
                  href="https://www.figma.com/design/xaIUa19rJ0UEl1AIMbNsaM/Happypillar-Native-iOS-App?node-id=1260-6713"
                />
              </div>
            </Card>
          </section>

          {/* 07 Results */}
          <section id="results" className="flex flex-col gap-6 lg:gap-8 scroll-mt-[145px] lg:scroll-mt-[120px]">
            <SectionHeader number="07" title="RESULTS" />
            <div className="flex flex-col gap-4 lg:gap-6">

              <Card eyebrow="BUSINESS IMPACT" heading="Happypillar acquired by and rebranded as Manatee — October 2025">
                <div className="flex flex-col gap-4 font-public-sans font-normal text-[16px] text-black leading-[24px]">
                  <p>The release of the Happypillar app directly contributed to the company achieving its mission of scalable, accessible mental health care for families.</p>
                  <p>
                    In October 2025, Manatee — the leading virtual mental health platform for the entire family —{" "}
                    <a
                      href="https://www.newswire.com/news/manatee-acquires-happypillar-to-scale-personalized-mental-health-care-22659782"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      announced its acquisition of Happypillar
                    </a>
                    , combining Manatee&apos;s family-first clinical platform with Happypillar&apos;s AI-supported parent-child therapy coaching technology. Happypillar has since been rebranded as Manatee.
                  </p>
                  <p>Manatee partners with major health plans and health systems nationwide, giving more than 20 million families in the U.S. access to care. The acquisition positioned Happypillar&apos;s technology to reach families at a scale that would not have been possible independently.</p>
                </div>
              </Card>

              <QuoteCard
                quote="Expanding access means meeting families where they are — sometimes that's in a session with a therapist, and sometimes it's through daily moments at home."
                source="DAMAYANTI DIPAYANA, CEO OF MANATEE"
              />

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
    <div className="bg-[#f8f6f4] border border-[#ebebeb] rounded-[16px] p-4 lg:p-8 flex flex-col gap-6">
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
