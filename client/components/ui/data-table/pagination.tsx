import { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Button } from "../button";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ApiPerPage } from "@/constants";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  page: number;
  perPage: number;
  totalPages: number;
  handlePage: (page: number) => void;
  handlePerPage: (perPage: number) => void;
}

export function DataTablePagination<TData>({
  table,
  handlePage,
  handlePerPage,
  page,
  perPage,
  totalPages,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex gap-2 items-center">
          <div>Rows per page</div>
          <Select
            onValueChange={(v) => handlePerPage(+v)}
            value={perPage.toString()}
          >
            <SelectTrigger className="w-20">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ApiPerPage).map((v, idx) => (
                <SelectItem key={idx} value={v.toString()}>
                  {v}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => handlePage(1)}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={page === 1}
              onClick={() => handlePage(page - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => handlePage(page + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              disabled={page === totalPages}
              onClick={() => handlePage(totalPages)}
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
