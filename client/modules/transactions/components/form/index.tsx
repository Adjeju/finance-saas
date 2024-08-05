import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { transactionFormSchema, TransactionFormValues } from "../../validation";
import {
  PayeeField,
  CategoryField,
  DateField,
  AccountField,
  NotesField,
  AmountField,
} from "./fields";

type Props = {
  handleSubmit: (values: TransactionFormValues) => void;
  data?: TransactionFormValues;
};

const defaultValues: TransactionFormValues = {
  amount: 0,
  date: new Date(),
  notes: "",
  payee: "",
  accountId: null,
  categoryId: null,
};

export const TransactionForm = ({ handleSubmit, data }: Props) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: data || defaultValues,
  });

  const onSubmit = (values: TransactionFormValues) => handleSubmit(values);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-2 flex flex-col gap-3"
      >
        <PayeeField />
        <DateField />
        <CategoryField />
        <AccountField />
        <AmountField />
        <NotesField />
        <Button type="submit" className="mt-3 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
