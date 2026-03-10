import React, { useMemo, useState } from "react";

const PRIMARY = "#034EA2";

const HowFundWorksSection = () => {
  const cards = useMemo(
    () => [
      {
        step: "01",
        title: "Research & Analysis",
        desc: [
          "Our fund managers analyze thousands of companies across all market caps to identify the best opportunities.",
          "Deep fundamental research combined with quantitative analysis to find high-quality businesses with sustainable competitive advantages.",
        ],
      },
      {
        step: "02",
        title: "Portfolio Construction",
        desc: [
          "Build a diversified portfolio across sectors and market caps based on conviction and market outlook.",
          "Strategic allocation across large-cap stability, mid-cap growth, and small-cap potential to optimize risk-adjusted returns.",
        ],
      },
      {
        step: "03",
        title: "Active Management",
        desc: [
          "Continuously monitor and rebalance the portfolio to adapt to changing market conditions and opportunities.",
          "Dynamic rebalancing ensures we capitalize on emerging opportunities while managing downside risk effectively.",
        ],
      },
      {
        step: "04",
        title: "Deliver Returns",
        desc: [
          "Aim to generate consistent long-term wealth creation while managing downside risks.",
          "Focus on sustainable wealth creation through disciplined investment process and rigorous risk management.",
        ],
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-14">
      <div className="max-w-[1180px] mx-auto px-4">
        <h2 className="text-[24px] leading-[42px] font-semibold text-[#111827]">
          How does this fund work?
        </h2>
        <div className="w-[140px] h-[3px] bg-[#034EA2] rounded-full mt-3" />

        <div className="mt-14">
          <div
            className="flex flex-col lg:flex-row gap-5 items-stretch w-full"
            onMouseLeave={() => setActiveIndex(0)}
          >
            {cards.map((c, idx) => {
              const active = idx === activeIndex;

              return (
                <div
                  key={c.step}
                  className="w-full min-w-0"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  tabIndex={0}
                  style={{
                    flex: active ? "2.2 1 0%" : "1 1 0%",
                    transition: "flex 650ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    className="relative rounded-[18px] overflow-hidden h-auto lg:h-[340px] w-full"
                    style={{
                      backgroundColor: active ? PRIMARY : "#FFFFFF",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
                      transition: "background-color 500ms ease, box-shadow 500ms ease",
                    }}
                  >
                    <div className="p-6 lg:p-7 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="w-[64px] h-[64px] rounded-full flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: active ? "#FFFFFF" : PRIMARY,
                            transition: "background-color 500ms ease",
                          }}
                        >
                          <span
                            className="text-[20jpx] font-semibold"
                            style={{
                              color: active ? PRIMARY : "#FFFFFF",
                              transition: "color 500ms ease",
                            }}
                          >
                            {c.step}
                          </span>
                        </div>

                        <div
                          className="text-[22px] leading-none shrink-0"
                          style={{
                            color: active ? "#FFFFFF" : PRIMARY,
                            transition: "color 500ms ease",
                          }}
                        >
                          ↗
                        </div>
                      </div>

                      <div className="mt-8 flex-1 flex flex-col min-w-0">
                        <div
                          className="text-[18px] sm:text-[20px] font-semibold break-words"
                          style={{
                            color: active ? "#FFFFFF" : PRIMARY,
                            transition:
                              "color 500ms ease, transform 550ms cubic-bezier(0.22, 1, 0.36, 1)",
                            transform: active ? "translateY(0px)" : "translateY(18px)",
                          }}
                        >
                          {c.title}
                        </div>

                        <div
                          className="mt-5 space-y-5 hidden lg:block"
                          style={{
                            opacity: active ? 1 : 0,
                            transform: active ? "translateY(0px)" : "translateY(-6px)",
                            transition:
                              "opacity 450ms ease 120ms, transform 450ms ease 120ms",
                            pointerEvents: active ? "auto" : "none",
                          }}
                        >
                          {c.desc.map((p) => (
                            <p
                              key={p}
                              className="text-[14px] leading-[24px]"
                              style={{ color: "rgba(255,255,255,0.92)" }}
                            >
                              {p}
                            </p>
                          ))}
                        </div>

                        <div className="lg:hidden mt-5">
                          {active ? (
                            <div className="space-y-4">
                              {c.desc.map((p) => (
                                <p
                                  key={p}
                                  className="text-[14px] leading-[24px]"
                                  style={{ color: "rgba(255,255,255,0.92)" }}
                                >
                                  {p}
                                </p>
                              ))}
                            </div>
                          ) : null}
                        </div>

                        <div className="hidden lg:block flex-1" />
                      </div>

                      <button
                        type="button"
                        className="absolute inset-0 outline-none focus:outline-none"
                        aria-label={`Open ${c.title}`}
                        onClick={() => setActiveIndex(idx)}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <style>{`
            @media (prefers-reduced-motion: reduce) {
              [tabindex="0"] {
                transition: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default HowFundWorksSection;