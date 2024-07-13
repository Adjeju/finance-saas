import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { useCreateCategoriesSheet } from "../hooks";
import { CategoryForm } from "./form";
import { useCreateCategoryMutation } from "../hooks/mutations";
import { CategoryFormValues } from "../validation";

type Props = {};

export const CreateCategorySheet = (props: Props) => {
  const { close, isOpen } = useCreateCategoriesSheet();

  const { mutate } = useCreateCategoryMutation();

  const handleSubmit = ({ name }: CategoryFormValues) =>
    mutate(
      { name, userId: localStorage.getItem("userId")! },
      {
        onSuccess: close,
      }
    );

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create category</SheetTitle>
          <SheetDescription>Create new category</SheetDescription>
        </SheetHeader>
        <CategoryForm handleSubmit={handleSubmit} />
      </SheetContent>
    </Sheet>
  );
};
