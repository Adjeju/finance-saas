import { Pagination } from "../../types";

export type GetTransactionListData = {
  userId?: number;
  search?: string;
  accountId?: number;
  categoryId?: number;
  from?: string;
  to?: string;
} & Pagination;
