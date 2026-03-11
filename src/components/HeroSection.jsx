const HeroSection = () => {
  return (
    <div className="w-full relative bg-[#034EA2]">

      {/* Call Button - now aligned to extreme right */}
      <button
        type="button"
        aria-label="Call"
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 16.5v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 2.8 2 2 0 0 1 3.1.6h2a2 2 0 0 1 2 1.7c.1.8.3 1.6.5 2.3a2 2 0 0 1-.4 2.1L6.4 8.5a16 16 0 0 0 6 6l1.8-1.8a2 2 0 0 1 2.1-.4c.7.2 1.5.4 2.3.5a2 2 0 0 1 1.7 2z"
            fill="#0B4AA2"
          />
        </svg>
      </button>

      {/* Content Container */}
      <div className="max-w-[1180px] mx-auto px-4 pt-10 pb-[170px] relative">

<div className="inline-flex bg-white rounded-full px-7 py-1 text-[14px] leading-[18px] font-semibold text-[#0B4AA2]">
  Equity
</div>

        <div className="mt-4 flex items-center gap-4">
<h1 className="text-white text-[40px] leading-[52px] font-[600]">
  Edelweiss Flexi Cap Fund
</h1>

<span className="bg-[#8DC63F] text-white px-10 py-2 rounded-full text-[16px] font-[600] font-semibold">
  Direct
</span>
        </div>

        <button className="mt-4 border border-white text-white px-16 py-2 rounded-lg font-medium hover:bg-white hover:text-[#0B4AA2] transition-all  text-[16px] font-[600] duration-700 ease-in-out">
          Invest Now
        </button>

      </div>
    </div>
  );
};

export default HeroSection;