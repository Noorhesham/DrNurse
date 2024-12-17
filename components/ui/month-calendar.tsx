"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useNavigation } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format, setMonth, setYear, setDate } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

export type MonthCalendarProps = React.ComponentProps<typeof DayPicker>;

const MonthDropdown: React.FC<{ onSelect: (date: Date) => void }> = ({ onSelect }) => {
  const { goToMonth, currentMonth } = useNavigation();

  const selectItems = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: format(setMonth(new Date(), i), "MMMM"),
  }));

  return (
    <Select 
      onValueChange={(newval) => {
        const newMonth = parseInt(newval);
        const updatedDate = setDate(setMonth(currentMonth, newMonth), 1);
        goToMonth(updatedDate);
        onSelect(updatedDate); // Close on selection
      }}
      value={currentMonth.getMonth().toString()}
    >
      <SelectTrigger className=" my-4 ">{format(currentMonth, "MMMM")}</SelectTrigger>
      <SelectContent className="relative !z-[60]">
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const YearDropdown: React.FC<{ onSelect: (date: Date) => void }> = ({ onSelect }) => {
  const { goToMonth, currentMonth } = useNavigation();
  const startYear = 1950;
  const endYear = new Date().getFullYear() + 50;

  const selectItems = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { label: year.toString(), value: year.toString() };
  });

  return (
    <Select
      onValueChange={(newval) => {
        const newYear = parseInt(newval);
        const updatedDate = setDate(setYear(currentMonth, newYear), 1);
        goToMonth(updatedDate);
        onSelect(updatedDate); // Close on selection
      }}
      value={currentMonth.getFullYear().toString()}
    >
      <SelectTrigger>{currentMonth.getFullYear()}</SelectTrigger>
      <SelectContent className="relative !z-[60]">
        {selectItems.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

function MonthCalendar({
  className,
  classNames,
  showOutsideDays = true,
  fromYear = 1950,
  onSelect,
  ...props
}: MonthCalendarProps & { onSelect?: (date: Date) => void }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 flex", className)}
      classNames={{
        months: "flex  sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent hidden p-0 opacity-50 hover:opacity-100"
        ),
        head_row: " hidden flex",
        head_cell: "hidden text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        row: "flex hidden ",
        cell: "h-9 hidden",
        day: "hidden",
        ...classNames,
      }}
      fromYear={fromYear}
      toYear={new Date().getFullYear() + 50}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 hidden w-4" {...props} />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 hidden w-4" {...props} />,
        Dropdown: (props) =>
          props.name === "months" ? (
            <MonthDropdown onSelect={onSelect || (() => {})} />
          ) : props.name === "years" ? (
            <YearDropdown onSelect={onSelect || (() => {})} />
          ) : null,
      }}
      {...props}
    />
  );
}

MonthCalendar.displayName = "MonthCalendar";

export { MonthCalendar };
