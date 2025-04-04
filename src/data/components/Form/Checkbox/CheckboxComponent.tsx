
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CustomCheckboxProps {
  id: string;
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}) => {
  return (
    <div className="flex space-x-2">
      <Checkbox 
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

const CheckboxDemo = () => {
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Terms and Preferences</h3>
      
      <div className="space-y-4">
        <CustomCheckbox
          id="terms"
          label="Accept terms and conditions"
          description="You agree to our Terms of Service and Privacy Policy."
          checked={terms}
          onCheckedChange={setTerms}
        />
        
        <CustomCheckbox
          id="marketing"
          label="Receive marketing emails"
          description="Get notified about new products and special offers."
          checked={marketing}
          onCheckedChange={setMarketing}
        />
        
        <CustomCheckbox
          id="newsletter"
          label="Subscribe to newsletter"
          description="Receive weekly newsletter with industry updates."
          checked={newsletter}
          onCheckedChange={setNewsletter}
          disabled
        />
      </div>
      
      <div className="p-4 border rounded-md bg-muted/30 mt-4">
        <h3 className="font-medium">Selected Options:</h3>
        <div className="mt-2 text-sm space-y-1">
          <p>Terms Accepted: {terms ? "Yes" : "No"}</p>
          <p>Marketing Emails: {marketing ? "Opted In" : "Opted Out"}</p>
          <p>Newsletter: {newsletter ? "Subscribed" : "Not Subscribed"} (Disabled Control)</p>
        </div>
      </div>
    </div>
  );
};

export default CheckboxDemo;
