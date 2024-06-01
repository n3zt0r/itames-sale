import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

import Header from "@/components/Header";
import ItemsList from "@/components/ItemsList";
import ItemModal from "@/components/ItemModal";
import { primary, primaryVariant } from "@/constants/Colors";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ItemsList />

      <StatusBar
        translucent={false}
        backgroundColor={primaryVariant}
        barStyle={"light-content"}
      />
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
