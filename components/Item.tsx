import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import {
  colorPrimary,
  colorSecondary,
  error,
  secondaryVariant,
  surface,
} from "@/constants/Colors";

export default function Item() {
  const [isChecked, setChecked] = useState(false);

  return (
    <Pressable
      style={[
        styles.container,
        styles.row,
        isChecked && { backgroundColor: secondaryVariant },
      ]}
      onLongPress={() => setChecked(true)}
    >
      <View style={[styles.content, styles.row]}>
        <Checkbox
          style={[styles.checkbox, { display: "flex" }]}
          value={isChecked}
          onValueChange={setChecked}
        />

        <View style={styles.textArea}>
          <Text style={[styles.text, isChecked && { color: colorPrimary }]}>
            Final-Fantasy-VII-Remake-(Deluxe-Edition)
          </Text>
          <Text
            style={[styles.text, { color: isChecked ? colorPrimary : error }]}
          >
            $200.00
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
  },
  content: {
    alignItems: "center",
  },
  checkbox: {
    display: "none",
    borderRadius: 10,
  },
  textArea: {
    width: "88%",
    marginLeft: 16,
  },
  text: {
    color: colorSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
});
