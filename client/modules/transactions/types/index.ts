import { Account } from "@/modules/accounts/types";
import { Category } from "@/modules/categories/types";
import { ApiPagination } from "@/types/api";

export type Transaction = {
  id: number;
  amount: number;
  payee: string;
  date: string;
  accountId: null | number;
  categoryId: null | number;
  notes: string;
  userId: number;
  category: Category | null;
  account: Account | null;
};

export type GetTransactionsListQueryParams = ApiPagination & {
  search: string;
  accountId: number | null;
  categoryId: number | null;
  from: string | null;
  to: string | null;
};

export type GetTransactionsListQueryParamsKeys =
  keyof GetTransactionsListQueryParams;

export type CreateTransactionBody = {
  amount: number;
  payee: string;
  date: string;
  accountId: null | number;
  categoryId: null | number;
  notes: string;
};

export type UpdateTransactionBody = Partial<CreateTransactionBody> & {
  id: number;
};
