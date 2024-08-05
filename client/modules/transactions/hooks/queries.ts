import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTransactionsListApi, getTransactionByIdApi } from "../api";
import { GetTransactionsListQueryParams } from "../types";
import { transactionQueryKeys } from "../constants";

export const useGetTransactionList = (params: GetTransactionsListQueryParams) =>
  useQuery({
    queryKey: transactionQueryKeys.getList(params),
    queryFn: () => getTransactionsListApi(params),
    placeholderData: keepPreviousData,
  });

export const useGetTransactionById = (id: number | null) =>
  useQuery({
    queryKey: transactionQueryKeys.getById(id),
    queryFn: () => getTransactionByIdApi(id || 0),
    enabled: Boolean(id),
  });
