"use client";

import AccountHeader from "@/components/shared/account-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { useState } from "react";
import { useCategoriesSheet, useGetCategoriesList } from "../hooks";
import { Button } from "@/components/ui/button";
import { CategoriesSheet } from "../components";
import { DataTable } from "@/components/ui/data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { ApiPerPage } from "@/constants";
import { columns } from "../constants";

type Props = {};

const CategoriesPage = (props: Props) => {
  const { open } = useCategoriesSheet();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(ApiPerPage.min);

  const debounceSearch = useDebounce(search);

  const { data } = useGetCategoriesList({
    page,
    perPage,
    search: debounceSearch,
  });

  return (
    <div>
      <AccountHeader>Categories</AccountHeader>
      <div className="p-4">
        <Card>
          <CardHeader className="flex-row justify-between items-center">
            <div>Category list</div>
            <Button className="block ml-auto" onClick={open}>
              Add new category
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
              handleDelete={(rows) =>
                console.log(rows.map((row) => row.original.id))
              }
            />
          </CardContent>
        </Card>
      </div>
      <CategoriesSheet />
    </div>
  );
};

export default CategoriesPage;
