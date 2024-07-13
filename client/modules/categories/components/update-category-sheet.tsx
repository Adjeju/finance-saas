import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { CategoryForm } from "./form";
import { CategoryFormValues } from "../validation";
import { useUpdateCategorySheet } from "../hooks/use-update-categories-sheet";
import { useGetCategoryByIdQuery, useUpdateCategoryMutation } from "../hooks";

type Props = {};

export const UpdateCategorySheet = (props: Props) => {
  const { close, isOpen, id } = useUpdateCategorySheet();

  const { data, isLoading } = useGetCategoryByIdQuery(id);

  const { mutate } = useUpdateCategoryMutation();

  const handleSubmit = ({ name }: CategoryFormValues) =>
    mutate({ name, id: id! }, { onSuccess: close });

  if (!id) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update category</SheetTitle>
          <SheetDescription>Update category</SheetDescription>
        </SheetHeader>
        <CategoryForm
          handleSubmit={handleSubmit}
          data={{ name: data?.name || "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
