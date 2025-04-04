
import React from 'react';
import { ComponentItem } from "@/types/component";
import { Slider } from "@/components/ui/slider";

const SliderDemo = () => {
  const [value, setValue] = React.useState([33]);
  
  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h4 className="font-medium">Simple slider: {value}</h4>
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          value={value}
          onValueChange={setValue}
        />
      </div>
      
      <div className="space-y-2">
        <h4 className="font-medium">Range slider</h4>
        <Slider
          defaultValue={[25, 75]}
          max={100}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

const SliderComponentData: ComponentItem = {
  id: 409,
  name: "Slider",
  category: "Form",
  framework: "React",
  description: "A slider component that allows users to make selections from a range of values",
  code: `import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {props.defaultValue && props.defaultValue.map((_, i) => (
      <SliderPrimitive.Thumb
        key={i}
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }`,
  component: SliderDemo,
  tags: ["form", "slider", "range", "input"],
  fileSize: "1.1 KB",
  price: "Free",
  complexity: "medium",
  lastUpdated: "2023-12-09"
};

export default SliderComponentData;
