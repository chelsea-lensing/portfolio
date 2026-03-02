"use client";

export default function BackToTop() {
  return (
    <div className="flex justify-center py-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-poiret text-[14px] lg:text-[16px] text-dark tracking-[1.5px] inline-flex items-center gap-2 cursor-pointer"
      >
        BACK TO TOP
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 9L7 5L11 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
