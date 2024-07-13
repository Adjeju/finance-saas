import { api } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import { Category, GetCategoriesListQueryParams } from "../types";
import { apiRoutes } from "@/constants";

export const getCategoriesListApi = (
  searchParams: GetCategoriesListQueryParams
) =>
  api
    .get(apiRoutes.category, { searchParams })
    .json<ApiListResponse<Category>>();

export const createCategoryApi = (json: Omit<Category, "id" | "createdAt">) =>
  api.post(apiRoutes.category, { json }).json<Category>();

export const getCategoryById = (id: number) =>
  api.get(`${apiRoutes.category}/${id}`).json<Category>();

export const updateCategoryApi = ({
  id,
  name,
}: Omit<Category, "userId" | "createdAt">) =>
  api.put(`${apiRoutes.category}/${id}`, { json: { name } }).json<Category>();

export const deleteCategoriesApi = (ids: number[]) =>
  api.delete(apiRoutes.category, { json: { ids } }).json<{ message: string }>();
