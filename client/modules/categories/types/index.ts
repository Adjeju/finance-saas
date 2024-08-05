import { ApiPagination } from "@/types/api";

export type Category = {
  id: number;
  createdAt: string;
  name: string;
  userId: string;
};

export type GetCategoriesListQueryParams = ApiPagination & { search: string };

export type CreateCategoryBody = { name: string };

export type UpdateCategoryBody = { name: string; id: number };
