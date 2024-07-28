import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAccountsListApi, getAccountById } from "../api";
import { GetAccountsListQueryParams } from "../types";
import { accountQueryKeys } from "../constants";

export const useGetAccountsList = (params: GetAccountsListQueryParams) =>
  useQuery({
    queryKey: accountQueryKeys.getList(params),
    queryFn: () => getAccountsListApi(params),
    placeholderData: keepPreviousData,
  });

export const useGetAccountByIdQuery = (id: number | null) =>
  useQuery({
    queryKey: accountQueryKeys.getById(id),
    queryFn: () => getAccountById(id || 0),
    enabled: Boolean(id),
  });
