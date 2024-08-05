import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useTransactionsFilter } from "@/modules/transactions/hooks";
import { addMonths, format } from "date-fns";
import { CalendarIcon, XIcon } from "lucide-react";

import React from "react";
import { DateRange } from "react-day-picker";

type Props = {};

export const TransactionFromToFilter = (props: Props) => {
  const { from, setFrom, to, setTo } = useTransactionsFilter();

  const date: DateRange | undefined = { from, to };

  const handleClear = () => {
    setFrom(undefined);
    setTo(undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Date range</Label>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              defaultMonth={addMonths(new Date(), -1)}
              selected={date}
              onSelect={(date) => {
                setFrom(date?.from);
                setTo(date?.to);
              }}
              numberOfMonths={2}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
            />
          </PopoverContent>
        </Popover>
        <Button variant="outline" size="icon" onClick={handleClear}>
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
