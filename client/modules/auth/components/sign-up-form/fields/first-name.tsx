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

export const SignInFormFirstNameField = (props: Props) => {
  const form = useFormContext<SignUpFormValues>();

  return (
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter first name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
