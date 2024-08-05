import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import {
  updateTransactionAccountFormSchema,
  UpdateTransactionAccountFormValues,
} from "../validation";
import {
  useUpdateTransactionAccountSheet,
  useUpdateTransactionMutation,
} from "../hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CreatableSelect } from "@/components/ui/creatable-select";
import {
  useCreateAccountMutation,
  useGetAccountsListQuery,
} from "@/modules/accounts/hooks";

type Props = {};

export const UpdateTransactionAccountSheet = (props: Props) => {
  const { close, isOpen, id } = useUpdateTransactionAccountSheet();

  const form = useForm<UpdateTransactionAccountFormValues>({
    resolver: zodResolver(updateTransactionAccountFormSchema),
    defaultValues: {
      accountId: null,
    },
  });

  const { mutate } = useUpdateTransactionMutation();

  const onSubmit = ({ accountId }: UpdateTransactionAccountFormValues) => {
    mutate({ accountId, id: id! }, { onSuccess: close });
  };

  const { data, isLoading } = useGetAccountsListQuery({
    page: 1,
    perPage: 100,
    search: "",
  });

  const { mutate: createAccount } = useCreateAccountMutation();

  const handleCreate = (name: string) => createAccount({ name });

  if (!id) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  const options = data?.data.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const account = form.watch("accountId");

  const selectedAccount = options?.find(({ value }) => account === value);

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update transaction account</SheetTitle>
          <SheetDescription>Update transaction account</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex flex-col gap-3"
          >
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
            <Button type="submit" className="mt-3 w-full">
              Submit
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
