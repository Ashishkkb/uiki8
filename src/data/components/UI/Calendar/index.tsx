
import { ComponentItem } from "@/types/component";
import CalendarComponent from "./CalendarComponent";

const CalendarComponentItem: ComponentItem = {
  id: 133,
  name: "Calendar",
  category: "UI",
  framework: "React",
  description: "A calendar component for date selection with support for single, multiple, and range selections.",
  component: CalendarComponent,
  price: "Free",
  language: "TypeScript",
  tags: ["date", "calendar", "picker", "form", "input"],
  isNew: true,
  fileSize: "1.3kb",
  complexity: "medium",
  code: `import React, { useState } from 'react';
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

export default CalendarComponent;`
};

export default CalendarComponentItem;
