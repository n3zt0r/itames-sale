import { StyleSheet, Text, View } from "react-native";

import {
  colorPrimary,
  primary,
  primaryVariant,
  secondary,
} from "@/constants/Colors";

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Items for sale</Text>
      <View style={styles.itemsInfo}>
        <View style={styles.itemsInfoContent}>
          <Text style={[styles.text, styles.subTitleText]}>For sale:</Text>
          <Text style={[styles.text, styles.amountMoney, { color: "#f44336" }]}>
            -$2,000.00
          </Text>
          <Text style={styles.text}>20 Items</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.itemsInfoContent}>
          <Text style={[styles.text, styles.subTitleText]}>Sold:</Text>
          <Text style={[styles.text, styles.amountMoney, { color: secondary }]}>
            +$1,000.00
          </Text>
          <Text style={styles.text}>10 Items</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: primaryVariant,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colorPrimary,
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    backgroundColor: primaryVariant,
    width: "100%",
    textAlign: "center",
    padding: 30,
  },
  itemsInfo: {
    flexDirection: "row",
    paddingVertical: 26,
    backgroundColor: primary,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  itemsInfoContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    borderLeftWidth: 2,
    borderLeftColor: colorPrimary,
    width: 1,
    height: "100%",
  },
  text: {
    color: colorPrimary,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
  },
  subTitleText: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  amountMoney: {
    fontSize: 28,
    fontWeight: "800",
  },
});
