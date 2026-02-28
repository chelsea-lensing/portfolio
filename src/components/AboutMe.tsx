export default function AboutMe() {
  return (
    <section className="w-full px-12">
      <div className="flex gap-10 items-end max-w-[1280px] mx-auto">
        {/* Photo placeholder */}
        <div className="bg-[#d9d9d9] h-[432px] w-[325px] shrink-0 rounded-[32px]" />

        {/* Text */}
        <div className="flex flex-col items-start pb-10 w-[688px]">
          <div className="flex flex-col gap-8 items-start leading-normal text-black w-full">
            <p className="font-poiret text-[36px] w-full">ABOUT ME</p>
            <p className="font-public-sans font-normal text-[16px] w-full leading-relaxed">
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
