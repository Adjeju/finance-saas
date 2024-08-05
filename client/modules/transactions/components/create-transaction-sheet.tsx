import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useCreateTransactionSheet } from "../hooks";
import { useCreateTransactionMutation } from "../hooks/mutations";
import { TransactionFormValues } from "../validation";
import { TransactionForm } from "./form";

type Props = {};

export const CreateTransactionSheet = (props: Props) => {
  const { close, isOpen } = useCreateTransactionSheet();

  const { mutate } = useCreateTransactionMutation();

  const handleSubmit = (data: TransactionFormValues) =>
    mutate(
      { ...data, date: data.date.toISOString(), amount: data.amount * 100 },
      { onSuccess: close },
    );

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create transaction</SheetTitle>
          <SheetDescription>Create new transaction</SheetDescription>
        </SheetHeader>
        <TransactionForm handleSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
};
