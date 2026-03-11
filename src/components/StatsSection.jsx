import fundIcon from "../assets/fund.png";
import cagrIcon from "../assets/cagr.png";
import benchmarkIcon from "../assets/benchmark.png";
import expenseIcon from "../assets/expense.png";
import navIcon from "../assets/nav.png";
import riskIcon from "../assets/risk.png";

const StatItem = ({ icon, title, value, sub }) => (
  <div className="flex items-start gap-4">
    <div className="w-[55px] h-[55px] bg-[#F9F9F9] p-1 rounded-full flex items-center justify-center shrink-0">
      <img src={icon} alt={title} className="w-[40px] h-[40px] object-contain" />
    </div>

    <div className="min-w-0 font-['Roboto']">
      <p className="text-[#6B7280] text-[16px] leading-[145%] font-normal m-0">
        {title}
      </p>

      <p className="text-[#111827] text-[20px] leading-[145%] font-semibold mt-1 mb-0">
        {value}
      </p>

      {sub ? (
        <p className="text-[#9CA3AF] text-[14px] leading-[145%] font-normal mt-1 mb-0">
          {sub}
        </p>
      ) : null}
    </div>
  </div>
);

const StatsSection = () => {
  return (
    <div className="w-full -mt-28">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="-mt-12 relative z-20">
          <div className="bg-white rounded-2xl shadow-md px-6 py-6 sm:px-10 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 sm:gap-x-12 sm:gap-y-10">
              <StatItem
                icon={fundIcon}
                title="Fund Size (AUM)"
                value="₹995.91 Cr"
                sub="as on 08 Feb 2026"
              />

              <StatItem
                icon={cagrIcon}
                title="CAGR 1 Year"
                value="222.87%"
                sub="as on 31 Jan 2026"
              />

              <StatItem
                icon={benchmarkIcon}
                title="Benchmark"
                value="NIFTY 500 TRI"
              />

              <StatItem
                icon={expenseIcon}
                title="Expense Ratio"
                value="0.85%"
              />

              <StatItem
                icon={navIcon}
                title="NAV"
                value="$24.8"
                sub="as on 24 Feb, 2026"
              />

              <StatItem
                icon={riskIcon}
                title="Risk Level"
                value="Moderately High"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;