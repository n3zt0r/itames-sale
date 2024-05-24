import "react-native-get-random-values";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "@/types";
import { initialItem } from "@/constants/initialsConst";

type ItemsStoreTypes = {
  items: ItemType[];
  setItems: (data: ItemType) => void;
  updateItem: ItemType;
  setUpdateItem: (data: ItemType) => void;
  isShowModal: boolean;
  setIsShowModal: () => void;
  isError: boolean;
  setIsError: (data: boolean) => void;
};

const createItem = (item: ItemType): ItemType => {
  return { ...item, isChecked: false, isSoled: false, id: uuidv4() };
};

export const useItemsStore = create<ItemsStoreTypes>((set) => ({
  items: [],
  setItems: (data) => {
    const item = data.id ? data : createItem(data);
    set((state) => ({
      items: [...state.items, item],
    }));
  },

  updateItem: initialItem,
  setUpdateItem: (data) => {
    set((state) => ({
      updateItem: { ...state.updateItem, ...data },
    }));
  },

  isShowModal: false,
  setIsShowModal: () => {
    set((state) => ({
      isShowModal: !state.isShowModal,
    }));
  },

  isError: false,
  setIsError: (data) => {
    set(() => ({
      isError: data,
    }));
  },
}));
