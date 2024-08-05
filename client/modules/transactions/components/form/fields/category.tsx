import { CreatableSelect } from "@/components/ui/creatable-select";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useCreateCategoryMutation,
  useGetCategoriesListQuery,
} from "@/modules/categories/hooks";
import { TransactionFormValues } from "@/modules/transactions/validation";
import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {};

export const CategoryField = (props: Props) => {
  const form = useFormContext<TransactionFormValues>();

  const { data, isLoading } = useGetCategoriesListQuery({
    page: 1,
    perPage: 100,
    search: "",
  });

  const { mutate } = useCreateCategoryMutation();

  const handleCreate = (name: string) => mutate({ name });

  if (isLoading) {
    return <div>Loading</div>;
  }

  const options = data?.data.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  const category = form.watch("categoryId");

  const selectedCategory = options?.find(({ value }) => category === value);

  return (
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
  );
};
