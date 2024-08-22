import { api } from "@/lib/api";

import { apiRoutes } from "@/constants";
import {
  GetSummaryQueryParams,
  Summary,
  SummaryCategories,
  SummaryTransactions,
} from "../types";

export const getSummaryApi = (searchParams: GetSummaryQueryParams) =>
  api.get(apiRoutes.summary, { searchParams }).json<Summary>();

export const getSummaryCategoriesApi = (searchParams: GetSummaryQueryParams) =>
  api
    .get(`${apiRoutes.summary}/categories`, { searchParams })
    .json<SummaryCategories>();

export const getSummaryTransactionsApi = (
  searchParams: GetSummaryQueryParams,
) =>
  api
    .get(`${apiRoutes.summary}/transactions`, { searchParams })
    .json<SummaryTransactions>();
