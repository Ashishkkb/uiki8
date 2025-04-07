
import React from 'react';
import { cn } from "@/lib/utils";

interface ImageHoverProps {
  src: string;
  altSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  transitionSpeed?: 'fast' | 'normal' | 'slow';
  effect?: 'fade' | 'slide' | 'zoom' | 'flip';
}

const ImageHoverComponent: React.FC<ImageHoverProps> = ({
  src,
  altSrc,
  alt,
  width,
  height,
  className,
  imageClassName,
  transitionSpeed = 'normal',
  effect = 'fade'
}) => {
  const transitionClasses = {
    fast: "duration-200",
    normal: "duration-300",
    slow: "duration-500"
  };
  
  const effectClasses = {
    fade: {
      container: "group",
      primary: "opacity-100 group-hover:opacity-0",
      secondary: "opacity-0 group-hover:opacity-100"
    },
    slide: {
      container: "group overflow-hidden",
      primary: "translate-x-0 group-hover:-translate-x-full",
      secondary: "translate-x-full group-hover:translate-x-0"
    },
    zoom: {
      container: "group overflow-hidden",
      primary: "scale-100 group-hover:scale-110 opacity-100 group-hover:opacity-0",
      secondary: "scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100"
    },
    flip: {
      container: "group perspective-[1000px]",
      primary: "rotateY(0) group-hover:rotateY(180deg) opacity-100 group-hover:opacity-0",
      secondary: "rotateY(-180deg) group-hover:rotateY(0) opacity-0 group-hover:opacity-100"
    }
  };

  return (
    <div className={cn(
      "relative",
      effectClasses[effect].container,
      className
    )}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all",
          transitionClasses[transitionSpeed],
          effectClasses[effect].primary,
          imageClassName
        )}
      />
      <img
        src={altSrc}
        alt={`${alt} (alternative)`}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-all",
          transitionClasses[transitionSpeed],
          effectClasses[effect].secondary,
          imageClassName
        )}
      />
    </div>
  );
};

export default ImageHoverComponent;
