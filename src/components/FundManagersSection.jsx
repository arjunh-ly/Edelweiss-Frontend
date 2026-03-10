// src/components/FundManagersSection.jsx
import React from "react";

import manager1 from "../assets/manager-1.png"; // Trideep
import manager2 from "../assets/manager-2.png"; // Ashwani
import manager3 from "../assets/manager-3.png"; // Raj

const PRIMARY = "#034EA2";

const ManagerCard = ({ img, name, aum, exp, funds }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#EEF2F7] overflow-hidden">
      <div className="p-6 sm:p-7">
        <div className="w-[120px] h-[120px] rounded-2xl bg-[#F4F6FA] overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <h4 className="mt-5 text-[#111827] text-[20px] font-semibold leading-6">
          {name}
        </h4>

        <p className="mt-4 text-[#111827] text-[16px] leading-5">
          Total AUM managed across schemes
          <br />
          <span className="font-semibold">{aum} Cr.</span>
        </p>

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#111827] text-[16px] leading-4">Work Experience</p>
            <p className="mt-1 text-[#111827] text-[16px] font-semibold leading-5">
              {exp} years
            </p>
          </div>

          <div>
            <p className="text-[#111827] text-[16px] leading-4">Funds Managed</p>
            <p className="mt-1 text-[#111827] text-[16px] font-semibold leading-5">
              {funds}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-7 text-[14px] font-semibold flex items-center gap-2"
          style={{ color: PRIMARY }}
        >
          View more details <span className="text-[14px] leading-none">›</span>
        </button>
      </div>

      <div className="h-[6px]" style={{ backgroundColor: PRIMARY }} />
    </div>
  );
};

const FundManagersSection = () => {
  const managers = [
    {
      img: manager1,
      name: "Trideep Bhattacharya",
      aum: "32,537",
      exp: 20,
      funds: 6,
    },
    {
      img: manager2,
      name: "Ashwani Kumar Agarwalla",
      aum: "3,550",
      exp: 20,
      funds: 6,
    },
    {
      img: manager3,
      name: "Raj Koradia",
      aum: "32,056",
      exp: 20,
      funds: 6,
    },
  ];

  return (
    <section className="w-full py-16">
      <div className="max-w-[1180px] mx-auto px-4">
        <div>
          <h3 className="text-[#111827] text-[24px] font-semibold leading-7">
            Fund Managers
          </h3>
          <div className="mt-2 w-[120px] h-[3px] rounded-full" style={{ backgroundColor: PRIMARY }} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {managers.map((m) => (
            <ManagerCard key={m.name} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FundManagersSection;