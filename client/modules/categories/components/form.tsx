import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { categoryFormSchema, CategoryFormValues } from "../validation";

type Props = {
  handleSubmit: (values: CategoryFormValues) => void;
  data?: CategoryFormValues;
};

const defaultValues: CategoryFormValues = {
  name: "",
};

export const CategoryForm = ({ handleSubmit, data }: Props) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: data || defaultValues,
  });

  const onSubmit = (values: CategoryFormValues) => handleSubmit(values);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};
