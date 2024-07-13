import { api } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import { Category, GetCategoriesListQueryParams } from "../types";

export const getCategoriesListApi = (
  searchParams: GetCategoriesListQueryParams
) => api.get("category", { searchParams }).json<ApiListResponse<Category>>();

export const createCategoryApi = (json: Omit<Category, "id" | "createdAt">) =>
  api.post("category", { json }).json<Category>();
