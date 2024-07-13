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
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { SignInFormValues, signInFormSchema } from "../../validation";
import { Form } from "@/components/ui/form";
import { useSignInMutation } from "../../hooks";
import { SignInFormEmailField, SignInFormPasswordField } from "./fields";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { routes } from "@/constants";

type Props = {};

const defaultValues = {
  email: "",
  password: "",
};

export const SignInForm = (props: Props) => {
  const { mutate } = useSignInMutation();

  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues,
  });

  const onSubmit = (values: SignInFormValues) => {
    mutate(values, {
      onSuccess: ({ user, token }) => {
        const { firstName, lastName, id } = user;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id.toString());
        toast({
          title: "Sign Up",
          description: `Welcome back, ${firstName} ${lastName}`,
        });
        router.push(routes.dashboard);
      },
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email and password below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SignInFormEmailField />
            <SignInFormPasswordField />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
