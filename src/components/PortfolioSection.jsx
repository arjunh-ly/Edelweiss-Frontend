// src/components/PortfolioSection.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
);

const FUND_LINE = "#7BC043"; // green
const BENCH_LINE = "#F97316"; // orange

const TogglePill = ({ activeKey, setActiveKey }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#EEF2F7]  flex gap-1 w-full max-w-[520px]">
      <button
        type="button"
        onClick={() => setActiveKey("years")}
        className={[
          "flex-1 rounded-lg py-1 text-[16px] font-semibold transition",
          activeKey === "years"
            ? "text-white bg-primary"
            : "text-[#111827] bg-white hover:bg-[#F8FAFC]",
        ].join(" ")}
      >
        Returns over the years
      </button>

      <button
        type="button"
        onClick={() => setActiveKey("rolling")}
        className={[
          "flex-1 rounded-lg py-3 text-[14px] font-semibold transition",
          activeKey === "rolling"
            ? "text-white bg-primary"
            : "text-[#111827] bg-white hover:bg-[#F8FAFC]",
        ].join(" ")}
      >
        Rolling Returns
      </button>
    </div>
  );
};

const PeriodPills = ({ active, onChange }) => {
  const periods = ["1Y", "2Y", "3Y", "5Y", "7Y", "10Y", "Since Inception"];

  return (
    <div className="flex flex-wrap gap-3 justify-start md:justify-end">
      {periods.map((p) => {
        const isActive = active === p;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={[
              "rounded-xl px-5 py-3 text-[14px] font-semibold border shadow-sm transition",
              isActive
                ? "text-white border-transparent bg-primary"
                : "text-[#111827] bg-white border-[#EEF2F7] hover:bg-[#F8FAFC]",
            ].join(" ")}
          >
            {p}
          </button>
        );
      })}
    </div>
  );
};

const buildDataset = (labels) => {
  const fund = [
    -8, -4, -2, 1, 6, 8, 5, 9, 12, 15, 14, 16, 20, 22, 28, 33, 36, 38, 45,
    42, 35, 28, 26, 29, 18, 31, 30, 33, 28, 30,
  ];
  const bench = [
    -9, -6, -4, -3, 2, 5, -8, -2, 3, 6, 4, 8, 12, 18, 22, 26, 30, 35, 38,
    34, 30, 25, 24, 26, 20, 29, 26, 27, 22, 24,
  ];

  const safeFund = fund.slice(0, labels.length);
  const safeBench = bench.slice(0, labels.length);

  return { fund: safeFund, bench: safeBench };
};

const getLabelsForPeriod = (period) => {
  if (period === "1Y") return ["Mar", "May", "Jul", "Sep", "Nov", "Jan"];
  if (period === "2Y") return ["2024 Q2", "Q3", "Q4", "2025 Q1", "Q2", "Q3"];
  if (period === "3Y") return ["2023", "2023.5", "2024", "2024.5", "2025"];
  if (period === "5Y") return ["2021", "2022", "2023", "2024", "2025"];
  if (period === "7Y") return ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  if (period === "10Y") return ["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  return [
    "2016",
    "2016.5",
    "2017",
    "2017.5",
    "2018",
    "2018.5",
    "2019",
    "2019.5",
    "2020",
    "2020.5",
    "2021",
    "2021.5",
    "2022",
    "2022.5",
    "2023",
    "2023.5",
    "2024",
    "2024.5",
    "2025",
  ];
};

const PortfolioSection = () => {
  const [view, setView] = useState("years"); // years | rolling
  const [period, setPeriod] = useState("1Y");

  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const labels = useMemo(() => getLabelsForPeriod(period), [period]);
  const series = useMemo(() => buildDataset(labels), [labels]);

  const legendFundValue = 14.7;
  const legendBenchValue = 14.7;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: `Edelweiss Flexi Cap Fund  ↑${legendFundValue}`,
            data: series.fund,
            borderColor: FUND_LINE,
            backgroundColor: "transparent",
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.35,
          },
          {
            label: `NIFTY 500 TRI  ↑${legendBenchValue}`,
            data: series.bench,
            borderColor: BENCH_LINE,
            backgroundColor: "transparent",
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 5,
            tension: 0.35,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              pointStyle: "line",
              boxWidth: 34,
              boxHeight: 4,
              color: "#111827",
              font: { size: 13, weight: "600" },
              padding: 22,
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: "rgba(17,24,39,0.95)",
            titleColor: "#fff",
            bodyColor: "#fff",
            padding: 12,
            displayColors: true,
            callbacks: {
              label: (ctx2) => {
                const v = ctx2.parsed.y;
                return `${ctx2.dataset.label.split("  ")[0]}: ${v}%`;
              },
            },
          },
        },
        scales: {
          y: {
            title: {
              display: true,
              text: "Returns (%)",
              color: "#6B7280",
              font: { size: 12, weight: "600" },
              padding: { bottom: 8 },
            },
            grid: { color: "#EEF2F7" },
            ticks: { color: "#111827" },
          },
          x: {
            title: {
              display: true,
              text: "Years",
              color: "#6B7280",
              font: { size: 12, weight: "600" },
              padding: { top: 10 },
            },
            grid: { color: "#F3F4F6" },
            ticks: { color: "#111827", maxRotation: 0 },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [labels, series, view, legendFundValue, legendBenchValue]);

  return (
    <section className="w-full py-10">
      <div className="max-w-[1180px] mx-auto px-4">
        <div>
          <h3 className="text-[#111827] text-[22px] font-semibold leading-7">
            Portfolio
          </h3>
          <div
            className="mt-2 w-[110px] h-[3px] rounded-full bg-primary"
          />
        </div>

        <div className="mt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TogglePill activeKey={view} setActiveKey={setView} />
          <PeriodPills active={period} onChange={setPeriod} />
        </div>

        <div className="mt-7 bg-white rounded-2xl shadow-md border border-[#EEF2F7] px-4 sm:px-8 py-6 sm:py-8">
          <div className="w-full h-[420px] sm:h-[460px]">
            <canvas ref={canvasRef} />
          </div>

          <div className="mt-6 text-[#9CA3AF] text-[12px] leading-5">
            <div>Performance as on 24 Feb 2026.</div>
            <div>
              Past performance may or may not be sustained in the future and
              should not be used as basis for comparison with other investments.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
