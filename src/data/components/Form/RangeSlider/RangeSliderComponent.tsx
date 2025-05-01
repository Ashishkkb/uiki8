
import React, { useState } from 'react';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const RangeSliderComponent = () => {
  const [value, setValue] = useState<number[]>([25, 75]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label>Price Range</Label>
        <span className="text-sm text-muted-foreground">
          ${value[0]} - ${value[1]}
        </span>
      </div>
      
      <Slider
        value={value}
        min={0}
        max={100}
        step={5}
        onValueChange={handleValueChange}
        className="w-full"
      />
    </div>
  );
};

export default RangeSliderComponent;
