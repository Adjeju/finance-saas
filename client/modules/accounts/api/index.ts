import { api } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import {
  Account,
  CreateAccountBody,
  GetAccountsListQueryParams,
  UpdateAccountBody,
} from "../types";
import { apiRoutes } from "@/constants";

export const getAccountsListApi = (searchParams: GetAccountsListQueryParams) =>
  api.get(apiRoutes.account, { searchParams }).json<ApiListResponse<Account>>();

export const createAccountApi = (json: CreateAccountBody) =>
  api.post(apiRoutes.account, { json }).json<Account>();

export const getAccountById = (id: number) =>
  api.get(`${apiRoutes.account}/${id}`).json<Account>();

export const updateAccountApi = ({ id, name }: UpdateAccountBody) =>
  api.put(`${apiRoutes.account}/${id}`, { json: { name } }).json<Account>();

export const deleteAccountsApi = (ids: number[]) =>
  api.delete(apiRoutes.account, { json: { ids } }).json<{ message: string }>();
