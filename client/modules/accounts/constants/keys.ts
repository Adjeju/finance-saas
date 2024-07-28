import { GetAccountsListQueryParams } from "../types";

export const accountQueryKeys = {
  all: ["accounts"],
  getList: (params: GetAccountsListQueryParams) => [
    ...accountQueryKeys.all,
    "list",
    params,
  ],
  getById: (id: number | null) => [...accountQueryKeys.all, { id }],
};
