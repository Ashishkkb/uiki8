
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import ComponentsShowcase from "@/components/ComponentsShowcase";
import PricingSection from "@/components/PricingSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <FeatureSection />
      <ComponentsShowcase />
      <PricingSection />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Index;
