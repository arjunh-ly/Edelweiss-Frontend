import advisorIllustration from "../assets/flexi-cap-learn-more.png";
import colors from "../styles/colors";

const CARD_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.08)";

const LearnMoreSection = () => {
  return (
    <section className="w-full">
      <div className="max-w-[1180px] mx-auto px-4">
        <div
          className="rounded-2xl bg-[#EEF5FD] px-6 md:px-8 "
          style={{ boxShadow: CARD_SHADOW }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6 items-center">
            <div>
              <h3 className="text-[#111827] text-[24px] font-semibold leading-7">
                Want to learn more about Flexi Cap Funds?
              </h3>
              <div
                className="mt-2 w-[100px] h-[3px] rounded-full"
                style={{ backgroundColor: colors.primary }}
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
                    type="tel"
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
                <button
                  type="button"
                  className="flex-1 h-[40px] rounded-[10px] text-white text-[16px] font-semibold bg-primary transition-colors duration-300 hover:bg-accent"
                >
                  Start a SIP
                </button>

                <button
                  type="button"
                  className="flex-1 h-[40px] rounded-[10px] border border-primary text-[16px] font-semibold text-primary bg-transparent transition-colors duration-300 hover:bg-primary hover:text-white"
                >
                  Invest Now
                </button>
              </div>
            </div>

            <div className="relative">
              <img
                src={advisorIllustration}
                alt="Learn more illustration"
                className="w-full max-w-[640px] mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnMoreSection;
