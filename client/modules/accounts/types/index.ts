import { ApiPagination } from "@/types/api";

export type Account = {
  id: number;
  createdAt: string;
  name: string;
  userId: string;
};

export type GetAccountsListQueryParams = ApiPagination & { search: string };

export type CreateAccountBody = { name: string };

export type UpdateAccountBody = { name: string; id: number };
