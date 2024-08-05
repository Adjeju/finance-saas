import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TransactionFormValues } from "@/modules/transactions/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const PayeeField = (props: Props) => {
  const form = useFormContext<TransactionFormValues>();

  return (
    <FormField
      control={form.control}
      name="payee"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Payee</FormLabel>
          <FormControl>
            <Input placeholder="Payee" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
