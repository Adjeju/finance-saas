import { GetCategoriesListQueryParams } from "../types";

export const categoryQueryKeys = {
  all: ["categories"],
  getList: (params: GetCategoriesListQueryParams) => [
    ...categoryQueryKeys.all,
    params,
  ],
};
