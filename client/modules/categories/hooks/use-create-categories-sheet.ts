import { create } from "zustand";

type State = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateCategoriesSheet = create<State>((set) => ({
  isOpen: false,
  open: () => set(() => ({ isOpen: true })),
  close: () => set({ isOpen: false }),
}));
