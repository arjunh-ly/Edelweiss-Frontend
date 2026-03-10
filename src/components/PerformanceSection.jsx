// src/components/PerformanceSection.jsx
import React, { useMemo, useState } from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Filler,
  CategoryScale
);

const viewTabs = ["NAV", "Cumulative"];
const rangeTabs = ["1Y", "2Y", "3Y", "5Y", "7Y", "10Y", "Since Inception"];

const addMonths = (d, months) => {
  const dt = new Date(d);
  dt.setMonth(dt.getMonth() + months);
  return dt;
};

const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);

const formatINR = (n) => {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `₹${Number(n).toFixed(2)}`;
  }
};

const makeDummyMonthlySeries = () => {
  const now = startOfMonth(new Date());
  const totalMonths = 10 * 12;

  let value = 12.5;
  const points = [];

  for (let i = totalMonths - 1; i >= 0; i -= 1) {
    const date = addMonths(now, -i);

    const t = (totalMonths - i) / totalMonths;
    const wave = Math.sin((totalMonths - i) / 6) * 1.2;
    const wave2 = Math.cos((totalMonths - i) / 11) * 0.6;
    const drift = t * 18.0;
    const noise = (Math.random() - 0.5) * 0.9;

    value = Math.max(
      7,
      value + 0.12 + wave * 0.05 + wave2 * 0.04 + noise * 0.06
    );
    const nav = value + drift;

    points.push({
      x: date.toISOString(),
      y: Number(nav.toFixed(2)),
    });
  }

  return points;
};

const toCumulative = (pts) => {
  if (!pts.length) return pts;
  const base = pts[0].y;
  return pts.map((p) => ({
    x: p.x,
    y: Number((((p.y - base) / base) * 100).toFixed(2)),
  }));
};

const filterByRange = (pts, rangeKey) => {
  if (rangeKey === "Since Inception") return pts;

  const yearsMap = { "1Y": 1, "2Y": 2, "3Y": 3, "5Y": 5, "7Y": 7, "10Y": 10 };
  const years = yearsMap[rangeKey] || 1;

  const now = new Date();
  const cutoff = new Date(now.getFullYear() - years, now.getMonth(), 1);

  return pts.filter((p) => new Date(p.x) >= cutoff);
};

