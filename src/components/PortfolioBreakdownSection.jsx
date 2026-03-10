import React, { useEffect, useRef } from "react";
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const PRIMARY = "#034EA2";
const CARD_BORDER = "#EEF2F7";
const CARD_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.08)";

const sectorAllocations = [
  { name: "Financial Services", value: "36.12%" },
  { name: "Information Technology", value: "7.8%" },
  { name: "Automobile and Auto Components", value: "6.55%" },
  { name: "Healthcare", value: "6.11%" },
  { name: "Fast Moving Consumer Goods", value: "6.03%" },
];

const marketCapData = {
  labels: ["Small Cap", "Mid Cap", "Large Cap"],
  values: [17, 39, 44],
  colors: ["#A45AB5", "#39B8B0", "#78CF1D"],
};

const topHoldings = [
  {
    name: "HDFC BANK LTD",
    sector: "Financial Services",
    asset: 6.51,
    color: "#F47B20",
  },
  {
    name: "ICICI BANK LTD",
    sector: "Financial Services",
    asset: 4.87,
    color: "#F47B20",
  },
  {
    name: "RELIANCE INDUSTRIES LTD",
    sector: "Oil, Gas & Consumable Fuels",
    asset: 3.55,
    color: "#A45AB5",
  },
  {
    name: "STATE BANK OF INDIA",
    sector: "Financial Services",
    asset: 3.19,
    color: "#F47B20",
  },
  {
    name: "LARSEN & TOUBRO LTD",
    sector: "Construction",
    asset: 3.04,
    color: "#39B8B0",
  },
  {
    name: "INFOSYS LTD",
    sector: "Information Technology",
    asset: 2.8,
    color: "#78CF1D",
  },
];

const SectionHeading = ({ title }) => {
  return (
    <div>
      <h3 className="text-[#111827] text-[22px] font-semibold leading-7">
        {title}
      </h3>
      <div
        className="mt-2 w-[110px] h-[3px] rounded-full"
        style={{ backgroundColor: PRIMARY }}
      />
    </div>
  );
};

const PortfolioBreakdownSection = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    const createChart = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        timeoutId = setTimeout(createChart, 100);
        return;
      }

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      const existingChart = Chart.getChart(canvas);
      if (existingChart) {
        existingChart.destroy();
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: marketCapData.labels,
          datasets: [
            {
              data: marketCapData.values,
              backgroundColor: marketCapData.colors,
              borderWidth: 0,
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 700,
          },
          plugins: {
            tooltip: {
              backgroundColor: "rgba(17,24,39,0.95)",
              titleColor: "#fff",
              bodyColor: "#fff",
              padding: 12,
              callbacks: {
                label: (ctx2) => `${ctx2.label}: ${ctx2.parsed}%`,
              },
            },
            legend: {
              position: "right",
              align: "center",
              labels: {
                usePointStyle: true,
                pointStyle: "circle",
                boxWidth: 10,
                boxHeight: 10,
                padding: 18,
                color: "#374151",
                font: {
                  size: 13,
                  weight: "500",
                },
              },
            },
          },
        },
      });
    };

    timeoutId = setTimeout(createChart, 0);

    return () => {
      clearTimeout(timeoutId);

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      if (canvasRef.current) {
        const existingChart = Chart.getChart(canvasRef.current);
        if (existingChart) {
          existingChart.destroy();
        }
      }
    };
  }, []);

  return (
    <section className="w-full ">
      <div className="max-w-[1180px] mx-auto px-4">
        {/* <SectionHeading title="Portfolio Breakdown" /> */}

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-7">
          <div
            className="bg-white rounded-2xl border px-5 sm:px-6 py-5 sm:py-6"
            style={{
              borderColor: CARD_BORDER,
              boxShadow: CARD_SHADOW,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-[#111827] text-[18px] font-semibold leading-6">
                Sector Allocations
              </h4>
              <p className="text-[#9CA3AF] text-[13px] leading-5 whitespace-nowrap">
                (As on 31 Jan 2026)
              </p>
            </div>

            <div className="mt-5 divide-y divide-[#F1F5F9]">
              {sectorAllocations.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <p className="text-[#111827] text-[15px] leading-6">
                    {item.name}
                  </p>
                  <p className="text-[#111827] text-[15px] font-medium leading-6">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                className="text-[14px] font-semibold text-[#0B63CE] hover:opacity-80 transition"
              >
                View all sectors &gt;
              </button>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl border px-5 sm:px-6 py-5 sm:py-6"
            style={{
              borderColor: CARD_BORDER,
              boxShadow: CARD_SHADOW,
            }}
          >
            <h4 className="text-[#111827] text-[18px] font-semibold leading-6">
              Market Cap Allocations
            </h4>

            <div className="mt-4 flex items-center justify-center">
              <div className="w-full max-w-[360px] h-[260px] sm:h-[280px] min-w-0 relative">
                <canvas ref={canvasRef} />
              </div>
            </div>

            <p className="mt-2 text-center text-[#111827] text-[14px] leading-5">
              Market Cap
            </p>
          </div>
        </div>

        <div
          className="mt-8 bg-white rounded-2xl border overflow-hidden"
          style={{
            borderColor: CARD_BORDER,
            boxShadow: CARD_SHADOW,
          }}
        >
          <div className="px-5 sm:px-6 pt-5">
            <h4 className="text-[#111827] text-[20px] font-semibold leading-6">
              Top Holdings
            </h4>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="bg-[#EAF3FB]">
                  <th className="text-left px-6 py-4 text-[#111827] text-[20px] font-semibold">
                    Name
                  </th>
                  <th className="text-left px-6 py-4 text-[#111827] text-[20px] font-semibold">
                    Sector
                  </th>
                  <th className="text-left px-6 py-4 text-[#111827] text-[20px] font-semibold">
                    Assets
                  </th>
                </tr>
              </thead>

              <tbody>
                {topHoldings.map((item) => (
                  <tr key={item.name} className="border-t border-[#E5EDF5]">
                    <td className="px-6 py-4 text-[#111827] text-[16px] leading-5">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-[#111827] text-[16px] leading-5">
                      {item.sector}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="min-w-[44px] text-[#111827] text-[16px] leading-5">
                          {item.asset}%
                        </span>

                        <div className="w-[200px] h-[7px] rounded-full bg-[#EEF2F7] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${Math.min(item.asset * 12, 100)}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 flex justify-end">
            <button
              type="button"
              className="text-[14px] font-semibold text-[#0B63CE] hover:opacity-80 transition"
            >
              View all holdings &gt;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioBreakdownSection;