import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordField } from "@/components/ui/password-field";
import { SignUpFormValues } from "@/modules/auth/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const SignInFormPasswordField = (props: Props) => {
  const form = useFormContext<SignUpFormValues>();

  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <PasswordField placeholder="Enter password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
