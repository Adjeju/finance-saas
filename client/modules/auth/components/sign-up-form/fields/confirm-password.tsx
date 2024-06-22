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

export const SignInFormConfirmPasswordField = (props: Props) => {
  const form = useFormContext<SignUpFormValues>();

  return (
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input placeholder="Confirm password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
