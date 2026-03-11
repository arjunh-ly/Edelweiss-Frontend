import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import colors from "../styles/colors";

const CARD_BORDER = "#D9E7F6";

const faqData = [
  {
    question: "What is a Flexi Cap Fund?",
    answer:
      "A Flexi Cap Fund is an open-ended dynamic equity scheme that invests across companies of all market capitalizations, large cap, mid cap, and small cap. Unlike other equity funds with mandatory allocation requirements, flexi cap funds have the flexibility to allocate investments across different market caps based on market opportunities and fund manager's conviction.",
  },
  {
    question: "Who should invest in Flexi Cap Funds?",
    answer:
      "Flexi cap funds are suitable for investors looking for long-term wealth creation, diversification across market capitalizations, and a professionally managed equity portfolio with allocation flexibility.",
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "The minimum investment amount depends on the plan and platform. Usually, lump sum investments start from a small base amount, while SIPs start from a lower monthly contribution.",
  },
  {
    question: "What are the tax implications?",
    answer:
      "Tax on flexi cap funds generally follows equity mutual fund taxation rules. Short-term and long-term capital gains are taxed differently based on the holding period and prevailing regulations.",
  },
  {
    question: "How is a Flexi Cap Fund different from a Multi Cap Fund?",
    answer:
      "A flexi cap fund has full freedom to shift allocations between large, mid, and small cap stocks. A multi cap fund has mandatory minimum allocation requirements across market cap segments.",
  },
  {
    question: "What is the expense ratio and what does it include?",
    answer:
      "The expense ratio is the annual fee charged by the fund for managing your investments. It includes fund management fees, administrative expenses, registrar costs, and other operational charges.",
  },
  {
    question: "Can I withdraw my investment anytime?",
    answer:
      "Yes, flexi cap funds are generally open-ended, so you can redeem units on any business day, subject to applicable exit load and processing timelines.",
  },
  {
    question: "What is SIP and how does it work?",
    answer:
      "SIP, or Systematic Investment Plan, lets you invest a fixed amount at regular intervals. It helps build investing discipline and reduces the effect of market timing through rupee cost averaging.",
  },
  {
    question: "Is my investment safe?",
    answer:
      "Mutual funds are market-linked investments and do not offer guaranteed returns. They are regulated investment products, but returns depend on market conditions and portfolio performance.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faqs-section" className="w-full py-10">
      <div className="max-w-[1180px] mx-auto px-4">
        <div>
          <h3 className="text-[#111827] text-[24px] font-semibold leading-7">
            Frequently Asked Questions (FAQs)
          </h3>

          <div
            className="mt-2 w-[110px] h-[3px] rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
        </div>

        <div className="mt-8 space-y-3">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className="bg-white border rounded-xl overflow-hidden"
                style={{ borderColor: CARD_BORDER }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left px-4 py-3"
                >
                  <p className="text-[#111827] text-[16px] font-semibold">
                    {item.question}
                  </p>

                  <span className="text-[#6B7280] bg-white shadow-md p-2 rounded-full ">
                    {isOpen ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4">
                    <p className="text-[#6B7280] text-[16px] leading-6">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;