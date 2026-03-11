export default function AboutMe() {
  return (
    <section className="w-full px-4 lg:px-12">
      <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-end max-w-[1280px] mx-auto">
        {/* Photo */}
        <img
          src="/about-professional.jpg"
          alt="Chelsea Lensing"
          className="w-full lg:w-[325px] lg:shrink-0 aspect-[3/4] object-cover rounded-[32px]"
        />

        {/* Text */}
        <div className="flex flex-col items-start px-2 lg:px-0 pb-0 lg:pb-10 w-full lg:w-[688px]">
          <div className="flex flex-col gap-6 lg:gap-8 items-start leading-normal text-black w-full">
            <a href="/about" className="font-poiret text-[24px] lg:text-[36px] w-full transition-opacity duration-200 hover:opacity-60">ABOUT ME</a>
            <div className="font-public-sans font-normal text-[14px] lg:text-[16px] w-full leading-relaxed flex flex-col gap-4">
              <p>My experience spans end-to-end design across consumer health apps, digital commerce, and complex product ecosystems.</p>
              <p>What I love most about this work is getting into the details — finding the edge cases, the moments where an experience quietly breaks down, and solving them in ways users never have to think about. I enjoy connecting directly with real people: understanding how they actually interact with a product, not just how we assume they do. That combination of close observation and careful craft is what I bring to every project.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
