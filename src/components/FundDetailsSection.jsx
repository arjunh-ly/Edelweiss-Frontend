// src/components/FundDetailsSection.jsx
import objectiveImg from "../assets/risk-badge.png";

const Row = ({ label, value, boldValue }) => (
  <div className="flex items-center justify-between gap-6 py-4 border-b border-[#D6F0C8]">
    <p className="text-[#111827] text-[16px] leading-5">{label}</p>
    <p
      className={[
        "text-[#111827] text-[13px] leading-5 text-right",
        boldValue ? "font-semibold" : "font-medium",
      ].join(" ")}
    >
      {value}
    </p>
  </div>
);

const FundDetailsSection = () => {
  return (
    <section className="w-full ">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* Heading */}
        <div>
          <h3 className="text-[#111827] text-[24px] font-semibold leading-7">
            Fund Details
          </h3>
          <div className="mt-2 w-[120px] h-[3px] bg-[#034EA2] rounded-full" />
          <p className="mt-2 text-[#6B7280] text-[16px] leading-5">
            Everything you need to know about the fund
          </p>
        </div>

        {/* Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-md border border-[#EEF2F7] px-6 sm:px-10 py-8">
          {/* Force 2 columns on md+ so they don't stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left */}
            <div>
              <h4 className="text-[#111827] text-[20px] font-semibold">
                Fund Information
              </h4>

              <div className="mt-5">
                <Row label="Fund Type" value="Open-ended" />
                <Row label="Category" value="Flexi Cap Fund" />
                <Row label="Benchmark" value="NIFTY 500 TRI" />
                <Row label="Launch Date" value="15-Jan-2018" />
                <Row label="NAV (as of Feb 24, 2026)" value="₹24.8" />
                <Row label="AUM" value="₹15,234 Cr" boldValue />
              </div>
            </div>

            {/* Right */}
            <div className="md:border-l md:border-[#D6F0C8] md:pl-10">
              <h4 className="text-[#111827] text-[20px] font-semibold">
                Investment Details
              </h4>

              <div className="mt-5">
                <Row label="Min Investment (SIP)" value="₹500" boldValue />
                <Row label="Min Investment (Lumpsum)" value="₹5000" boldValue />
                <Row label="Expense Ratio" value="0.85%" boldValue />
                <Row
                  label="Exit Load"
                  value="1% (if redeemed within 1 year)"
                />
                <Row label="Risk Level" value="Moderately High" boldValue />
                <div className="flex items-center justify-between gap-6 py-4">
                  <p className="text-[#111827] text-[16px] leading-5">
                    Lock-in Period
                  </p>
                  <p className="text-[#111827] text-[13px] leading-5 font-medium text-right">
                    Nil
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Objective banner */}
        <div className="mt-8 bg-[#034EA2] px-8 rounded-2xl shadow-md overflow-hidden">
          {/* Use flex so image never gets cut */}
          <div className="flex flex-col md:flex-row">
            {/* Left */}
            <div className="flex-1 px-6 sm:px-10 py-7 sm:py-8">
              <div className="flex items-center gap-3">
                <div className="text-white text-[24px] sm:text-[18px] font-semibold">
                  Investment Objective
                </div>

              </div>

              <div className="mt-2 w-[88px] h-[2px] bg-white/70 rounded-full" />

              <p className="mt-4 text-white/90 text-[16px] sm:text-[13px] leading-6 max-w-[540px]">
                The primary investment objective of the scheme is to generate
                long term capital appreciation by investing in an actively
                managed portfolio predominantly consisting of Equity &
                equity related securities diversified over various sectors.
              </p>
            </div>

            {/* Right image */}
            <div className="md:w-[44%] px-4 sm:px-6 pb-6 md:pb-0 md:pt-6 flex items-end justify-end">
              <img
                src={objectiveImg}
                alt="Investment objective"
                className=" max-w-[420px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundDetailsSection;