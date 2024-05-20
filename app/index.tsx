import { Header } from "@/components/Header";
import ItemsList from "@/components/ItemsList";
import { primary, primaryVariant } from "@/constants/Colors";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={primaryVariant} />
      <Header />
      <ItemsList />
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
