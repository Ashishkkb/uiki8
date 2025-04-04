
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CustomSwitchProps {
  label?: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  description,
  checked = false,
  onCheckedChange,
  disabled = false,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
      {(label || description) && (
        <div className="grid gap-1">
          {label && <Label>{label}</Label>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};

const SwitchDemo = () => {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [performanceMode, setPerformanceMode] = useState(false);
  
  return (
    <div className="space-y-6">
      <CustomSwitch
        checked={airplaneMode}
        onCheckedChange={setAirplaneMode}
        label="Airplane Mode"
        description="Disable all wireless connections"
      />
      
      <CustomSwitch
        checked={notifications}
        onCheckedChange={setNotifications}
        label="Notifications"
        description="Receive app notifications"
      />
      
      <CustomSwitch
        checked={performanceMode}
        onCheckedChange={setPerformanceMode}
        label="Performance Mode"
        description="Optimize for maximum performance"
        disabled
      />
      
      <div className="p-4 border rounded-md bg-muted/30 mt-4">
        <h3 className="font-medium">Current Settings:</h3>
        <div className="mt-2 text-sm space-y-1">
          <p>Airplane Mode: {airplaneMode ? "On" : "Off"}</p>
          <p>Notifications: {notifications ? "Enabled" : "Disabled"}</p>
          <p>Performance Mode: {performanceMode ? "On" : "Off"} (Disabled Control)</p>
        </div>
      </div>
    </div>
  );
};

export default SwitchDemo;
