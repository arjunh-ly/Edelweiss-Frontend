import React, { useMemo, useState } from "react";
import investor1 from "../assets/investor-1.png";
import investor2 from "../assets/investor-2.png";
import investor3 from "../assets/investor-3.png";
import doubleIcon from "../assets/Double.png";

const PRIMARY = "#034EA2";
const CARD_BORDER = "#EEF2F7";
const CARD_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.08)";

const testimonialsData = [
  {
    id: 1,
    image: investor1,
    text: "I've been investing in this flexi cap fund for the past 3 years and the returns have been exceptional. The fund managers' ability to navigate market volatility is impressive.",
    name: "Priya Sharma",
    meta: "Mumbai, Investor for 5+ years",
  },
  {
    id: 2,
    image: investor2,
    text: "As a long-term investor, I appreciate the flexibility and diversification this fund offers. It's become a core holding in my portfolio.",
    name: "Arun Verma",
    meta: "Bangalore, Investor for 10+ years",
  },
  {
    id: 3,
    image: investor3,
    text: "The consistent performance and transparent communication from the fund house give me confidence in my investment decisions. Highly recommended!",
    name: "Sneha Patel",
    meta: "Delhi, Investor for 2+ years",
  },
];

const QuoteIcon = () => {
  return (
    <img
      src={doubleIcon}
      alt="Quote"
      className="w-[30px] h-[23px] object-contain"
    />
  );
};

const InvestorTestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const testimonials = useMemo(() => testimonialsData, []);

  return (
    <section className="w-full py-10">
      <div className="max-w-[1180px] mx-auto px-4">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-[#111827] text-[22px] font-semibold leading-7">
              What Our Investors Say
            </h3>
            <div
              className="mt-2 w-[110px] h-[3px] rounded-full"
              style={{ backgroundColor: PRIMARY }}
            />
            <p className="mt-3 text-[#374151] text-[15px] leading-6">
              Join thousands of satisfied investors who trust us with their wealth
            </p>
          </div>

          <button
            type="button"
            className="h-[44px] px-6 rounded-[14px] border text-[14px] font-semibold text-[#0B63CE] hover:bg-[#F8FBFF] transition inline-flex items-center gap-3 self-start"
            style={{ borderColor: "#0B63CE" }}
          >
            Share your thoughts
            <span className="text-[18px] leading-none">›</span>
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border px-6 py-5"
              style={{
                borderColor: CARD_BORDER,
                boxShadow: CARD_SHADOW,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[46px] h-[46px] object-contain"
              />

              <div className="mt-5">
                <QuoteIcon />
              </div>

              <p className="mt-3 text-[#111827] text-[15px] leading-7 min-h-[144px]">
                {item.text}
              </p>

              <div className="mt-5 flex gap-3 items-start">
                <div className="w-[4px] h-[36px] rounded-full bg-[#0B63CE]" />
                <div>
                  <p className="text-[#111827] text-[14px] leading-5 font-medium">
                    {item.name}
                  </p>
                  <p className="text-[#374151] text-[13px] leading-5 mt-1">
                    {item.meta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActive(index)}
              className={[
                "rounded-full transition",
                active === index ? "w-[56px] h-[5px]" : "w-[9px] h-[9px]",
              ].join(" ")}
              style={{
                backgroundColor: active === index ? PRIMARY : "#E5EDF5",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorTestimonialsSection;