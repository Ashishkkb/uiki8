
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const CookieConsentComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show after a small delay for better UX
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

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 relative">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We use cookies to enhance your browsing experience, serve personalized ads or content,
          and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
          >
            Decline
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentComponent;
