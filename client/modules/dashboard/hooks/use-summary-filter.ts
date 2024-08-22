import { subMonths } from "date-fns";
import { create } from "zustand";

type State = {
  accountId: number | undefined;
  from: Date | undefined;
  to: Date | undefined;
  setAccountId: (accountId: number) => void;
  setFrom: (from: Date | undefined) => void;
  setTo: (to: Date | undefined) => void;
};

export const useSummaryFilter = create<State>((set) => ({
  accountId: undefined,
  from: subMonths(new Date(), 1),
  to: new Date(),
  setAccountId: (accountId) => set({ accountId }),
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
}));
