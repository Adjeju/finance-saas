import z from "zod";

export const createAccountBodySchema = z.object({
  name: z.string(),
});

export type CreateAccountBodyValues = z.infer<typeof createAccountBodySchema>;

export const accountParamsSchema = z.object({
  id: z.string(),
});

export const deleteAccountsBodySchema = z.object({
  ids: z.array(z.number()).min(1),
});

export const updateAccountBodySchema = z.object({
  name: z.string(),
});

export const getAccountsQueryStringSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  search: z.string().or(z.undefined()),
});
