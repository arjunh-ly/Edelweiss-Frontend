import downloadIcon from "../assets/document-outline.png";
import { Download } from "lucide-react";
import colors from "../styles/colors";

const CARD_BORDER = colors.cardBorder;
const CARD_SHADOW = "0 10px 30px rgba(15, 23, 42, 0.06)";

const downloads = [
  "Fund Factsheet February 2026",
  "SIP",
  "Product Note January 2026",
  "Fund Presentation 2025",
  "Scheme Summary",
  "Application Form",
];

const DownloadsSection = () => {
  return (
    <section className="w-full py-10">
      <div className="max-w-[1180px] mx-auto px-4">
        <div>
          <h3 className="text-[#111827] text-[24px] font-semibold leading-7">
            Downloads
          </h3>
          <div
            className="mt-2 w-[120px] h-[3px] rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
        </div>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {downloads.map((item) => (
            <button
              key={item}
              type="button"
              className="
                group relative overflow-hidden
                w-full bg-white rounded-2xl border px-5 py-4
                flex items-center gap-4 text-left
                transition-all duration-300
                hover:-translate-y-[2px]
              "
              style={{
                borderColor: CARD_BORDER,
                boxShadow: CARD_SHADOW,
              }}
            >
              {/* Left Icon */}
              <div className="w-[44px] h-[44px] rounded-full bg-[#EAF3FB] flex items-center justify-center shrink-0">
                <img
                  src={downloadIcon}
                  alt="Download"
                  className="w-[20px] h-[20px] object-contain"
                />
              </div>

              {/* Title */}
              <span className="text-[#111827] text-[16px] leading-6 font-medium">
                {item}
              </span>

              {/* Animated Corner */}
<div
  className="
    absolute top-0 right-0
    w-[50px] h-[50px]
    bg-[#034EA2]
    rounded-bl-[50px]
    scale-0
    group-hover:scale-100
    origin-top-right
    transition-transform duration-300
  "
/>

              {/* Download Icon */}
              <div
                className="
                  absolute top-[14px] right-[14px]
                  text-white
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <Download size={18} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;