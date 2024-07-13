import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "../types";
import { createCategoryApi } from "../api";
import { categoryQueryKeys } from "../constants";

export const useCreateCategoryMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Category, "id" | "createdAt">) =>
      createCategoryApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: categoryQueryKeys.all });
    },
  });
};
