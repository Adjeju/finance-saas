import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategoriesListApi, getCategoryById } from "../api";
import { GetCategoriesListQueryParams } from "../types";
import { categoryQueryKeys } from "../constants";

export const useGetCategoriesList = (params: GetCategoriesListQueryParams) =>
  useQuery({
    queryKey: categoryQueryKeys.getList(params),
    queryFn: () => getCategoriesListApi(params),
    placeholderData: keepPreviousData,
  });

export const useGetCategoryByIdQuery = (id: number | null) =>
  useQuery({
    queryKey: categoryQueryKeys.getById(id),
    queryFn: () => getCategoryById(id || 0),
    enabled: Boolean(id),
  });
