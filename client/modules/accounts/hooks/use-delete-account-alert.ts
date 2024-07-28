import { create } from "zustand";

type State = {
  id: number | null;
  isOpen: boolean;
  open: (id: number) => void;
  close: () => void;
};

export const useDeleteAccountAlert = create<State>((set) => ({
  id: null,
  isOpen: false,
  open: (id: number) => set(() => ({ isOpen: true, id })),
  close: () => set({ isOpen: false, id: null }),
}));
