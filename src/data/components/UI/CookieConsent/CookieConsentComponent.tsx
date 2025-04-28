
import React, { useState, useEffect } from 'react';
import { X, Shield, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CookieSetting {
  id: string;
  name: string;
  description: string;
  required: boolean;
  enabled: boolean;
}

const CookieConsentComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSetting[]>([
    {
      id: "essential",
      name: "Essential Cookies",
      description: "These cookies are necessary for the website to function and cannot be switched off.",
      required: true,
      enabled: true
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      required: false,
      enabled: false
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      required: false,
      enabled: false
    }
  ]);

  useEffect(() => {
    // Check for existing consent in a secure way
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        // Parse stored settings if available
        const savedSettings = localStorage.getItem('cookieSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          if (Array.isArray(parsedSettings)) {
            setCookieSettings(prev => 
              prev.map(setting => ({
                ...setting,
                enabled: setting.required || parsedSettings.find(s => s.id === setting.id)?.enabled || false
              }))
            );
          }
        }
      } catch (error) {
        console.error("Failed to parse stored cookie settings:", error);
        // Fallback to default settings if parsing fails
      }
    }
  }, []);

  const handleAccept = () => {
    // Save consent with current timestamp for audit purposes
    const consentData = {
      granted: true,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };
    
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    localStorage.setItem('cookieSettings', JSON.stringify(cookieSettings));
    
    setIsVisible(false);
    toast.success("Preferences saved successfully");
  };

  const handleToggleSetting = (id: string, value: boolean) => {
    setCookieSettings(prev => 
      prev.map(setting => 
        setting.id === id && !setting.required ? { ...setting, enabled: value } : setting
      )
    );
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleDecline = () => {
    // Save minimal consent with only required cookies
    const minimalSettings = cookieSettings.map(setting => ({
      ...setting,
      enabled: setting.required
    }));
    
    localStorage.setItem('cookieConsent', JSON.stringify({
      granted: false,
      timestamp: new Date().toISOString(),
      version: "1.0"
    }));
    localStorage.setItem('cookieSettings', JSON.stringify(minimalSettings));
    
    setCookieSettings(minimalSettings);
    setIsVisible(false);
    toast.info("Only essential cookies will be used");
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Privacy Preferences</h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-3">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to enhance your browsing experience, serve personalized content,
            and analyze our traffic. Please select your preferences below.
          </p>

          {showDetails && (
            <>
              <Separator className="my-4" />
              
              <Accordion type="single" collapsible className="w-full">
                {cookieSettings.map((setting) => (
                  <AccordionItem key={setting.id} value={setting.id}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex-1">
                        <AccordionTrigger className="py-0 hover:no-underline">
                          <span>{setting.name}</span>
                          {setting.required && (
                            <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                              Required
                            </span>
                          )}
                        </AccordionTrigger>
                      </div>
                      <Switch
                        id={`switch-${setting.id}`}
                        checked={setting.enabled}
                        onCheckedChange={(checked) => handleToggleSetting(setting.id, checked)}
                        disabled={setting.required}
                        aria-label={`Enable ${setting.name}`}
                      />
                    </div>
                    <AccordionContent className="text-xs text-gray-500 dark:text-gray-400 pt-0">
                      {setting.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          )}
        </div>
        
        <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCustomize}
            className="order-2 sm:order-1"
          >
            {showDetails ? "Hide Details" : "Customize"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
            className="order-3 sm:order-2"
          >
            Decline Non-Essential
          </Button>
          <Button 
            size="sm" 
            onClick={handleAccept}
            className="order-1 sm:order-3 gap-1"
          >
            <CheckCircle className="h-4 w-4" />
            Accept Selected
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentComponent;
