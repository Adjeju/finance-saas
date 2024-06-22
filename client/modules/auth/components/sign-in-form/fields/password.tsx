import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInFormValues } from "@/modules/auth/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const SignInFormPasswordField = (props: Props) => {
  const form = useFormContext<SignInFormValues>();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="Enter password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
