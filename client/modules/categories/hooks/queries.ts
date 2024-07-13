import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategoriesListApi } from "../api";
import { GetCategoriesListQueryParams } from "../types";
import { categoryQueryKeys } from "../constants";

export const useGetCategoriesList = (params: GetCategoriesListQueryParams) =>
  useQuery({
    queryKey: categoryQueryKeys.getList(params),
    queryFn: () => getCategoriesListApi(params),
    placeholderData: keepPreviousData,
  });
