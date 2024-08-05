import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiPerPage } from "@/constants";
import { useGetCategoriesListQuery } from "@/modules/categories/hooks";
import { useTransactionsFilter } from "@/modules/transactions/hooks";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export const TransactionCategoryFilter = (props: Props) => {
  const [key, setKey] = useState(+new Date());
  const { categoryId, setCategory } = useTransactionsFilter();

  const { data, isLoading } = useGetCategoriesListQuery({
    page: 1,
    perPage: ApiPerPage.max,
    search: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Category</Label>
      <div className="flex items-center gap-2">
        <Select
          onValueChange={(id) => setCategory(+id)}
          defaultValue={categoryId?.toString()}
          key={key}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {data!.data.map(({ id, name }) => (
              <SelectItem key={id} value={id.toString()}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setCategory(null);
            setKey(+new Date());
          }}
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
