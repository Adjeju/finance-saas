import { ColumnDef } from "@tanstack/react-table";
import { Transaction } from "../types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, Trash, TriangleAlert } from "lucide-react";
import {
  useDeleteTransactionAlert,
  useUpdateTransactionAccountSheet,
  useUpdateTransactionCategorySheet,
  useUpdateTransactionSheet,
} from "../hooks";
import { Account } from "@/modules/accounts/types";
import { Category } from "@/modules/categories/types";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "payee",
    header: "Payee",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ getValue, row }) => {
      const { open } = useUpdateTransactionAccountSheet();

      const account = getValue() as Account | null;

      return account ? (
        account.name
      ) : (
        <div
          onClick={() => open(row.original.id)}
          className="flex w-min cursor-pointer items-center justify-center gap-2 rounded-full border border-red-500 px-3 py-1 text-red-500"
        >
          <TriangleAlert className="h-4 w-4" />
          <div>Unavailable</div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ getValue, row }) => {
      const { open } = useUpdateTransactionCategorySheet();

      const category = getValue() as Category | null;
      return category ? (
        category.name
      ) : (
        <div
          onClick={() => open(row.original.id)}
          className="flex w-min cursor-pointer items-center justify-center gap-2 rounded-full border border-red-500 px-3 py-1 text-red-500"
        >
          <TriangleAlert className="h-4 w-4" />
          <div>Unavailable</div>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      const amount = (getValue() as number) / 100;

      const isEarnings = amount > 0;

      return (
        <div
          className={cn(
            "rounded-full bg-red-500 p-1 text-center text-white",
            isEarnings && "bg-green-500",
          )}
        >
          {amount}
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ getValue }) => {
      return getValue() || "-";
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { open } = useUpdateTransactionSheet();
      const { open: openAlert } = useDeleteTransactionAlert();

      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 self-end p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => open(id)}
            >
              <Edit className="h-4 w-4" />
              <div>Edit</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => openAlert(id)}
            >
              <Trash className="h-4 w-4" />
              <div>Delete</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
