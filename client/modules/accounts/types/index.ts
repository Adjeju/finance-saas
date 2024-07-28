import { ApiPagination } from "@/types/api";

export type Account = {
  id: number;
  createdAt: string;
  name: string;
  userId: string;
};

export type GetAccountsListQueryParams = ApiPagination & { search: string };

export type CreateAccountBody = Omit<Account, "id" | "createdAt">;

export type UpdateAccountBody = Omit<Account, "createdAt" | "userId">;
