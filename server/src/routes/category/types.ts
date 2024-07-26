import { Pagination } from "../../types";

export type UpdateCategoryData = { name: string; id: number };

export type GetCategoryListData = {
  userId?: number;
  search?: string;
} & Pagination;
