import { item } from "@/types";
import { create } from "zustand";

type ItemsStoreTypes = {
  items: item[];
};

export const useItemsStore = create<ItemsStoreTypes>((set) => ({
  items: [],
}));
