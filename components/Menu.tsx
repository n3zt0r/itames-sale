import { useItemsStore } from "@/app/store";
import { colorPrimary, error, primary } from "@/constants/Colors";
import { initialItem } from "@/constants/initialsConst";
import { ItemType } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Menu() {
  // --- Global State variables ---
  const items = useItemsStore((state) => state.items);
  const setItems = useItemsStore((state) => state.setItems);
  const updateItems = useItemsStore((state) => state.updateItems);
  const sellItems = useItemsStore((state) => state.sellItems);
  const deleteItems = useItemsStore((state) => state.deleteItems);
  const unCheckAllItems = useItemsStore((state) => state.unCheckAllItems);
  const isShowModal = useItemsStore((state) => state.isShowModal);
  const setIsShowModal = useItemsStore((state) => state.setIsShowModal);
  const setIsError = useItemsStore((state) => state.setIsError);
  const cacheItem = useItemsStore((state) => state.cacheItem);
  const setCacheItem = useItemsStore((state) => state.setCacheItem);

  const isSomeItemChecked = items.some((product) => product.isChecked === true);
  const isOnlyOneItemChecked =
    items.reduce(
      (sum, product) => (product.isChecked === true ? sum + 1 : sum),
      0
    ) <= 1;

  const handleCreateItem = ({ id, name, price }: ItemType) => {
    // -- Verifica si el modal esta mostrandose --
    if (isShowModal) {
      if (name && price) {
        // --- Agrega el producto al STATE global de Items ---
        const product = { name, price: Number(price) };
        if (id) {
          updateItems(cacheItem);
        } else {
          setItems({ ...cacheItem, ...product });
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

  const handleEdit = () => {
    unCheckAllItems(false);
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
        !isSomeItemChecked && (
          // --- Si ningun checkbox de la lista esta activado ---
          <TouchableOpacity
            onPress={() => handleCreateItem(cacheItem)}
            style={styles.button}
          >
            <FontAwesome name="plus" size={30} color={colorPrimary} />
            <Text style={styles.text}>Add Item</Text>
          </TouchableOpacity>
        )
      )}

      {isSomeItemChecked && (
        // --- Si algun checkbox de la lista esta activado ---
        <>
          <TouchableOpacity onPress={sellItems} style={styles.button}>
            <FontAwesome name="dollar" size={30} color={colorPrimary} />
            <Text style={styles.text}>{"Sell"}</Text>
          </TouchableOpacity>

          {
            // --- Si "solo un checkbox" de la lista esta activado ---
            isOnlyOneItemChecked && (
              <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <FontAwesome name="edit" size={30} color={colorPrimary} />
                <Text style={styles.text}>Edit</Text>
              </TouchableOpacity>
            )
          }

          <TouchableOpacity
            onPress={deleteItems}
            style={[styles.button, { backgroundColor: error }]}
          >
            <FontAwesome name="trash" size={30} color={colorPrimary} />
            <Text style={styles.text}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
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
