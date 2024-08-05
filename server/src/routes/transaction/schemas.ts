import z from "zod";

export const createTransactionBodySchema = z.object({
  amount: z.number(),
  payee: z.string(),
  date: z.string().datetime(),
  accountId: z.number().nullable(),
  categoryId: z.number().nullable(),
  notes: z.string().nullable(),
});

export type CreateTransactionBodyValues = z.infer<
  typeof createTransactionBodySchema
>;

export const updateTransactionBodySchema = z.object({
  amount: z.number().optional(),
  payee: z.string().optional(),
  date: z.string().datetime().optional(),
  categoryId: z.number().nullable().optional(),
  accountId: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type UpdateTransactionBodyValues = z.infer<
  typeof updateTransactionBodySchema
>;

export const transactionParamsSchema = z.object({
  id: z.string(),
});

export const deleteTransactionBodySchema = z.object({
  ids: z.array(z.number()).min(1),
});

export const updateAccountBodySchema = z.object({
  name: z.string(),
});

export const getTransactionsQueryStringSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  search: z.string().or(z.undefined()),
  accountId: z.string().or(z.undefined()),
  categoryId: z.string().or(z.undefined()),
  from: z.string().datetime().or(z.undefined()),
  to: z.string().datetime().or(z.undefined()),
});
