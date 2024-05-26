import { useItemsStore } from "@/app/store";
import { colorPrimary, primary } from "@/constants/Colors";
import { initialItem } from "@/constants/initialsConst";
import { ItemType } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Menu() {
  // --- Global State variables ---
  const items = useItemsStore((state) => state.items);
  const setItems = useItemsStore((state) => state.setItems);
  const setUpdateItems = useItemsStore((state) => state.setUpdateItems);
  const isShowModal = useItemsStore((state) => state.isShowModal);
  const setIsShowModal = useItemsStore((state) => state.setIsShowModal);
  const setIsError = useItemsStore((state) => state.setIsError);
  const cacheItem = useItemsStore((state) => state.cacheItem);
  const setCacheItem = useItemsStore((state) => state.setCacheItem);

  const handleCreateItem = ({ id, name, price }: ItemType) => {
    if (isShowModal) {
      if (name && price) {
        // --- Agrega el producto al STATE global de Items ---
        const product = { name, price: Number(price) };
        if (id) {
          setUpdateItems(cacheItem);
        } else {
          setItems(product);
        }
      } else {
        // --- Muestra el mensaje de error ---
        setIsError(true);
        // --- Oculta el mensaje de error tras 5s ---
        setTimeout(() => {
          setIsError(false);
        }, 5000);
        // --- Finaliza la función ---
        return;
      }
    }
    // --- Reinicia los STATES y cierra el modal ---
    setIsError(false);
    setCacheItem(initialItem);
    setIsShowModal();
  };

  return (
    <>
      {isShowModal ? (
        // --- SI se muestra el modal ---
        <TouchableOpacity
          onPress={() => handleCreateItem(cacheItem)}
          style={[styles.button, styles.buttonCreate]}
        >
          <FontAwesome name="check" size={30} color={colorPrimary} />
          <Text style={[styles.text, { fontSize: 22 }]}>
            {cacheItem.isEdited ? "Update Item" : "Create Item"}
          </Text>
        </TouchableOpacity>
      ) : (
        // --- NO se muestra el Modal ---
        <TouchableOpacity
          onPress={() => handleCreateItem(cacheItem)}
          style={styles.button}
        >
          <FontAwesome name="plus" size={30} color={colorPrimary} />
          <Text style={styles.text}>Add Item</Text>
        </TouchableOpacity>
      )}

      {items.some((product) => product.isChecked === true) && (
        // --- Si algun checkbox de la lista esta activado ---
        <TouchableOpacity onPress={setIsShowModal} style={styles.button}>
          <FontAwesome name="edit" size={30} color={colorPrimary} />
          <Text style={styles.text}>Edit Item</Text>
        </TouchableOpacity>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  buttonCreate: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: colorPrimary,
    fontWeight: "600",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
