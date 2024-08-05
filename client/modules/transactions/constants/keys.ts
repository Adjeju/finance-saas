import { GetAccountsListQueryParams } from "../types";

export const transactionQueryKeys = {
  all: ["accounts"],
  getList: (params: GetAccountsListQueryParams) => [
    ...transactionQueryKeys.all,
    "list",
    params,
  ],
  getById: (id: number | null) => [...transactionQueryKeys.all, { id }],
};
