import z from "zod";

export const createCategoryBodySchema = z.object({
  name: z.string(),
});

export type CreateCategoryBodyValues = z.infer<typeof createCategoryBodySchema>;

export const categoryParamsSchema = z.object({
  id: z.string(),
});

export const deleteCategoryBodySchema = z.object({
  ids: z.array(z.number()).min(1),
});

export const updateCategoryBodySchema = z.object({
  name: z.string(),
});

export const getCategoriesQueryStringSchema = z.object({
  page: z.string(),
  perPage: z.string(),
  search: z.string().or(z.undefined()),
});
