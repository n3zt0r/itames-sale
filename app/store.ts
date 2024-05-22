import { ItemSavedType, ItemType } from "@/types";
import { create } from "zustand";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type ItemsStoreTypes = {
  items: ItemSavedType[];
  setItems: (data: ItemType) => void;

  isShowModal: boolean;
  setIsShowModal: () => void;
};

const createItem = (item: ItemType): ItemSavedType => {
  return { ...item, isChecked: false, isSoled: false, id: uuidv4() };
};

export const useItemsStore = create<ItemsStoreTypes>((set) => ({
  items: [],
  setItems: (data) => {
    const item = createItem(data);
    set((state) => ({
      items: [...state.items, item],
    }));
  },

  isShowModal: false,
  setIsShowModal: () => {
    set((state) => ({
      isShowModal: !state.isShowModal,
    }));
  },
}));
