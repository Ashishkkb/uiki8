
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface CustomRadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  label,
  options,
  value,
  onValueChange,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <Label className="mb-3 block">{label}</Label>
      )}
      
      <RadioGroup value={value} onValueChange={onValueChange}>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-start space-x-2">
              <RadioGroupItem
                value={option.value}
                id={option.value}
                disabled={option.disabled}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </Label>
                {option.description && (
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

const RadioGroupDemo = () => {
  const [notificationPreference, setNotificationPreference] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const notificationOptions = [
    {
      value: "all",
      label: "All Notifications",
      description: "Receive all notifications via email and push notifications",
    },
    {
      value: "important",
      label: "Important Only",
      description: "Only receive notifications for important updates",
    },
    {
      value: "none",
      label: "No Notifications",
      description: "Turn off all notifications",
    },
    {
      value: "custom",
      label: "Custom Settings",
      description: "Configure individual notification settings",
      disabled: true,
    },
  ];
  
  const paymentOptions = [
    {
      value: "card",
      label: "Credit/Debit Card",
      description: "Pay using your card",
    },
    {
      value: "paypal",
      label: "PayPal",
      description: "Pay using your PayPal account",
    },
    {
      value: "bank",
      label: "Bank Transfer",
      description: "Direct transfer from your bank account",
    },
  ];
  
  return (
    <div className="space-y-8">
      <CustomRadioGroup
        label="Notification Preferences"
        options={notificationOptions}
        value={notificationPreference}
        onValueChange={setNotificationPreference}
      />
      
      <CustomRadioGroup
        label="Payment Method"
        options={paymentOptions}
        value={paymentMethod}
        onValueChange={setPaymentMethod}
      />
      
      <div className="p-4 border rounded-md bg-muted/30">
        <h3 className="font-medium">Selected Preferences:</h3>
        <div className="mt-2 text-sm space-y-1">
          <p>Notification Preference: {notificationPreference}</p>
          <p>Payment Method: {paymentMethod}</p>
        </div>
      </div>
    </div>
  );
};

export default RadioGroupDemo;
