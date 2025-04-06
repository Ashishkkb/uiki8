
import React from 'react';
import { ComponentItem } from "@/types/component";
import CountdownTimerComponent from "./CountdownTimerComponent";

const CountdownTimerComponentItem: ComponentItem = {
  id: 103,
  name: "Countdown Timer",
  category: "UI",
  framework: "React",
  description: "A customizable countdown timer component for events, offers, or deadlines.",
  code: `import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'minimal';
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  className,
  showLabels = true,
  size = 'md',
  variant = 'default',
  onComplete
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let newTimeLeft: TimeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else if (onComplete) {
      onComplete();
    }

    return newTimeLeft;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const sizeClasses = {
    sm: {
      container: "text-sm",
      digit: "text-lg font-semibold",
      label: "text-xs"
    },
    md: {
      container: "text-base",
      digit: "text-2xl font-semibold",
      label: "text-xs"
    },
    lg: {
      container: "text-lg",
      digit: "text-4xl font-bold",
      label: "text-sm"
    }
  };

  const variantClasses = {
    default: "bg-card border shadow-sm rounded-md p-3",
    outline: "border-2 border-primary bg-transparent rounded-md p-3",
    minimal: "bg-transparent"
  };

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className={cn(
        "w-14 h-14 flex items-center justify-center rounded-md",
        variant === 'default' ? "bg-muted" : ""
      )}>
        <span className={sizeClasses[size].digit}>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      {showLabels && (
        <span className={cn("mt-1 text-muted-foreground", sizeClasses[size].label)}>
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div className={cn(
      "flex items-center justify-center gap-2 md:gap-4",
      sizeClasses[size].container,
      variantClasses[variant],
      className
    )}>
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className={cn("text-muted-foreground", sizeClasses[size].digit)}>:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className={cn("text-muted-foreground", sizeClasses[size].digit)}>:</div>
      <TimeUnit value={timeLeft.minutes} label="Mins" />
      <div className={cn("text-muted-foreground", sizeClasses[size].digit)}>:</div>
      <TimeUnit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default CountdownTimer;`,
  component: CountdownTimerComponent,
  tags: ["UI", "timer", "countdown", "clock"],
  isNew: true,
  fileSize: "3.1 KB",
  complexity: "medium"
};

export default CountdownTimerComponentItem;
