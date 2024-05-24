import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "@/components/Header";
import ItemsList from "@/components/ItemsList";
import ItemModal from "@/components/ItemModal";
import { primary, primaryVariant } from "@/constants/Colors";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={"light"} backgroundColor={primaryVariant} />

      <Header />
      <ItemsList />

      <ItemModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    backgroundColor: primary,
  },
});
