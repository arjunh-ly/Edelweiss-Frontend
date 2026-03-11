const footerCols = {
  quickLinks: ["About us", "All Funds", "Download Forms", "FAQs"],
  resources: [
    "Investment Guide",
    "Tax Benefits",
    "Fund Performance",
    "Regulatory Disclosures",
  ],
};

const FooterSection = () => {
  return (
    <footer className="w-full bg-[#004EA8] mt-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          {/* Edelweiss Cap Fund — 40% */}
          <div>
            <h4 className="text-white text-[16px] font-medium">
              Edelweiss Cap Fund
            </h4>
            <p className="mt-5 text-white text-[14px] leading-7 max-w-[260px]">
              Invest in growth across market capitalizations with professional fund management.
            </p>
          </div>

          {/* Quick Links + Resources + Contact Us — 60% */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white text-[16px] font-medium">Quick Links</h4>
              <div className="mt-5 space-y-3">
                {footerCols.quickLinks.map((item) => (
                  <a key={item} href="#" className="block text-white text-[14px] leading-6 hover:text-white/80 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-[16px] font-medium">Resources</h4>
              <div className="mt-5 space-y-3">
                {footerCols.resources.map((item) => (
                  <a key={item} href="#" className="block text-white text-[14px] leading-6 hover:text-white/80 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white text-[16px] font-medium">Contact Us</h4>
              <div className="mt-5 space-y-3">
                <p className="text-white text-[14px] leading-6">1800-123-4567</p>
                <p className="text-white text-[14px] leading-6">info@edelweissmf.com</p>
                <p className="text-white text-[14px] leading-6 max-w-[280px]">
                  Edelweiss House, Off CST Road, Kalina, Mumbai 400098
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[rgba(255,255,255,0.28)] pt-6">
          <p className="text-white text-[13px] leading-6">
            © 2026 Edelweiss Mutual Fund. All rights reserved.
          </p>
          <p className="mt-3 text-white text-[12px] leading-6 max-w-[980px]">
            Mutual Fund investments are subject to market risks. Please read all scheme related documents carefully before investing. Past performance is not indicative of future returns.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
