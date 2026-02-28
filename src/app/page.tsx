import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CaseStudies from "@/components/CaseStudies";
import AboutMe from "@/components/AboutMe";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navigation />
      <Hero />

      {/* Sections below hero */}
      <div className="flex flex-col gap-[120px] w-full">
        <CaseStudies />

        {/* About + Experience grouped with 80px gap */}
        <div className="flex flex-col gap-[80px] w-full">
          <AboutMe />
          <Experience />
        </div>
      </div>

      <Footer />
    </main>
  );
}
