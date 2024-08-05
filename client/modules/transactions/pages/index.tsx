"use client";

import AccountHeader from "@/components/shared/account-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useCreateTransactionSheet,
  useDeleteTransactionsMutation,
  useGetTransactionList,
  useTransactionsFilter,
} from "../hooks";
import { Button } from "@/components/ui/button";
import {
  CreateTransactionSheet,
  DeleteTransactionAlert,
  TransactionListFilter,
  UpdateTransactionAccountSheet,
  UpdateTransactionCategorySheet,
  UpdateTransactionSheet,
} from "../components";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { columns } from "../constants";
import { Row } from "@tanstack/react-table";
import { Transaction } from "../types";

type Props = {};

const TransactionsPage = (props: Props) => {
  const { open } = useCreateTransactionSheet();
  const {
    search,
    from,
    to,
    page,
    perPage,
    accountId,
    categoryId,
    setPerPage,
    setSearch,
    setPage,
  } = useTransactionsFilter();

  const debounceSearch = useDebounce(search);

  const { data } = useGetTransactionList({
    accountId,
    categoryId,
    page,
    perPage,
    from: from ? from.toISOString() : null,
    to: to ? to.toISOString() : null,
    search: debounceSearch,
  });

  const { mutate } = useDeleteTransactionsMutation();

  const handleDelete = (data: Row<Transaction>[]) =>
    mutate(data.map(({ original }) => original.id));

  return (
    <div>
      <AccountHeader>Transactions</AccountHeader>
      <div className="p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>Transactions list</div>
            <Button className="ml-auto block" onClick={open}>
              Add new transaction
            </Button>
          </CardHeader>
          <CardContent>
            <TransactionListFilter />
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
      <CreateTransactionSheet />
      <UpdateTransactionSheet />
      <DeleteTransactionAlert />
      <UpdateTransactionCategorySheet />
      <UpdateTransactionAccountSheet />
    </div>
  );
};

export default TransactionsPage;
