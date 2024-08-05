import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { TransactionFormValues } from "@/modules/transactions/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const NotesField = (props: Props) => {
  const form = useFormContext<TransactionFormValues>();

  return (
    <FormField
      control={form.control}
      name="notes"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notes</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
