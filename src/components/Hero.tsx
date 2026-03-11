export default function Hero() {
  return (
    <section className="bg-white w-full flex flex-col items-center px-4 pb-14 lg:px-0">
      <div className="flex flex-col gap-4 items-start w-full max-w-[900px] lg:px-12">
        <p className="font-poiret text-[24px] lg:text-[32px] text-black text-center w-full leading-normal">
          Senior Product Designer
        </p>
        <p className="font-public-sans font-light text-[14px] lg:text-[16px] text-muted text-center leading-[20px] lg:leading-[26px] tracking-[0.4px] w-full">
          Product designer with 5+ years of experience leading end-to-end design for complex digital products, specializing in research-driven decision making, systems thinking, and shipping polished work that measurably moves the needle. Currently at Patagonia.
        </p>
      </div>
    </section>
  );
}
