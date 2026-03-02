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
            <p className="font-public-sans font-normal text-[14px] lg:text-[16px] w-full leading-relaxed">
              I specialize in turning complex problems into seamless, user-centered designs. With a
              background in apparel and e-commerce, I bring a systems-thinking approach to
              circularity and product design. I&apos;m passionate about usability, cross-functional
              collaboration, and creating experiences that are both impactful and intuitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
