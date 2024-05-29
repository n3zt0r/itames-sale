import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useItemsStore } from "@/app/store";
import Item from "./Item";
import { background, colorSecondary, primary } from "@/constants/Colors";
import Filter from "./Filter";

export default function ItemsList() {
  const items = useItemsStore((state) => state.items);
  const filter = useItemsStore((state) => state.filter);

  const getFilteredList = () => {
    if (filter === "all") return items;

    const isSold = filter === "sold" ? true : false;

    return items.filter((item) => item.isSold === isSold);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {items.length ? (
          <>
            <Filter />
            {getFilteredList().map((product) => (
              <Item key={product.id} {...product} />
            ))}
          </>
        ) : (
          <Text style={styles.text}>
            Start adding items to the list with{" "}
            <Text style={{ color: primary }}>the button below</Text>
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 36,
  },
  content: {
    gap: 10,
    minHeight: 150,
  },
  text: {
    width: "100%",
    padding: 20,
    fontSize: 30,
    fontWeight: "800",
    color: colorSecondary,
  },
});
