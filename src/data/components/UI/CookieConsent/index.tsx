
import { ComponentItem } from "@/types/component";
import CookieConsentComponent from "./CookieConsentComponent";

const CookieConsentComponentItem: ComponentItem = {
  id: 201,
  name: "Cookie Consent",
  description: "A GDPR-compliant cookie consent banner with customizable options",
  category: "UI",
  component: CookieConsentComponent,
  code: `import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
          <p className="text-sm text-gray-600 mb-4">
            We use cookies to enhance your browsing experience.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAccept}>
              Accept All
            </Button>
          </div>
        </div>
      )}
    </>
  );
};`,
  framework: "React",
  isNew: true,
  tags: ["ui", "cookies", "gdpr", "consent", "privacy"]
};

export default CookieConsentComponentItem;
