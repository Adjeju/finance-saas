import z from "zod";

export const createCategoryBodySchema = z.object({
  name: z.string(),
});

export type CreateCategoryBodyValues = z.infer<typeof createCategoryBodySchema>;

export const categoryParamsSchema = z.object({
  id: z.string(),
});

export const updateCategoryBodySchema = z.object({
  name: z.string(),
});

export const getCategoriesQueryStringSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  search: z.string().or(z.undefined()),
});
