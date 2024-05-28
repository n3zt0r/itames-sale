import { StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useItemsStore } from "@/app/store";

export default function Filter() {
  const unCheckAllItems = useItemsStore((state) => state.unCheckAllItems);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleChecked = (value: boolean) => {
    setIsAllChecked(value);
    unCheckAllItems(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <Checkbox
          style={styles.checkbox}
          value={isAllChecked}
          onValueChange={handleChecked}
        />
        <Text>{isAllChecked ? "Unselect" : "Select"} All</Text>
      </View>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    paddingTop: 0,
  },
  select: {
    flexDirection: "row",
    gap: 16,
  },
  checkbox: {
    borderRadius: 5,
  },
});
