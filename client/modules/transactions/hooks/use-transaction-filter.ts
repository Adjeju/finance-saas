import { ApiPerPage } from "@/constants";
import { create } from "zustand";

type State = {
  accountId: number | null;
  categoryId: number | null;
  from: Date | undefined;
  to: Date | undefined;
  search: string;
  page: number;
  perPage: number;
  setAccount: (accountId: number | null) => void;
  setCategory: (categoryId: number | null) => void;
  setFrom: (date: Date | undefined) => void;
  setTo: (date: Date | undefined) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPerPage: (perPage: number) => void;
};

export const useTransactionsFilter = create<State>((set) => ({
  accountId: null,
  categoryId: null,
  from: undefined,
  to: undefined,
  page: 1,
  perPage: ApiPerPage.min,
  search: "",
  setAccount: (accountId) => set(() => ({ accountId })),
  setCategory: (categoryId) => set(() => ({ categoryId })),
  setTo: (to) => set(() => ({ to })),
  setFrom: (from) => set(() => ({ from })),
  setPage: (page) => set(() => ({ page })),
  setPerPage: (perPage) => set(() => ({ perPage })),
  setSearch: (search) => set(() => ({ search })),
}));
