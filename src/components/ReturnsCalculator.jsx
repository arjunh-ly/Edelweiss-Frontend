import React, { useMemo, useState } from "react";

const PRIMARY = "#034EA2";
const INVESTED = "#A154A1";
const RETURNS = "#32BCAD";

const fmtINR = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(Number.isFinite(n) ? n : 0)
  );

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const calcSipFV = (monthly, years, annualRatePct) => {
  const r = annualRatePct / 100 / 12;
  const n = Math.round(years * 12);

  const invested = monthly * n;

  if (r === 0) {
    return { invested, total: invested, returns: 0 };
  }

  const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const returns = fv - invested;

  return { invested, total: fv, returns };
};

const calcLumpsumFV = (principal, years, annualRatePct) => {
  const r = annualRatePct / 100;
  const total = principal * Math.pow(1 + r, years);
  const invested = principal;
  const returns = total - invested;

  return { invested, total, returns };
};

const calcGoalSip = (goal, years, annualRatePct) => {
  const r = annualRatePct / 100 / 12;
  const n = Math.round(years * 12);

  if (r === 0) {
    const monthly = goal / n;
    return {
      monthly,
      invested: goal,
      total: goal,
      returns: 0,
    };
  }

  const factor = ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const monthly = goal / factor;
  const invested = monthly * n;
  const total = goal;
  const returns = total - invested;

  return { monthly, invested, total, returns };
};

