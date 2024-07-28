import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAccountBody, UpdateAccountBody } from "../types";
import { createAccountApi, deleteAccountsApi, updateAccountApi } from "../api";
import { accountQueryKeys } from "../constants";
import { useToast } from "@/components/ui/use-toast";

export const useCreateAccountMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateAccountBody) => createAccountApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: accountQueryKeys.all });
      toast({
        title: "Account",
        description: "Account has been created!",
      });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateAccountBody) => updateAccountApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: accountQueryKeys.all });
      toast({
        title: "Account",
        description: "Account has been updated!",
      });
    },
  });
};

export const useDeleteAccountsMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: number[]) => deleteAccountsApi(ids),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: accountQueryKeys.all });
      toast({
        title: "Account",
        description: "Account has been deleted!",
      });
    },
  });
};
