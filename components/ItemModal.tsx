import {
  background,
  colorPrimary,
  primaryVariant,
  surface,
} from "@/constants/Colors";
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
import Error from "./Error";
import Menu from "./Menu";

export default function ItemModal() {
  const isShowModal = useItemsStore((state) => state.isShowModal);
  const setIsShowModal = useItemsStore((state) => state.setIsShowModal);
  const isError = useItemsStore((state) => state.isError);
  const { name, price, isEdited } = useItemsStore((state) => state.cacheItem);
  const setCacheItem = useItemsStore((state) => state.setCacheItem);

  const handleClose = () => {
    // Cierra el modal
    setIsShowModal();
  };

  return (
    <>
      {isShowModal && (
        <>
          <Pressable
            style={styles.curtain}
            onPress={handleClose}
            accessibilityLabel="close area"
          />

          <View style={[styles.container, styles.borderRadius]}>
            <Text style={styles.title}>
              {isEdited ? "Edit Item" : "New Item"}{" "}
            </Text>

            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
              <AntDesign name="closecircle" size={48} color={colorPrimary} />
            </TouchableOpacity>

            <View style={[styles.form, styles.borderRadius]}>
              <Text style={styles.text}>Name:</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Name of item"
                value={name}
                onChangeText={(text) => setCacheItem({ name: text })}
              />

              <Text style={styles.text}>Price:</Text>
              <TextInput
                style={styles.inputText}
                keyboardType="number-pad"
                placeholder="Price of item"
                value={price?.toString()}
                onChangeText={(text) => setCacheItem({ price: Number(text) })}
              />

              {isError && <Error>All fields are required</Error>}
            </View>
          </View>
        </>
      )}

      <View style={styles.buttonArea}>
        <Menu />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  curtain: {
    position: "absolute",
    backgroundColor: "#00000050",
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
    top: -58,
    right: 12,
  },
  text: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "500",
  },
  inputText: {
    marginBottom: 10,
    backgroundColor: surface,
    padding: 16,
    borderRadius: 10,
  },
  buttonArea: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    justifyContent: "space-around",
    bottom: 0,
  },
  borderRadius: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
