import React, { useEffect, useRef, useState } from "react";

const TabsSection = () => {
  const tabs = [
    { label: "Overview", targetId: "overview-section" },
    { label: "Fund Details", targetId: "fund-details-section" },
    { label: "Portfolio", targetId: "portfolio-section" },
    { label: "FAQs", targetId: "faqs-section" },
    { label: "Downloads", targetId: "downloads-section" },
  ];

  const [active, setActive] = useState("Overview");
  const [isFixed, setIsFixed] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  const sectionRef = useRef(null);
  const barRef = useRef(null);
  const tabsScrollRef = useRef(null);
  const isManualScrolling = useRef(false);
  const manualScrollTimer = useRef(null);

  useEffect(() => {
    const measure = () => {
      if (!barRef.current) return;
      setBarHeight(barRef.current.offsetHeight);
    };

    measure();
    window.addEventListener("resize", measure);

    const onScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const shouldFix = rect.top <= 16;

      setIsFixed((prev) => {
        if (prev !== shouldFix) return shouldFix;
        return prev;
      });

      // Skip active tab detection while a manual click-scroll is in progress
      if (isManualScrolling.current) return;

      const scrollPosition = window.scrollY + (shouldFix ? barHeight + 60 : 180);

      for (let i = tabs.length - 1; i >= 0; i--) {
        const section = document.getElementById(tabs[i].targetId);
        if (!section) continue;

        if (scrollPosition >= section.offsetTop) {
          setActive((prev) => (prev !== tabs[i].label ? tabs[i].label : prev));
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(manualScrollTimer.current);
    };
  }, [barHeight]);

  const scrollActiveTabIntoView = (label) => {
    const container = tabsScrollRef.current;
    if (!container) return;

    if (window.innerWidth >= 1024) return;

    const activeButton = container.querySelector(`[data-tab="${label}"]`);
    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const handleScrollToSection = (tab) => {
    setActive(tab.label);
    scrollActiveTabIntoView(tab.label);

    const section = document.getElementById(tab.targetId);
    if (!section) return;

    const topOffset = isFixed ? barHeight + 32 : 140;
    const sectionTop =
      section.getBoundingClientRect().top + window.pageYOffset - topOffset;

    // Suppress scroll-based tab detection during smooth scroll
    isManualScrolling.current = true;
    clearTimeout(manualScrollTimer.current);
    manualScrollTimer.current = setTimeout(() => {
      isManualScrolling.current = false;
    }, 1000);

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="w-full mt-7">
      <div
        aria-hidden="true"
        style={{ height: isFixed ? `${barHeight}px` : 0 }}
      />

      <div
        ref={barRef}
        className={[
          "z-50",
          isFixed ? "fixed top-4 left-0 right-0" : "relative",
        ].join(" ")}
      >
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
            <div
              className="
                bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl
                w-full lg:flex-1
                h-[58px]
                px-3 sm:px-5 lg:px-10
                flex items-center
                min-w-0
              "
            >
              <div
                ref={tabsScrollRef}
                className="
                  flex items-center
                  gap-6 sm:gap-7
                  lg:gap-0 lg:justify-between
                  w-full
                  overflow-x-auto lg:overflow-visible
                  overflow-y-hidden
                  whitespace-nowrap
                  scrollbar-none
                  [-ms-overflow-style:none]
                  [scrollbar-width:none]
                "
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    data-tab={tab.label}
                    type="button"
                    onClick={() => handleScrollToSection(tab)}
                    className={`
                      relative h-[58px] flex items-center justify-center shrink-0 lg:shrink
                      px-1 text-center
                      font-['Roboto'] text-[16px] leading-[145%]
                      outline-none focus:outline-none focus:ring-0
                      transition-all duration-200
                      ${
                        active === tab.label
                          ? "font-semibold text-[#034EA2]"
                          : "font-normal text-[#6B7280] hover:font-semibold hover:text-[#034EA2]"
                      }
                    `}
                  >
                    {tab.label}

                    <span
                      className={[
                        "absolute left-0 right-0 bottom-[10px] h-[2px] rounded-full bg-[#034EA2]",
                        active === tab.label
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0",
                      ].join(" ")}
                      style={{ transformOrigin: "left" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              className="
                w-full lg:w-[320px] xl:w-[300px]
                h-[54px] lg:h-[58px]
                bg-[#034EA2] hover:bg-[#8DC63F]
                text-white rounded-xl font-medium
                shadow-[0_18px_40px_rgba(0,0,0,0.12)]
                border-0 outline-none
                transition-colors duration-300
                active:scale-[0.98]
                focus:outline-none
                shrink-0
              "
            >
              Start a SIP
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TabsSection;
