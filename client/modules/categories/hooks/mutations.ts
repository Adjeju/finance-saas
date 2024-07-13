import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCategoryBody, UpdateCategoryBody } from "../types";
import {
  createCategoryApi,
  deleteCategoriesApi,
  updateCategoryApi,
} from "../api";
import { categoryQueryKeys } from "../constants";
import { useToast } from "@/components/ui/use-toast";

export const useCreateCategoryMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCategoryBody) => createCategoryApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: categoryQueryKeys.all });
      toast({
        title: "Category",
        description: "Category has been created!",
      });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateCategoryBody) => updateCategoryApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: categoryQueryKeys.all });
      toast({
        title: "Category",
        description: "Category has been updated!",
      });
    },
  });
};

export const useDeleteCategoriesMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: number[]) => deleteCategoriesApi(ids),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: categoryQueryKeys.all });
      toast({
        title: "Category",
        description: "Category has been deleted!",
      });
    },
  });
};
