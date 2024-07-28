import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import { AccountForm } from "./form";
import { AccountFormValues } from "../validation";
import { useUpdateAccountSheet } from "../hooks/use-update-account-sheet";
import { useGetAccountByIdQuery, useUpdateAccountMutation } from "../hooks";

type Props = {};

export const UpdateAccountSheet = (props: Props) => {
  const { close, isOpen, id } = useUpdateAccountSheet();

  const { data, isLoading } = useGetAccountByIdQuery(id);

  const { mutate } = useUpdateAccountMutation();

  const handleSubmit = ({ name }: AccountFormValues) =>
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
        <AccountForm
          handleSubmit={handleSubmit}
          data={{ name: data?.name || "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
