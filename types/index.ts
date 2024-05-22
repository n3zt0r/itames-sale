export type ItemSavedType = {
  id: string;
  name: string;
  price: number;
  isChecked: boolean;
  isSoled: boolean;
};

export type ItemType = Omit<ItemSavedType, "id" | "isChecked" | "isSoled">;
