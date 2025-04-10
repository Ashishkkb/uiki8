
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface CalendarComponentProps {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: "single" | "multiple" | "range";
  disabled?: boolean;
  initialFocus?: boolean;
  numberOfMonths?: number;
  showOutsideDays?: boolean;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  className,
  selected,
  onSelect,
  mode = "single",
  disabled = false,
  initialFocus = false,
  numberOfMonths = 1,
  showOutsideDays = true,
}) => {
  const [date, setDate] = useState<Date | undefined>(selected);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onSelect) {
      onSelect(selectedDate);
    }
  };

  // We need to conditionally render the Calendar based on mode to satisfy TypeScript
  if (mode === "single") {
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSelect}
        className={cn("rounded-md border", className)}
        disabled={disabled}
        initialFocus={initialFocus}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
      />
    );
  } else if (mode === "multiple") {
    // For multiple mode, we need to handle an array of dates
    return (
      <Calendar
        mode="multiple"
        selected={date ? [date] : []} // Convert to array for multiple mode
        onSelect={(dates) => handleSelect(dates?.[0])} // Take first date from array
        className={cn("rounded-md border", className)}
        disabled={disabled}
        initialFocus={initialFocus}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
      />
    );
  } else {
    // For range mode
    return (
      <Calendar
        mode="range"
        selected={{
          from: date,
          to: date
        }}
        onSelect={(range) => handleSelect(range?.from)}
        className={cn("rounded-md border", className)}
        disabled={disabled}
        initialFocus={initialFocus}
        numberOfMonths={numberOfMonths}
        showOutsideDays={showOutsideDays}
      />
    );
  }
};

export default CalendarComponent;
