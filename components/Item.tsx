import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Checkbox from "expo-checkbox";
import {
  background,
  primary,
  secondary,
  secondaryVariant,
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
        <Checkbox value={isChecked} onValueChange={setChecked} />

        <View>
          <Text>Item 01</Text>
          <Text>$200.00</Text>
        </View>
      </View>

      <View style={[styles.buttonsArea, styles.row]}>
        <Text>❎</Text>
        <Text>✅</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  container: {
    flex: 1,

    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    gap: 10,
  },
  buttonsArea: {
    gap: 10,
    alignItems: "center",
  },
});
