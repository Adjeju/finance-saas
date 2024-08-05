import { api } from "@/lib/api";
import { ApiListResponse } from "@/types/api";
import {
  Transaction,
  CreateTransactionBody,
  GetTransactionsListQueryParams,
  UpdateTransactionBody,
  GetTransactionsListQueryParamsKeys,
} from "../types";
import { apiRoutes } from "@/constants";

export const getTransactionsListApi = (
  searchParams: GetTransactionsListQueryParams,
) =>
  api
    .get(apiRoutes.transaction, {
      searchParams: (
        Object.keys(searchParams) as GetTransactionsListQueryParamsKeys[]
      ).reduce((prev, key) => {
        if (searchParams[key]) {
          return { ...prev, [key]: searchParams[key] };
        }
        return prev;
      }, {}),
    })
    .json<ApiListResponse<Transaction>>();

export const createTransactionApi = (json: CreateTransactionBody) =>
  api.post(apiRoutes.transaction, { json }).json<Transaction>();

export const getTransactionByIdApi = (id: number) =>
  api.get(`${apiRoutes.transaction}/${id}`).json<Transaction>();

export const updateTransactionApi = ({ id, ...json }: UpdateTransactionBody) =>
  api.put(`${apiRoutes.transaction}/${id}`, { json }).json<Transaction>();

export const deleteTransactionsApi = (ids: number[]) =>
  api
    .delete(apiRoutes.transaction, { json: { ids } })
    .json<{ message: string }>();
