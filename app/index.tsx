import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "@/components/Header";
import ItemsList from "@/components/ItemsList";
import { primary, primaryVariant } from "@/constants/Colors";
import ActionButtons from "@/components/ActionButtons";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={"light"} backgroundColor={primaryVariant} />

      <Header />
      <ItemsList />

      <ActionButtons />
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
