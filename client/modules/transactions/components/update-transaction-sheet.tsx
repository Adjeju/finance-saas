import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { TransactionForm } from "./form";
import { TransactionFormValues } from "../validation";
import { useUpdateTransactionSheet } from "../hooks/use-update-transaction-sheet";
import { useGetTransactionById, useUpdateTransactionMutation } from "../hooks";
import { Transaction } from "../types";

type Props = {};

const transformData = (data: Transaction): TransactionFormValues => ({
  ...data,
  date: new Date(data.date),
});

export const UpdateTransactionSheet = (props: Props) => {
  const { close, isOpen, id } = useUpdateTransactionSheet();

  const { data, isLoading } = useGetTransactionById(id);

  const { mutate } = useUpdateTransactionMutation();

  const handleSubmit = ({ date, amount, ...values }: TransactionFormValues) => {
    mutate(
      { ...values, amount: amount * 100, date: date.toISOString(), id: id! },
      { onSuccess: close }
    );
  };

  if (!id) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update transaction</SheetTitle>
          <SheetDescription>Update transaction</SheetDescription>
        </SheetHeader>
        <TransactionForm
          handleSubmit={handleSubmit}
          data={transformData(data!)}
        />
      </SheetContent>
    </Sheet>
  );
};
