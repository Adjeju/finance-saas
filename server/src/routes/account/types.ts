import { Pagination } from "../../types";

export type UpdateAccountData = {
  id: number;
  name: string;
};

export type GetAccountListData = {
  search?: string;
  userId?: number;
} & Pagination;