const Segmented = ({ tabs, value, onChange }) => {
  return (
    <div className="w-full bg-[#F5F6F8] rounded-2xl flex gap-2 px-2">
      {tabs.map((t) => {
        const active = value === t.value;

        return (
          <button
            key={t.value}
            type="button"
            onClick={() => onChange(t.value)}
            className="flex-1 h-[52px] rounded-xl text-[16px] font-medium transition-all duration-500 ease-in-out border-0 outline-none focus:outline-none"
            style={{
              backgroundColor: active ? "#FFFFFF" : "transparent",
              color: "#111827",
              boxShadow: active ? "0 10px 26px rgba(0,0,0,0.10)" : "none",
              border: active ? `1px solid ${PRIMARY}` : "1px solid transparent",
            }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
};

const RangeRow = ({
  label,
  minLabel,
  maxLabel,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
  inputWidthClass = "w-[190px]",
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-1">
        <div className="text-[#111827] text-[16px]  leading-[1.3]">
          {label}
        </div>

        <div
          className={`bg-white rounded-[18px] shadow-[0_6px_18px_rgba(0,0,0,0.08)] px-5 h-[56px] flex items-center justify-between shrink-0 ${inputWidthClass}`}
        >
          <input
            className="w-full text-[#111827] text-[18px] font-semibold outline-none border-0 bg-transparent"
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
            inputMode="numeric"
          />
          <div className="text-[#6B7280] text-[18px] font-semibold pl-3 shrink-0">
            {suffix}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full accent-[#034EA2]"
        />

        <div className="mt-3 flex items-center justify-between text-[#111827] text-[16px]">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
};

const Pie = ({ invested, returns }) => {
  const total = Math.max(1, invested + returns);
  const investedPct = clamp((invested / total) * 100, 0, 100);
  const bg = `conic-gradient(${INVESTED} 0 ${investedPct}%, ${RETURNS} ${investedPct}% 100%)`;

  return (
    <div className="flex items-center justify-center">
      <div
        className="w-[220px] h-[220px] rounded-full"
        style={{ background: bg }}
        aria-label="Investment split chart"
      />
    </div>
  );
};

const SplitBar = ({ invested, returns }) => {
  const total = Math.max(1, invested + returns);
  const investedPct = clamp((invested / total) * 100, 0, 100);
  const returnsPct = 100 - investedPct;

  return (
    <div className="w-full">
      <div className="w-full h-[18px] rounded-full overflow-hidden bg-[#EDEFF3] flex">
        <div style={{ width: `${investedPct}%`, background: INVESTED }} />
        <div style={{ width: `${returnsPct}%`, background: RETURNS }} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span
            className="w-[18px] h-[18px] rounded-full"
            style={{ background: INVESTED }}
          />
          <span className="text-[#111827] text-[14px]">Invested</span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="w-[18px] h-[18px] rounded-full"
            style={{ background: RETURNS }}
          />
          <span className="text-[#111827] text-[14px]">Returns</span>
        </div>
      </div>
    </div>
  );
};

const ReturnsCalculator = () => {
  const tabs = [
    { label: "SIP", value: "sip" },
    { label: "Lumpsum", value: "lumpsum" },
    { label: "Goal SIP", value: "goal" },
  ];

  const [mode, setMode] = useState("sip");

  const [sipAmount, setSipAmount] = useState(10000);
  const [lumpsumAmount, setLumpsumAmount] = useState(500000);
  const [goalAmount, setGoalAmount] = useState(2500000);

  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const computed = useMemo(() => {
    if (mode === "sip") return calcSipFV(sipAmount, years, rate);
    if (mode === "lumpsum") return calcLumpsumFV(lumpsumAmount, years, rate);

    const g = calcGoalSip(goalAmount, years, rate);
    return {
      invested: g.invested,
      total: g.total,
      returns: g.returns,
      monthly: g.monthly,
    };
  }, [mode, sipAmount, lumpsumAmount, goalAmount, years, rate]);

  const titleValue = useMemo(() => {
    if (mode === "goal") return { label: "Goal Value", value: computed.total };
    return { label: "Total Value", value: computed.total };
  }, [mode, computed.total]);

  return (
    <section className="w-full">
      <div className="max-w-[1180px] mx-auto px-4 mt-16">
        <h2 className="text-[24px] leading-[42px] font-semibold text-[#111827]">
          Returns Calculator
        </h2>
        <div className="w-[140px] h-[2px] bg-[#034EA2] rounded-full mt-3" />

        <div className="mt-10 rounded-[22px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] sm:p-6">
          <div className="rounded-[18px] sm:p-2">
            <Segmented tabs={tabs} value={mode} onChange={setMode} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
              <div className="bg-white rounded-[18px] p-3 sm:p-6">
                {mode === "sip" ? (
                  <RangeRow
                    label="Monthly Investment Amount"
                    minLabel="₹500"
                    maxLabel="₹1,00,000"
                    value={sipAmount}
                    min={500}
                    max={100000}
                    step={500}
                    suffix="₹"
                    inputWidthClass="w-[190px]"
                    onChange={(v) =>
                      setSipAmount(clamp(parseInt(v || "0", 10), 500, 100000))
                    }
                  />
                ) : null}

                {mode === "lumpsum" ? (
                  <RangeRow
                    label="Lumpsum Investment Amount"
                    minLabel="₹5,000"
                    maxLabel="₹50,00,000"
                    value={lumpsumAmount}
                    min={5000}
                    max={5000000}
                    step={5000}
                    suffix="₹"
                    inputWidthClass="w-[190px]"
                    onChange={(v) =>
                      setLumpsumAmount(
                        clamp(parseInt(v || "0", 10), 5000, 5000000)
                      )
                    }
                  />
                ) : null}

                {mode === "goal" ? (
                  <RangeRow
                    label="Goal Amount"
                    minLabel="₹1,00,000"
                    maxLabel="₹5,00,00,000"
                    value={goalAmount}
                    min={100000}
                    max={50000000}
                    step={50000}
                    suffix="₹"
                    inputWidthClass="w-[190px]"
                    onChange={(v) =>
                      setGoalAmount(
                        clamp(parseInt(v || "0", 10), 100000, 50000000)
                      )
                    }
                  />
                ) : null}

                <div className="mt-10">
                  <RangeRow
                    label="Investment Period (Years)"
                    minLabel="1 year"
                    maxLabel="20 years"
                    value={years}
                    min={1}
                    max={20}
                    step={1}
                    suffix="Years"
                    inputWidthClass="w-[190px]"
                    onChange={(v) =>
                      setYears(clamp(parseInt(v || "1", 10), 1, 20))
                    }
                  />
                </div>

                {mode !== "sip" ? (
                  <div className="mt-10">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[#111827] text-[16px] font-medium leading-[1.3]">
                        Expected Return Rate
                      </div>

                      <div className="bg-white rounded-[18px] shadow-[0_6px_18px_rgba(0,0,0,0.08)] px-5 h-[56px] flex items-center justify-between shrink-0 w-[190px]">
                        <input
                          className="w-full text-[#111827] text-[18px] font-semibold outline-none border-0 bg-transparent"
                          value={String(rate)}
                          onChange={(e) =>
                            setRate(
                              clamp(parseInt(e.target.value || "0", 10), 1, 20)
                            )
                          }
                          inputMode="numeric"
                        />
                        <div className="text-[#6B7280] text-[16px] font-semibold pl-3 shrink-0">
                          % p.a.
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <input
                        type="range"
                        min={1}
                        max={20}
                        step={0.5}
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className="w-full accent-[#034EA2]"
                      />

                      <div className="mt-3 flex items-center justify-between text-[#111827] text-[16px]">
                        <span>1%</span>
                        <span>20%</span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <div className="text-[#111827]">
                    <div className="text-[14px] text-[#6B7280]">
                      {mode === "goal"
                        ? "Estimated Monthly SIP"
                        : "Expected Return Rate"}
                    </div>

                    <div className="text-[22px] font-semibold">
                      {mode === "goal"
                        ? `₹${fmtINR(computed.monthly || 0)}`
                        : `${rate}% p.a.`}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="h-[54px] w-full sm:w-[260px] rounded-xl text-white font-medium border-0 outline-none focus:outline-none bg-[#034EA2] hover:bg-[#8DC63F] transition-colors duration-300 active:scale-[0.98]"
                  >
                    Start a SIP
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-[18px] p-5 sm:p-7 shadow-[0_10px_26px_rgba(0,0,0,0.08)]">
                <div className="text-[#111827] text-[18px] font-semibold">
                  Investment Summary
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:items-center">
                  <div className="flex items-center gap-4">
                    <div className="text-[#111827] text-[16px] font-medium">
                      {titleValue.label}
                    </div>
                    <div className="text-[#111827] text-[18px] font-semibold">
                      ₹{fmtINR(titleValue.value)}
                    </div>
                  </div>

                  <Pie invested={computed.invested} returns={computed.returns} />
                </div>

                <div className="mt-10">
                  <SplitBar
                    invested={computed.invested}
                    returns={computed.returns}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnsCalculator;