import { CreatableSelect } from "@/components/ui/creatable-select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useCreateAccountMutation,
  useGetAccountsList,
} from "@/modules/accounts/hooks";
import { TransactionFormValues } from "@/modules/transactions/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const AccountField = (props: Props) => {
  const form = useFormContext<TransactionFormValues>();

  const { data, isLoading } = useGetAccountsList({
    page: 1,
    perPage: 100,
    search: "",
  });

  const { mutate } = useCreateAccountMutation();

  const handleCreate = (name: string) => mutate({ name });

  if (isLoading) {
    return <div>Loading</div>;
  }

  const options = data?.data.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const account = form.watch("accountId");

  const selectedAccount = options?.find(({ value }) => account === value);

  return (
    <FormField
      control={form.control}
      name="accountId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Account</FormLabel>
          <CreatableSelect
            options={options}
            onChange={({ value }: any) => field.onChange(value)}
            value={selectedAccount}
            onCreateOption={handleCreate}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
