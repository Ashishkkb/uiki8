
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

type TextAnimationVariant = 
  | "gradient" 
  | "typing" 
  | "waveform" 
  | "spotlight" 
  | "outlined";

interface AnimatedTextProps {
  text: string;
  variant?: TextAnimationVariant;
  className?: string;
  speed?: number;
  delay?: number;
  repeat?: boolean;
  color?: string;
  secondaryColor?: string;
}

const DEFAULT_SPEED = 100;

export const AnimatedText = ({
  text,
  variant = "gradient",
  className = "",
  speed = DEFAULT_SPEED,
  delay = 0,
  repeat = true,
  color = "from-primary via-purple-500 to-blue-500",
  secondaryColor,
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // For typing animation
  useEffect(() => {
    if (variant !== "typing") return;
    
    const container = containerRef.current;
    if (!container) return;
    
    let currentIndex = 0;
    const characters = text.split("");
    
    container.textContent = "";
    
    const cursorEl = document.createElement("span");
    cursorEl.className = "inline-block w-[2px] h-[1em] ml-[2px] bg-primary animate-blink";
    container.appendChild(cursorEl);
    
    const typingTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex >= characters.length) {
          if (repeat) {
            currentIndex = 0;
            container.textContent = "";
            container.appendChild(cursorEl);
          } else {
            clearInterval(interval);
          }
          return;
        }
        
        container.insertBefore(
          document.createTextNode(characters[currentIndex]),
          cursorEl
        );
        currentIndex++;
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(typingTimer);
  }, [text, variant, speed, delay, repeat]);

  // For waveform animation
  useEffect(() => {
    if (variant !== "waveform") return;
    
    const container = containerRef.current;
    if (!container) return;
    
    container.innerHTML = "";
    
    text.split("").forEach((char, i) => {
      const charEl = document.createElement("span");
      charEl.textContent = char;
      charEl.className = "inline-block animate-bounce";
      charEl.style.animationDelay = `${i * 0.05}s`;
      
      // Adjust space handling
      if (char === " ") {
        charEl.innerHTML = "&nbsp;";
      }
      
      container.appendChild(charEl);
    });
  }, [text, variant]);

  // For spotlight animation
  useEffect(() => {
    if (variant !== "spotlight") return;
    
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = clientX - left;
      const y = clientY - top;
      
      container.style.setProperty("--spotlight-x", `${x}px`);
      container.style.setProperty("--spotlight-y", `${y}px`);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [variant]);

  // Render different variants
  if (variant === "gradient") {
    return (
      <div 
        ref={containerRef}
        className={cn(
          "bg-gradient-to-r bg-clip-text text-transparent animate-gradient-x",
          color,
          className
        )}
        style={{ 
          backgroundSize: "200% auto", 
          animationDuration: `${speed * 60}ms` 
        }}
      >
        {text}
      </div>
    );
  }

  if (variant === "outlined") {
    return (
      <div 
        ref={containerRef}
        className={cn(
          "font-bold text-transparent",
          className
        )}
        style={{ 
          WebkitTextStroke: `1px ${secondaryColor || "currentColor"}`,
        }}
      >
        {text}
      </div>
    );
  }

  // For typing, waveform and spotlight, we just need the container
  return (
    <div 
      ref={containerRef} 
      className={cn(
        "inline-block",
        {
          "spotlight-effect": variant === "spotlight",
          "typing-container": variant === "typing",
        },
        className
      )}
      style={
        variant === "spotlight" 
          ? { 
              "--spotlight-size": "150px",
              "--spotlight-color": secondaryColor || "white",
            } as React.CSSProperties
          : undefined
      }
    >
      {variant !== "typing" && variant !== "waveform" ? text : ""}
    </div>
  );
};

const TextEffectComponent = () => {
  return (
    <div className="flex flex-col space-y-16 w-full py-8">
      {/* Gradient Text */}
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Gradient Animation</h3>
        <AnimatedText 
          text="AMAZING GRADIENT TEXT" 
          variant="gradient"
          className="text-3xl font-bold from-indigo-500 via-purple-500 to-pink-500"
        />
      </div>
      
      {/* Typing Text */}
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Typing Animation</h3>
        <AnimatedText 
          text="This text is being typed automatically." 
          variant="typing"
          className="text-xl"
          speed={80}
          repeat={true}
        />
      </div>
      
      {/* Waveform Text */}
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Waveform Animation</h3>
        <AnimatedText 
          text="BOUNCING TEXT EFFECT" 
          variant="waveform"
          className="text-2xl font-bold text-primary"
        />
      </div>
      
      {/* Spotlight Text */}
      <div className="text-center spotlight-container" style={{position: 'relative', overflow: 'hidden'}}>
        <h3 className="text-sm text-muted-foreground mb-3">Spotlight Effect</h3>
        <style jsx global>{`
          .spotlight-effect {
            position: relative;
          }
          .spotlight-effect::before {
            content: '';
            position: absolute;
            top: calc(var(--spotlight-y, 0) - var(--spotlight-size, 100px) / 2);
            left: calc(var(--spotlight-x, 0) - var(--spotlight-size, 100px) / 2);
            width: var(--spotlight-size, 100px);
            height: var(--spotlight-size, 100px);
            background: radial-gradient(
              circle,
              var(--spotlight-color, white) 0%,
              transparent 80%
            );
            border-radius: 50%;
            opacity: 0.5;
            pointer-events: none;
            z-index: 1;
          }
        `}</style>
        <AnimatedText 
          text="HOVER OVER ME FOR SPOTLIGHT" 
          variant="spotlight"
          className="text-3xl font-bold"
          secondaryColor="rgba(255, 255, 255, 0.8)"
        />
      </div>
      
      {/* Outlined Text */}
      <div className="text-center">
        <h3 className="text-sm text-muted-foreground mb-3">Outlined Text</h3>
        <AnimatedText 
          text="OUTLINED TEXT STYLE" 
          variant="outlined"
          className="text-3xl font-bold"
          secondaryColor="#6366f1"
        />
      </div>
    </div>
  );
};

export default TextEffectComponent;
