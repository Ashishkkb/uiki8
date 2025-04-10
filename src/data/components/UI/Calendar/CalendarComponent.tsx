
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

  return (
    <Calendar
      mode={mode}
      selected={date}
      onSelect={handleSelect}
      className={cn("rounded-md border", className)}
      disabled={disabled}
      initialFocus={initialFocus}
      numberOfMonths={numberOfMonths}
      showOutsideDays={showOutsideDays}
    />
  );
};

export default CalendarComponent;
