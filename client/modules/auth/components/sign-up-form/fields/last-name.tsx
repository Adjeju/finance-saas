import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpFormValues } from "@/modules/auth/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const SignInFormLastNameField = (props: Props) => {
  const form = useFormContext<SignUpFormValues>();

  return (
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter last name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
