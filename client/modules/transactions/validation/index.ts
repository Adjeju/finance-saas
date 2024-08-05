import { z } from "zod";

export const transactionFormSchema = z.object({
  amount: z.number(),
  payee: z.string(),
  date: z.date(),
  accountId: z.number().nullable(),
  categoryId: z.number().nullable(),
  notes: z.string(),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;

export const updateTransactionCategoryFormSchema = z.object({
  categoryId: z.number().nullable(),
});

export type UpdateTransactionCategoryFormValues = z.infer<
  typeof updateTransactionCategoryFormSchema
>;

export const updateTransactionAccountFormSchema = z.object({
  accountId: z.number().nullable(),
});

export type UpdateTransactionAccountFormValues = z.infer<
  typeof updateTransactionAccountFormSchema
>;
