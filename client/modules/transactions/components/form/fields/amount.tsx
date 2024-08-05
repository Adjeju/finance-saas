import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TransactionFormValues } from "@/modules/transactions/validation";
import React from "react";
import { useFormContext } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {};

export const AmountField = (props: Props) => {
  const form = useFormContext<TransactionFormValues>();

  return (
    <FormField
      control={form.control}
      name="amount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Amount</FormLabel>
          <FormControl>
            <div className="flex gap-2">
              <Button
                disabled={!field.value || field.value === 0}
                type="button"
                size="icon"
                className={cn(
                  "flex-shrink-0 border-none",
                  field.value > 0 ? "bg-red-600" : "bg-green-600"
                )}
                onClick={() => field.onChange(-field.value)}
              >
                {field.value > 0 ? (
                  <Minus className="h-4 w-4 text-white" />
                ) : (
                  <Plus className="h-4 w-4 text-white" />
                )}
              </Button>
              <CurrencyInput
                placeholder="Please enter a number"
                className="flex h-10 w-full rounded-md border 
                border-input bg-background px-3 py-2 text-sm ring-offset-background 
                file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                //TODO: add decimal formatting
                value={field.value}
                onValueChange={(value, name, { float }: any) => {
                  field.onChange(float);
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
