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
import { useGetAccountsListQuery } from "@/modules/accounts/hooks";
import { useTransactionsFilter } from "@/modules/transactions/hooks";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export const TransactionAccountFilter = (props: Props) => {
  const [key, setKey] = useState(+new Date());
  const { accountId, setAccount } = useTransactionsFilter();

  const { data, isLoading } = useGetAccountsListQuery({
    page: 1,
    perPage: ApiPerPage.max,
    search: "",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Account</Label>
      <div className="flex items-center gap-2">
        <Select
          onValueChange={(id) => setAccount(+id)}
          defaultValue={accountId?.toString()}
          key={key}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select account" />
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
            setAccount(null);
            setKey(+new Date());
          }}
        >
          <XIcon />
        </Button>
      </div>
    </div>
  );
};
