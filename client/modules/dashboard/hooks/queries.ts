import { useQuery } from "@tanstack/react-query";
import { GetSummaryQueryParams } from "../types";
import {
  getSummaryApi,
  getSummaryCategoriesApi,
  getSummaryTransactionsApi,
} from "../api";
import { summaryQueryKeys } from "../constants";

export const useGetSummaryQuery = (params: GetSummaryQueryParams) =>
  useQuery({
    queryKey: summaryQueryKeys.get(params),
    queryFn: () => getSummaryApi(params),
    enabled: Boolean(params.accountId && params.from && params.to),
  });

export const useGetSummaryCategoriesQuery = (params: GetSummaryQueryParams) =>
  useQuery({
    queryKey: summaryQueryKeys.getCategories(params),
    queryFn: () => getSummaryCategoriesApi(params),
    enabled: Boolean(params.accountId && params.from && params.to),
  });

export const useGetSummaryTransactionsQuery = (params: GetSummaryQueryParams) =>
  useQuery({
    queryKey: summaryQueryKeys.getTransactions(params),
    queryFn: () => getSummaryTransactionsApi(params),
    enabled: Boolean(params.accountId && params.from && params.to),
  });
