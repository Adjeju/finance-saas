import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTransactionBody, UpdateTransactionBody } from "../types";
import {
  createTransactionApi,
  deleteTransactionsApi,
  updateTransactionApi,
} from "../api";
import { transactionQueryKeys } from "../constants";
import { useToast } from "@/components/ui/use-toast";

export const useCreateTransactionMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateTransactionBody) => createTransactionApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: transactionQueryKeys.all });
      toast({
        title: "Transaction",
        description: "Transaction has been created!",
      });
    },
  });
};

export const useUpdateTransactionMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateTransactionBody) => updateTransactionApi(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: transactionQueryKeys.all });
      toast({
        title: "Transaction",
        description: "Transaction has been updated!",
      });
    },
  });
};

export const useDeleteTransactionsMutation = () => {
  const client = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (ids: number[]) => deleteTransactionsApi(ids),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: transactionQueryKeys.all });
      toast({
        title: "Transactions",
        description: "Transactions has been deleted!",
      });
    },
  });
};
