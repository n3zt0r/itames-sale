import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  colorPrimary,
  colorSecondary,
  gray,
  secondaryVariant,
} from "@/constants/Colors";
import { ItemType } from "@/types";
import { useItemsStore } from "@/app/store";
import { formatCurrency } from "@/helpers";
import { FontAwesome } from "@expo/vector-icons";

export default function Item(product: ItemType) {
  // --- Global State variables ---
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const setIsShowModal = useItemsStore((state) => state.setIsShowModal);
  const updateItems = useItemsStore((state) => state.updateItems);
  const setCacheItem = useItemsStore((state) => state.setCacheItem);
  const { id, name, price, isChecked, isSold } = product;

  const isSomeItemChecked = items.some((product) => product.isChecked === true);

  const handleChecked = (isChecked: boolean) => {
    // --- Actualiza el parametro "isChecked" del producto ---
    updateItems({ ...product, isChecked });
  };

  const handleEdit = (product: ItemType) => {
    // --- Actualiza el parametro "isEdited" del producto ---
    setCacheItem({ ...product, isEdited: true });
    // --- Abre el modal ---
    setIsShowModal();
  };

  const handleSell = () => {
    // --- Actualiza el parametro "isSold" del producto ---
    updateItems({ ...product, isSold: !isSold });
  };

  return (
    <Pressable
      style={[
        styles.container,
        (isChecked || isSold) && {
          backgroundColor: isSold ? gray : secondaryVariant,
          borderBottomWidth: 0,
        },
      ]}
      onLongPress={() => handleChecked(true)}
    >
      <View>
        <View style={styles.content}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={handleChecked}
          />

          <View style={styles.textArea}>
            <Text style={[styles.text, isChecked && { color: colorPrimary }]}>
              {name}
            </Text>
            <Text style={[styles.price, isChecked && { color: colorPrimary }]}>
              {formatCurrency(price!)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonArea}>
          <TouchableOpacity
            disabled={isSomeItemChecked}
            onPress={() => handleEdit(product)}
          >
            <FontAwesome
              style={
                isSomeItemChecked ? { display: "none" } : { display: "flex" }
              }
              name="edit"
              size={24}
              color={colorSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSell()}>
            <FontAwesome
              name="dollar"
              size={24}
              color={isChecked ? colorPrimary : colorSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => deleteItem(id)}>
            <FontAwesome
              name="trash"
              size={24}
              color={isChecked ? colorPrimary : colorSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

// -- Estilos del componente --
const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    borderBottomWidth: 1,
    borderColor: "rgb(200 200 200)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkbox: {
    borderRadius: 5,
  },
  textArea: {
    flexShrink: 1,
    marginLeft: 10,
  },
  text: {
    color: colorSecondary,
    fontSize: 18,
    fontWeight: "500",
  },
  price: {
    color: gray,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonArea: {
    flexDirection: "row",
    alignSelf: "flex-end",
    columnGap: 16,
  },
});
