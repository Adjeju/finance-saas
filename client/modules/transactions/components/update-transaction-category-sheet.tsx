import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import {
  updateTransactionCategoryFormSchema,
  UpdateTransactionCategoryFormValues,
} from "../validation";
import {
  useUpdateTransactionCategorySheet,
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
import {
  useCreateCategoryMutation,
  useGetCategoriesListQuery,
} from "@/modules/categories/hooks";
import { CreatableSelect } from "@/components/ui/creatable-select";

type Props = {};

export const UpdateTransactionCategorySheet = (props: Props) => {
  const { close, isOpen, id } = useUpdateTransactionCategorySheet();

  const form = useForm<UpdateTransactionCategoryFormValues>({
    resolver: zodResolver(updateTransactionCategoryFormSchema),
    defaultValues: {
      categoryId: null,
    },
  });

  const { mutate } = useUpdateTransactionMutation();

  const onSubmit = ({ categoryId }: UpdateTransactionCategoryFormValues) => {
    mutate({ categoryId, id: id! }, { onSuccess: close });
  };

  const { data, isLoading } = useGetCategoriesListQuery({
    page: 1,
    perPage: 100,
    search: "",
  });

  const { mutate: createCategory } = useCreateCategoryMutation();

  const handleCreate = (name: string) => createCategory({ name });

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

  const category = form.watch("categoryId");

  const selectedCategory = options?.find(({ value }) => category === value);

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update transaction category</SheetTitle>
          <SheetDescription>Update transaction category</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <CreatableSelect
                    options={options}
                    onChange={({ value }: any) => field.onChange(value)}
                    value={selectedCategory}
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
