"use client";

import AccountHeader from "@/components/shared/account-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import {
  useCreateAccountSheet,
  useDeleteAccountsMutation,
  useGetAccountsList,
} from "../hooks";
import { Button } from "@/components/ui/button";
import {
  CreateAccountSheet,
  DeleteAccountAlert,
  UpdateAccountSheet,
} from "../components";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiPerPage } from "@/constants";
import { columns } from "../constants";
import { Row } from "@tanstack/react-table";
import { Account } from "../types";

type Props = {};

const AccountsPage = (props: Props) => {
  const { open } = useCreateAccountSheet();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(ApiPerPage.min);

  const debounceSearch = useDebounce(search);

  const { data } = useGetAccountsList({
    page,
    perPage,
    search: debounceSearch,
  });

  const { mutate } = useDeleteAccountsMutation();

  const handleDelete = (data: Row<Account>[]) =>
    mutate(data.map(({ original }) => original.id));

  return (
    <div>
      <AccountHeader>Accounts</AccountHeader>
      <div className="p-4">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div>Account list</div>
            <Button className="block ml-auto" onClick={open}>
              Add new account
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data?.data || []}
              handleSearch={setSearch}
              search={search}
              handlePage={setPage}
              handlePerPage={setPerPage}
              page={page}
              perPage={perPage}
              totalPages={data?.totalPages || 1}
              handleDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
      <CreateAccountSheet />
      <UpdateAccountSheet />
      <DeleteAccountAlert />
    </div>
  );
};

export default AccountsPage;
