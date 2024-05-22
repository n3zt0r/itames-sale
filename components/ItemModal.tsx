import {
  background,
  colorPrimary,
  primary,
  primaryVariant,
  surface,
} from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useItemsStore } from "@/app/store";

export default function ItemModal() {
  const items = useItemsStore((state) => state.items);
  const setItems = useItemsStore((state) => state.setItems);
  const isShowModal = useItemsStore((state) => state.isShowModal);
  const setIsShowModal = useItemsStore((state) => state.setIsShowModal);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleIsShowModal = () => {
    setIsShowModal();
  };

  const handleCreateItem = (name: string, price: string) => {
    if (isShowModal) {
      if (name && price) {
        const item = { name, price: Number(price) };
        setItems(item);
      } else {
        console.log("Mal");
        return;
      }
    }

    handleIsShowModal();
  };

  return (
    <>
      {isShowModal && (
        <>
          <Pressable style={styles.curtain} onPress={handleIsShowModal} />

          <View style={[styles.container, styles.borderRadius]}>
            <Text style={styles.title}>Item Create</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleIsShowModal}
            >
              <AntDesign name="closecircle" size={30} color={colorPrimary} />
            </TouchableOpacity>

            <View style={[styles.form, styles.borderRadius]}>
              <Text style={styles.text}>Name:</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Name of item"
                value={name}
                onChangeText={(text) => setName(text)}
              />

              <Text style={styles.text}>Prize:</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="number-pad"
                placeholder="Price of item"
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          </View>
        </>
      )}

      <View style={styles.buttonArea}>
        <TouchableOpacity
          onPress={() => handleCreateItem(name, price)}
          style={[styles.button, styles.borderRadius]}
        >
          <FontAwesome name="plus" size={30} color={colorPrimary} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  curtain: {
    position: "absolute",
    backgroundColor: "#00000090",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryVariant,
  },
  form: {
    width: "100%",
    backgroundColor: background,
    padding: 30,
    paddingBottom: 88,
  },
  title: {
    color: colorPrimary,
    fontSize: 30,
    fontWeight: "800",
    textTransform: "uppercase",
    textAlign: "center",
    padding: 30,
  },
  closeButton: {
    position: "absolute",
    top: -40,
    right: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  inputText: {
    backgroundColor: surface,
    padding: 16,
    borderRadius: 10,
  },
  buttonArea: {
    width: "100%",
    position: "absolute",
    alignItems: "center",
    bottom: 0,
  },
  button: {
    backgroundColor: primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  borderRadius: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
