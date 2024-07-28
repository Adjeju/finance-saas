import { api } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import { Account, GetAccountsListQueryParams } from "../types";
import { apiRoutes } from "@/constants";

export const getAccountsListApi = (searchParams: GetAccountsListQueryParams) =>
  api.get(apiRoutes.account, { searchParams }).json<ApiListResponse<Account>>();

export const createAccountApi = (json: Omit<Account, "id" | "createdAt">) =>
  api.post(apiRoutes.account, { json }).json<Account>();

export const getAccountById = (id: number) =>
  api.get(`${apiRoutes.account}/${id}`).json<Account>();

export const updateAccountApi = ({
  id,
  name,
}: Omit<Account, "userId" | "createdAt">) =>
  api.put(`${apiRoutes.account}/${id}`, { json: { name } }).json<Account>();

export const deleteAccountsApi = (ids: number[]) =>
  api.delete(apiRoutes.account, { json: { ids } }).json<{ message: string }>();
