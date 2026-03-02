export default function Hero() {
  return (
    <section className="bg-white w-full flex flex-col items-center px-4 pb-14 lg:px-0">
      <div className="flex flex-col gap-4 items-start w-full max-w-[900px] lg:px-12">
        <p className="font-poiret text-[24px] lg:text-[32px] text-black text-center w-full leading-normal">
          Senior Product Designer at Patagonia
        </p>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-muted text-center leading-[20px] lg:leading-[26px] tracking-[0.4px] w-full">
          I&apos;m a Lead Product Designer with over a decade of experience across apparel and digital
          product design. I currently lead high-impact commerce and product discovery initiatives at
          Patagonia, where I design end-to-end experiences that help customers make confident
          purchasing decisions in complex marketplaces. My background in apparel design deeply
          informs how I approach systems thinking, clarity, and trust in product design.
        </p>
      </div>
    </section>
  );
}
