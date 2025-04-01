
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UIKitHero from "@/components/UIKitHero";
import UIKitFeatures from "@/components/UIKitFeatures";
import UIKitShowcase from "@/components/UIKitShowcase";
import PricingSection from "@/components/PricingSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import UIKitCTA from "@/components/UIKitCTA";
import UIKitSponsors from "@/components/UIKitSponsors";

const UIKit = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <UIKitHero />
      <UIKitFeatures />
      <UIKitShowcase />
      <PricingSection />
      <UIKitSponsors />
      <NewsletterSignup />
      <UIKitCTA />
      <Footer />
    </div>
  );
};

export default UIKit;
