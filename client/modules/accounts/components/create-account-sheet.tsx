import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useCreateAccountSheet } from "../hooks";
import { AccountForm } from "./form";
import { useCreateAccountMutation } from "../hooks/mutations";
import { AccountFormValues } from "../validation";

type Props = {};

export const CreateAccountSheet = (props: Props) => {
  const { close, isOpen } = useCreateAccountSheet();

  const { mutate } = useCreateAccountMutation();

  const handleSubmit = (data: AccountFormValues) =>
    mutate(data, {
      onSuccess: close,
    });

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create account</SheetTitle>
          <SheetDescription>Create new account</SheetDescription>
        </SheetHeader>
        <AccountForm handleSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
};
