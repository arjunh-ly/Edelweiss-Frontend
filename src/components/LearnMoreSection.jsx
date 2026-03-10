import React from "react";
import advisorIllustration from "../assets/flexi-cap-learn-more.png";
import advisorBadge from "../assets/flexi-cap-learn-more.png";

const PRIMARY = "#034EA2";
const CARD_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.08)";

const LearnMoreSection = () => {
  return (
    <section className="w-full py-10">
      <div className="max-w-[1180px] mx-auto px-4">
        <div
          className="rounded-2xl bg-[#EEF5FD] px-6 md:px-8 py-8"
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
            <div>
              <h3 className="text-[#111827] text-[22px] font-semibold leading-7">
                Want to learn more about Flexi Cap Funds?
              </h3>
              <div
                className="mt-2 w-[84px] h-[3px] rounded-full"
                style={{ backgroundColor: PRIMARY }}
              />
              <p className="mt-3 text-[#374151] text-[14px] leading-6">
                Our investment advisors are here to help you make informed decisions
              </p>

              <div className="mt-7 space-y-4 max-w-[420px]">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full h-[42px] rounded-[10px] border border-[#D8DDE6] bg-white px-4 text-[14px] outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Mobile number"
                    className="w-full h-[42px] rounded-[10px] border border-[#D8DDE6] bg-white px-4 text-[14px] outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Id"
                    className="w-full h-[42px] rounded-[10px] border border-[#D8DDE6] bg-white px-4 text-[14px] outline-none"
                  />
                </div>
              </div>

        <div className="mt-7 flex flex-col sm:flex-row gap-3 max-w-[420px]">
  
  {/* Start SIP */}
  <button
    type="button"
    className="
      flex-1 h-[46px] rounded-[10px]
      text-white text-[15px] font-semibold
      bg-[#034EA2]
      transition-colors duration-300
      hover:bg-[#8DC63F]
    "
  >
    Start a SIP
  </button>

  {/* Invest Now */}
  <button
    type="button"
    className="
      flex-1 h-[46px] rounded-[10px]
      border border-[#034EA2]
      text-[15px] font-semibold
      text-[#034EA2]
      bg-transparent
      transition-colors duration-300
      hover:bg-[#034EA2]
      hover:text-white
    "
  >
    Invest Now
  </button>

</div>
            </div>

            <div className="relative">
              <img
                src={advisorIllustration}
                alt="Learn more illustration"
                className="w-full max-w-[500px] mx-auto object-contain"
              />

              {/* <img
                src={advisorBadge}
                alt="Advisor badge"
                className="absolute bottom-[14px] left-0 md:left-[18px] w-[48px] h-[48px] object-contain"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;