import { GetSummaryQueryParams } from "../types";

export const summaryQueryKeys = {
  all: ["summary"],
  get: (params: GetSummaryQueryParams) => [...summaryQueryKeys.all, params],
  getCategories: (params: GetSummaryQueryParams) => [
    ...summaryQueryKeys.all,
    "categories",
    params,
  ],
  getTransactions: (params: GetSummaryQueryParams) => [
    ...summaryQueryKeys.all,
    "transactions",
    params,
  ],
};
