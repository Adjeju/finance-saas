import { GetCategoriesListQueryParams } from "../types";

export const categoryQueryKeys = {
  all: ["categories"],
  getList: (params: GetCategoriesListQueryParams) => [
    ...categoryQueryKeys.all,
    "list",
    params,
  ],
  getById: (id: number | null) => [...categoryQueryKeys.all, { id }],
};