const getXAxisTimeConfig = (rangeKey) => {
  if (rangeKey === "1Y") {
    return {
      unit: "month",
      stepSize: 1,
      displayFormats: { month: "MMM yy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  if (rangeKey === "2Y") {
    return {
      unit: "month",
      stepSize: 2,
      displayFormats: { month: "MMM yy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  if (rangeKey === "3Y") {
    return {
      unit: "month",
      stepSize: 3,
      displayFormats: { month: "MMM yy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  if (rangeKey === "5Y") {
    return {
      unit: "year",
      stepSize: 1,
      displayFormats: { year: "yyyy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  if (rangeKey === "7Y") {
    return {
      unit: "year",
      stepSize: 1,
      displayFormats: { year: "yyyy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  if (rangeKey === "10Y") {
    return {
      unit: "year",
      stepSize: 1,
      displayFormats: { year: "yyyy" },
      tooltipFormat: "dd MMM yyyy",
    };
  }

  return {
    unit: "year",
    stepSize: 1,
    displayFormats: { year: "yyyy" },
    tooltipFormat: "dd MMM yyyy",
  };
};

const RangePill = ({ active, children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-[40px] px-[18px] rounded-[14px] font-['Roboto'] text-[16px] leading-[145%] text-center shrink-0 border-0 outline-none transition-all duration-200"
      style={{
        fontWeight: active ? 500 : 400,
        backgroundColor: active ? "#0553A8" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#111111",
        boxShadow: active
          ? "0 4px 10px rgba(5,83,168,0.18)"
          : "0 1px 2px rgba(16,24,40,0.06), 0 2px 8px rgba(16,24,40,0.08)",
      }}
    >
      {children}
    </button>
  );
};

const PerformanceSection = () => {
  const [mode, setMode] = useState("NAV");
  const [range, setRange] = useState("1Y");

  const [calcTab, setCalcTab] = useState("SIP");
  const [sipAmount, setSipAmount] = useState("5000");
  const [sipDate, setSipDate] = useState("2026-03-07");

  const baseNAV = useMemo(() => makeDummyMonthlySeries(), []);
  const navFiltered = useMemo(
    () => filterByRange(baseNAV, range),
    [baseNAV, range]
  );
  const cumFiltered = useMemo(() => toCumulative(navFiltered), [navFiltered]);

  const series = mode === "NAV" ? navFiltered : cumFiltered;

  const topValue = useMemo(() => {
    const last = series[series.length - 1];
    if (!last) return null;
    return last.y;
  }, [series]);

  const xTime = useMemo(() => getXAxisTimeConfig(range), [range]);

  const options = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "rgba(17,24,39,0.92)",
          titleColor: "#FFFFFF",
          bodyColor: "#FFFFFF",
          padding: 12,
          displayColors: false,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              if (mode === "NAV") return `NAV: ${formatINR(v)}`;
              return `Cumulative: ${v}%`;
            },
          },
        },
      },
      scales: {
        x: {
          type: "time",
          time: xTime,
          offset: false,
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            padding: 10,
            color: "#7A7A7A",
            font: {
              family: "Roboto",
              size: 12,
              weight: 400,
            },
          },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          ticks: {
            padding: 10,
            color: "#7A7A7A",
            font: {
              family: "Roboto",
              size: 12,
              weight: 400,
            },
            callback: (v) => (mode === "NAV" ? v : `${v}%`),
          },
          grid: { color: "rgba(17,24,39,0.08)" },
          border: { display: false },
        },
      },
    };
  }, [mode, xTime]);

  const data = useMemo(() => {
    return {
      datasets: [
        {
          data: series,
          borderWidth: 4,
          borderColor: "#9B4FA7",
          pointRadius: 0,
          tension: 0.35,
          fill: false,
        },
      ],
    };
  }, [series]);

  return (
    <div className="w-full">
      <div className="max-w-[1180px] mx-auto px-4 mt-20">
        <h2 className="text-[24px] leading-[42px] text-[#111827] font-['Roboto'] font-semibold tracking-[0]">
          Performance
        </h2>

        <div className="w-[120px] h-[3px] bg-[#034EA2] rounded-full mt-3" />

        <div className="mt-5 flex flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="min-w-[500px] bg-white rounded-[18px] flex gap-[2px]"
              style={{
                boxShadow:
                  "0 1px 2px rgba(16,24,40,0.06), 0 2px 10px rgba(16,24,40,0.08)",
              }}
            >
              {viewTabs.map((t) => {
                const active = mode === t;

                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setMode(t)}
                    className="h-[40px] flex-1 rounded-[18px] font-['Roboto'] text-[16px] leading-[145%] text-center border-0 outline-none transition-all duration-200"
                    style={{
                      fontWeight: active ? 500 : 400,
                      backgroundColor: active ? "#0553A8" : "#FFFFFF",
                      color: active ? "#FFFFFF" : "#111111",
                      boxShadow: active
                        ? "0 4px 10px rgba(5,83,168,0.18)"
                        : "none",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <div className="w-full lg:w-auto overflow-x-auto">
              <div className="flex items-center gap-3 w-max pr-2">
                {rangeTabs.map((t) => (
                  <RangePill
                    key={t}
                    active={range === t}
                    onClick={() => setRange(t)}
                  >
                    {t}
                  </RangePill>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
              <div className="min-w-0">
                <div className="flex items-end gap-3">
                  <div className="font-['Roboto'] font-semibold text-[24px] leading-[145%] text-[#111827]">
                    {topValue == null
                      ? "—"
                      : mode === "NAV"
                      ? formatINR(topValue)
                      : `${topValue}%`}
                  </div>

                  <div className="font-['Roboto'] font-normal text-[16px] leading-[145%] text-[#6B7280] mb-[3px]">
                    as on{" "}
                    {new Date().toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <div className="mt-6 h-[300px]">
                  <Line data={data} options={options} />
                </div>

                <div className="mt-4 text-[#6B7280] text-[13px]">
                  *NAV data shown from 27 Feb 2025 till 24 Feb 2026
                </div>
              </div>

              <div className="rounded-2xl p-5 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
                <div
                  className="bg-[#F3F3F3] rounded-[16px] flex gap-[0px]"
                  style={{
                    boxShadow: "inset 0 1px 2px rgba(16,24,40,0.04)",
                  }}
                >
                  {["SIP", "Lumpsum"].map((t) => {
                    const active = calcTab === t;

                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setCalcTab(t)}
                        className="flex-1 h-[40px] rounded-[14px] font-['Roboto'] text-[16px] leading-[145%] text-center border-0 outline-none transition-all duration-200"
                        style={{
                          fontWeight: active ? 400 : 300,
                          backgroundColor: active ? "#FFFFFF" : "transparent",
                          color: "#111111",
                          boxShadow: active
                            ? "inset 0 0 0 1.5px #0553A8, 0 2px 8px rgba(16,24,40,0.06)"
                            : "none",
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-7">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[#111827] text-[16px] font-medium">SIP Amount</div>

                    <div className="w-[235px] max-w-full relative">
                      <input
                        value={sipAmount}
                        onChange={(e) => setSipAmount(e.target.value)}
                        className="w-full h-[52px] rounded-xl bg-white px-4 pr-10 text-[16px] text-[#111827] border border-[#E5E7EB] outline-none focus:border-[#034EA2]"
                        inputMode="numeric"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-[16px]">
                        ₹
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[#111827] text-[16px] font-medium">Monthly SIP Date</div>

                    <div className="w-[240px] max-w-full relative">
                      <input
                        type="date"
                        value={sipDate}
                        onChange={(e) => setSipDate(e.target.value)}
                        className="w-full h-[52px] rounded-xl bg-white px-4 text-[16px] text-[#111827] border border-[#E5E7EB] outline-none focus:border-[#034EA2]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full h-[45px] rounded-xl font-semibold text-white border-0 outline-none bg-[#034EA2] hover:bg-[#8DC63F] transition-colors duration-300 active:scale-[0.98]"
                  >
                    Start a SIP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSection;
