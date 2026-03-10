import React from "react";
import TopHeader from "../components/TopHeader";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import TabsSection from "../components/TabsSection";
import FeaturesSection from "../components/FeaturesSection";
import InvestStepsSection from "../components/InvestStepsSection";
import PerformanceSection from "../components/PerformanceSection";
import HowFundWorksSection from "../components/HowFundWorksSection";
import ReturnsCalculator from "../components/ReturnsCalculator";
import RiskometerSection from "../components/RiskometerSection";
import FundDetailsSection from "../components/FundDetailsSection";
import FundManagersSection from "../components/FundManagersSection";
import PortfolioSection from "../components/PortfolioSection";
import PortfolioBreakdownSection from "../components/PortfolioBreakdownSection";
import InvestorTestimonialsSection from "../components/InvestorTestimonialsSection";
import FAQSection from "../components/FAQSection";
import LearnMoreSection from "../components/LearnMoreSection";
import DownloadsSection from "../components/DownloadsSection";
import FooterSection from "../components/FooterSection";

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <TopHeader />
      <HeroSection />
      <StatsSection />
      <TabsSection />

      <div id="overview-section">
        <FeaturesSection />
        <InvestStepsSection />
        <PerformanceSection />
        <HowFundWorksSection />
        <ReturnsCalculator />
        <RiskometerSection />
      </div>

      <div id="fund-details-section">
        <FundDetailsSection />
        <FundManagersSection />
      </div>

      <div id="portfolio-section">
        <PortfolioSection />
        <PortfolioBreakdownSection />
        <InvestorTestimonialsSection />
      </div>

      <div id="faqs-section">
        <FAQSection />
        <LearnMoreSection />
      </div>

      <div id="downloads-section">
        <DownloadsSection />
      </div>

      <FooterSection />
    </div>
  );
};

export default Home;