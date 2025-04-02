
import React from "react";
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
      <UIKitHero />
      <UIKitFeatures />
      <UIKitShowcase />
      <PricingSection />
      <UIKitSponsors />
      <NewsletterSignup />
      <UIKitCTA />
    </div>
  );
};

export default UIKit;
