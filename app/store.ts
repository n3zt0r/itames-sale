import "react-native-get-random-values";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "@/types";
import { initialItem } from "@/constants/initialsConst";

type ItemsStoreTypes = {
  items: ItemType[];
  setItems: (data: ItemType) => void;
  setUpdateItems: (data: ItemType) => void;
  deleteItem: (id: ItemType["id"]) => void;
  cacheItem: ItemType;
  setCacheItem: (data: ItemType) => void;
  isShowModal: boolean;
  setIsShowModal: () => void;
  isError: boolean;
  setIsError: (data: boolean) => void;
};

const createItem = (item: ItemType): ItemType => {
  return { ...item, id: uuidv4() };
};

export const useItemsStore = create<ItemsStoreTypes>((set, get) => ({
  items: [],
  setItems: (data) => {
    const item = createItem(data);
    set((state) => ({ items: [...state.items, item] }));
  },
  setUpdateItems: (data) => {
    const newItems = get().items.map((item) =>
      item.id === data.id ? data : item
    );
    set(() => ({ items: newItems }));
  },
  deleteItem: (id) => {
    const newItems = get().items.filter((item) => item.id !== id);
    set(() => ({ items: newItems }));
  },

  cacheItem: initialItem,
  setCacheItem: (data) => {
    set((state) => ({ cacheItem: { ...state.cacheItem, ...data } }));
  },

  isShowModal: false,
  setIsShowModal: () => {
    set((state) => ({ isShowModal: !state.isShowModal }));
  },

  isError: false,
  setIsError: (data) => {
    set(() => ({ isError: data }));
  },
}));
