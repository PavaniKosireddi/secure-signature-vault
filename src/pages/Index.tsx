import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { VerificationSection } from "@/components/sections/VerificationSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <TechnologySection />
        <HowItWorksSection />
        <DemoSection />
        <VerificationSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;