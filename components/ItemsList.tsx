import { surface } from "@/constants/Colors";
import { ScrollView, StyleSheet, View } from "react-native";

import Item from "./Item";

export default function ItemsList() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: surface,
    // borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 20,
  },
  content: {
    gap: 10,
  },
});
