import { TrendingUp, Target, BarChart2,ChevronRight } from "lucide-react";

const FeatureCard = ({ title, desc, icon }) => {
  return (
    <div
      className="
        group relative overflow-hidden bg-white
        shadow-[0_18px_40px_rgba(0,0,0,0.12)]
        rounded-[20px]
        w-full max-w-[300px]
        h-[280px]
      "
    >
      <div
        className="absolute -left-[55%] -bottom-[55%] w-[170%] h-[170%] rounded-full bg-primary
                   opacity-0 group-hover:opacity-100
                   scale-0 group-hover:scale-[1.35]
                   transition-all duration-[1200ms] ease-out"
        style={{ transformOrigin: "bottom left" }}
      />

      <div className="relative z-10 h-full p-7 flex flex-col justify-between transition-opacity duration-300 ease-out group-hover:opacity-0">
        <h3 className="text-primary font-semibold text-[22px] leading-7">
          {title}
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-primary text-sm font-medium">Read More</span>
          <div className="w-10 h-10 rounded-full bg-[#EEF2F7] flex items-center justify-center text-primary">
            <span className="text-lg">↗</span>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-0 z-10 px-6 pt-5 pb-5 opacity-0 group-hover:opacity-100
                   transition-opacity duration-400 ease-out
                   flex flex-col"
      >
        <div className="h-[46px] flex items-start">
          <div className="w-[44px] h-[44px] rounded-full bg-white/15 flex items-center justify-center">
            {icon && <span className="text-white">{icon}</span>}
          </div>
        </div>

        <h3 className="text-white font-semibold text-[20px] leading-7 mt-3">
          {title}
        </h3>

        <p className="text-white/90 text-[13px] leading-5 mt-2 flex-1">
          {desc}
        </p>
      </div>
    </div>
  );
};

const WhyInvestBlock = () => {
  return (
    <div
      className="
        w-full max-w-[279px]
        h-[261px]
        flex flex-col justify-between
      "
    >
      <h3 className="text-black text-[28px] leading-[38px] font-semibold">
        Why invest in
        <br />
        Edelweiss Flexi Cap
        <br />
        Fund?
      </h3>

      <button
        className="w-full h-[52px] rounded-[14px]
                   border border-primary text-primary
                   px-5 font-medium text-[14px]
                   flex items-center justify-between
                   transition duration-300 hover:bg-primary hover:text-white"
      >
        <span>Start your investment journey</span>
<ChevronRight size={18} />      </button>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1180px] mx-auto px-4 mt-16">
        <h2 className="font-['Roboto'] font-semibold text-[24px] leading-[145%] tracking-[0] text-[#111827]">
          What is a Flexi Cap Fund?
        </h2>

        <div className="w-[140px] h-[3px] bg-primary rounded-full mt-3" />

        <p className="font-['Roboto'] font-normal text-[14px] leading-[145%] tracking-[0] text-[#111827] mt-6 max-w-[650px]">
          A Flexi Cap Fund is an open-ended dynamic equity scheme that invests
          across large, mid, and small cap stocks with the flexibility to adjust
          allocations based on market opportunities.
        </p>

        <div className="mt-4 sm:mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 items-start">
          <div className="flex justify-center sm:justify-start">
            <FeatureCard
              title="Steady returns"
              desc="Consistent returns that outperform the market since the investment is allocated in companies across the market capitalisation."
              icon={<TrendingUp size={22} strokeWidth={2} />}
            />
          </div>

          <div className="flex justify-center sm:justify-start">
            <FeatureCard
              title="Optimal Gains"
              desc="The dynamic allocation of a flexi cap fund reduces risk compared to mid or small cap funds, allowing managers to capture the best market opportunities as they arise."
              icon={<Target size={22} strokeWidth={2} />}
            />
          </div>

          <div className="flex justify-center sm:justify-start">
            <FeatureCard
              title="Fund Performance"
              desc="Regular portfolio reviews by fund managers to keep investments aligned with objectives and risk levels, optimizing returns while minimizing risk."
              icon={<BarChart2 size={22} strokeWidth={2} />}
            />
          </div>

          <div className="flex justify-center sm:justify-start">
            <WhyInvestBlock />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
