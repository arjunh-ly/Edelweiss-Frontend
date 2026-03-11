// src/components/RiskometerSection.jsx
import { useState } from "react";
import riskometerImg from "../assets/riskometer.png";

const RiskometerSection = () => {
  const [active, setActive] = useState("scheme");

  const riskText = {
    scheme: {
      title: "The risk of the scheme is Very High",
      subtitle: "",
    },
    benchmark: {
      title: "NIFTY 500 TRI",
      subtitle: "The risk of the benchmark is Very High",
    },
  };

  return (
    <section className="w-full py-14">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left */}
          <div className="pt-2">
            <h3 className="text-[#111827] text-[16px] sm:text-[22px] font-semibold leading-7">
              This product is suitable for investors who
              <br />
              are seeking:
            </h3>

            <div className="mt-3 w-[120px] h-[3px] bg-[#034EA2] rounded-full" />

            <ul className="mt-7 space-y-3 text-[#111827] text-[16px] leading-6 list-disc pl-5">
              <li>Long Term Capital Growth</li>
              <li>
                Investment in equity and equity-related
                <br />
                securities of companies across various market
                <br />
                capitalisations
              </li>
            </ul>

            <p className="mt-8 text-[#111827] text-[16px] leading-5">
              * Investors should consult their financial advisors if in
              <br />
              doubt about whether the product is suitable for them
            </p>
          </div>

          {/* Right */}
          <div className="w-full">
            <div className="w-full bg-white rounded-2xl px-4 sm:px-6 py-5">
              {/* Tabs */}
              <div className="w-full bg-[#F3F4F6] rounded-md p-1 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActive("scheme")}
                  className={[
                    "flex-1 text-[12px] sm:text-[13px] font-medium rounded-md py-2 transition outline-none focus:outline-none",
                    active === "scheme"
                      ? "bg-white border border-[#034EA2] text-[#111827]"
                      : "bg-transparent text-[#111827] opacity-70",
                  ].join(" ")}
                >
                  Scheme Risk-o-meter
                </button>

                <button 
                  type="button"
                  onClick={() => setActive("benchmark")}
                  className={[
                    "flex-1 text-[12px] sm:text-[13px] font-medium rounded-md py-2 transition outline-none focus:outline-none",
                    active === "benchmark"
                      ? "bg-white border border-[#034EA2] text-[#111827]"
                      : "bg-transparent text-[#111827] opacity-70",
                  ].join(" ")}
                >
                  Benchmark Riskometer
                </button>
              </div>

              {/* Image */}
              <div className="mt-6 flex justify-center">
                <img
                  src={riskometerImg}
                  alt="Risk-o-meter"
                  className="w-full max-w-[400px] object-contain"
                />
              </div>

              {/* Dynamic Text */}
              <div className="mt-5 text-center min-h-[42px]">
                <p className="text-[#111827] text-[14px] font-medium leading-5">
                  {riskText[active].title}
                </p>

                {riskText[active].subtitle && (
                  <p className="text-[#6B7280] text-[13px] mt-1 leading-5">
                    {riskText[active].subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskometerSection;