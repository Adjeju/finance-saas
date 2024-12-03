import { useGetAccountsListQuery } from "@/modules/accounts/hooks";
import { useSummaryFilter } from "../../hooks";
import { ApiPerPage } from "@/constants";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AccountField = () => {
  const { accountId, setAccountId } = useSummaryFilter();
  const { data, isLoading } = useGetAccountsListQuery({
    page: 1,
    perPage: ApiPerPage.max,
    search: "",
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data) {
    return;
  }

  return (
    <div className="flex flex-col gap-2">
      <Label>Account</Label>
      <Select
        onValueChange={(id) => setAccountId(+id)}
        defaultValue={accountId?.toString()}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select account" />
        </SelectTrigger>
        <SelectContent>
          {data.data.map(({ id, name }) => (
            <SelectItem key={id} value={id.toString()}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
