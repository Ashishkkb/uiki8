
import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface CustomAspectRatioProps {
  ratio?: number;
  className?: string;
  children: React.ReactNode;
}

const CustomAspectRatio: React.FC<CustomAspectRatioProps> = ({
  ratio = 16 / 9,
  className,
  children,
}) => {
  return (
    <div className={cn("overflow-hidden rounded-lg", className)}>
      <AspectRatio ratio={ratio}>
        {children}
      </AspectRatio>
    </div>
  );
};

const AspectRatioDemo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">16:9 Aspect Ratio (Landscape)</h3>
        <CustomAspectRatio ratio={16 / 9}>
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&auto=format&fit=crop&q=80"
            alt="Landscape photo"
            className="object-cover w-full h-full rounded-lg"
          />
        </CustomAspectRatio>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">1:1 Aspect Ratio (Square)</h3>
        <CustomAspectRatio ratio={1 / 1}>
          <img
            src="https://images.unsplash.com/photo-1605460375648-278bcbd579a6?w=800&auto=format&fit=crop&q=80"
            alt="Square photo"
            className="object-cover w-full h-full rounded-lg"
          />
        </CustomAspectRatio>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">4:5 Aspect Ratio (Portrait)</h3>
        <CustomAspectRatio ratio={4 / 5}>
          <img
            src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=800&auto=format&fit=crop&q=80"
            alt="Portrait photo"
            className="object-cover w-full h-full rounded-lg"
          />
        </CustomAspectRatio>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-sm font-medium">9:16 Aspect Ratio (Mobile)</h3>
        <CustomAspectRatio ratio={9 / 16}>
          <img
            src="https://images.unsplash.com/photo-1617369120004-4fc70312c5e6?w=800&auto=format&fit=crop&q=80"
            alt="Mobile photo"
            className="object-cover w-full h-full rounded-lg"
          />
        </CustomAspectRatio>
      </div>
    </div>
  );
};

export default AspectRatioDemo;
