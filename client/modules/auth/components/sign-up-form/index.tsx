"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { SignUpFormValues, signUpFormSchema } from "../../validation";
import { Form } from "@/components/ui/form";
import {
  SignInFormEmailField,
  SignInFormPasswordField,
  SignInFormFirstNameField,
  SignInFormLastNameField,
  SignInFormConfirmPasswordField,
} from "./fields";
import { useSignUpMutation } from "../../hooks";
import { useRouter } from "next/navigation";
import { routes } from "@/constants";
import { useToast } from "@/components/ui/use-toast";

type Props = {};

const defaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
};

export const SignUpForm = (props: Props) => {
  const { mutate } = useSignUpMutation();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues,
  });

  const onSubmit = (values: SignUpFormValues) => {
    mutate(values, {
      onSuccess: ({ message }) => {
        toast({
          title: "Sign In",
          description: message,
        });
        router.push(routes.signIn);
      },
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registration</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <SignInFormFirstNameField />
            <SignInFormLastNameField />
            <SignInFormEmailField />
            <SignInFormPasswordField />
            <SignInFormConfirmPasswordField />
            <Button className="w-full">Sign in</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
