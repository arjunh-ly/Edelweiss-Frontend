import colors from "../styles/colors";

const StepBadge = ({ number }) => {
  return (
    <div className="w-[70px] h-[70px] sm:w-[78px] sm:h-[78px] rounded-full border-2 border-dashed border-primary flex items-center justify-center shrink-0">
      <div className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-primary flex items-center justify-center">
        <span className="text-white text-[18px] sm:text-[20px] font-semibold">
          {number}
        </span>
      </div>
    </div>
  );
};

const StepNode = ({ number, style }) => {
  return (
    <div
      className="absolute"
      style={{ ...style, transform: "translate(-50%, -50%)" }}
    >
      <StepBadge number={number} />
    </div>
  );
};

const InvestStepsSection = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1180px] mx-auto px-4 mt-16 sm:mt-24">
        <div className="bg-[#EEF7FF] rounded-[22px] px-4 sm:px-6 lg:px-12 py-8 sm:py-8 relative">
          <h3 className="text-[22px] sm:text-[28px] font-semibold text-[#111827]">
            How to invest in Edelweiss Flexi Cap Fund?
          </h3>

          <div className="w-[140px] h-[3px] bg-primary rounded-full mt-3" />

          {/* DESKTOP/TABLET */}
          <div className="relative mt-4 sm:mt-8 h-[260px] hidden md:block">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 260"
              preserveAspectRatio="none"
            >
              <path
                d="M140 110 L430 185 L660 110 L890 185"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
                strokeDasharray="6 8"
                strokeLinecap="round"
              />
            </svg>

            <StepNode number="01" style={{ left: "12%", top: "42%" }} />
            <StepNode number="02" style={{ left: "43%", top: "72%" }} />
            <StepNode number="03" style={{ left: "67%", top: "42%" }} />
            <StepNode number="04" style={{ left: "90%", top: "72%" }} />

            <div
              className="absolute text-center w-[260px]"
              style={{ left: "12%", top: "70%", transform: "translate(-50%,0)" }}
            >
              <p className="text-[16px] font-medium text-[#111827] leading-[24px]">
                Register and create a folio by completing KYC verification and bank
                account authentication
              </p>
            </div>

            <div
              className="absolute w-[280px]"
              style={{ left: "43%", top: "18%", transform: "translate(-50%,0)" }}
            >
              <p className="text-[16px] font-medium text-[#111827] leading-[24px]">
                Select the mutual fund you wish to invest in, enter the amount you
                want to invest
              </p>
            </div>

            <div
              className="absolute text-center w-[200px]"
              style={{ left: "67%", top: "68%", transform: "translate(-50%,0)" }}
            >
              <p className="text-[16px] font-medium text-[#111827] leading-[24px]">
                Make the payment
              </p>
            </div>

            <div
              className="absolute text-center w-[260px]"
              style={{ left: "90%", top: "18%", transform: "translate(-50%,0)" }}
            >
              <p className="text-[16px] font-medium text-[#111827] leading-[24px]">
                Receive a confirmation of your investment
              </p>
            </div>
          </div>

          {/* MOBILE */}
          <div className="md:hidden mt-10">
            <div className="relative">
              <div className="absolute left-[34px] top-[40px] bottom-[40px] w-[2px]">
                <div className="w-full h-full border-l-2 border-dashed border-primary" />
              </div>

              <div className="flex gap-5 items-start py-6">
                <div className="relative z-10">
                  <StepBadge number="01" />
                </div>
                <p className="text-[16px] font-medium text-[#111827] leading-[24px] pt-2">
                  Register and create a folio by completing KYC verification and bank
                  account authentication
                </p>
              </div>

              <div className="flex gap-5 items-start py-6">
                <div className="relative z-10">
                  <StepBadge number="02" />
                </div>
                <p className="text-[16px] font-medium text-[#111827] leading-[24px] pt-2">
                  Select the mutual fund you wish to invest in, enter the amount you
                  want to invest
                </p>
              </div>

              <div className="flex gap-5 items-start py-6">
                <div className="relative z-10">
                  <StepBadge number="03" />
                </div>
                <p className="text-[16px] font-medium text-[#111827] leading-[24px] pt-2">
                  Make the payment
                </p>
              </div>

              <div className="flex gap-5 items-start py-6">
                <div className="relative z-10">
                  <StepBadge number="04" />
                </div>
                <p className="text-[16px] font-medium text-[#111827] leading-[24px] pt-2">
                  Receive a confirmation of your investment
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvestStepsSection;
