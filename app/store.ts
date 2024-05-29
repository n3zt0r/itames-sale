import "react-native-get-random-values";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "@/types";
import { initialItem } from "@/constants/initialsConst";

type ItemsStoreTypes = {
  items: ItemType[];
  setItems: (data: ItemType) => void;
  updateItems: (data: ItemType) => void;
  sellItems: () => void;
  deleteItems: () => void;
  unCheckAllItems: (isChecked: ItemType["isChecked"]) => void;
  deleteItem: (id: ItemType["id"]) => void;

  cacheItem: ItemType;
  setCacheItem: (data: ItemType) => void;

  isShowModal: boolean;
  setIsShowModal: () => void;

  isError: boolean;
  setIsError: (data: boolean) => void;

  filter: string;
  updateFilter: (data: string) => void;
};

const createItem = (item: ItemType): ItemType => {
  // --- Genera una propiedad "id" al azara y la agrega al item ---
  return { ...item, id: uuidv4() };
};

export const useItemsStore = create<ItemsStoreTypes>((set, get) => ({
  items: [],
  setItems: (data) => {
    // --- Crea el item ---
    const item = createItem(data);
    // --- Añade el item al state ---
    set((state) => ({ items: [...state.items, item] }));
  },
  updateItems: (data) => {
    // --- Crea un nuevo arreglo actualizando el item que coincida ---
    // --- con la propiedad "id" ---
    const newItems = get().items.map((item) =>
      item.id === data.id ? data : item
    );
    // --- Remplaza el state con el nuevo arreglo ---
    set((state) => ({ items: newItems }));
  },
  sellItems: () => {
    // --- Obtine el arreglo del state ---
    const items = get().items;
    // --- Crea un nuevo arreglo solo con los componentes que estan ---
    // --- seleccionados en la app ---
    const checkedItems = items.filter((item) => item.isChecked === true);
    // --- Verifica si algun item aun no esta marcado como vendido ---
    const isAnyItemNotSolded = checkedItems.some(
      (item) => item.isSold === false
    );
    console.log(checkedItems);

    const isSold = isAnyItemNotSolded;

    // --- Crea un nuevo arreglo cambiando la propiedad "isChecked" solo ---
    // --- a los items que se encuentran seleccionados ---
    const newItems = items.map((item) =>
      item.isChecked === true ? { ...item, isSold } : item
    );

    // --- Remplaza el state con el nuevo arreglo ---
    set(() => ({ items: newItems }));
  },
  deleteItems: () => {
    // -- Crea un nuevo arreglo y añade solo los objetos que no se --
    // -- encuentren seleccionados --
    const newItems = get().items.filter((item) => item.isChecked !== true);
    // --- Remplaza el state con el nuevo arreglo --
    set(() => ({ items: newItems }));
  },
  unCheckAllItems(isChecked) {
    // -- Crea un nuevo arreglo y cambia la propiedad "isChecked" de todos --
    // -- los objetos por un mismo valor: "trueo" o "false" --
    const newItems = get().items.map((item) => ({ ...item, isChecked }));
    // --- Remplaza el state con el nuevo arreglo ---
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

  filter: "all",
  updateFilter(data) {
    set(() => ({ filter: data }));
  },
}));
