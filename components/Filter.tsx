import { Pressable, StyleSheet, Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useItemsStore } from "@/app/store";
import { MaterialIcons } from "@expo/vector-icons";
import { colorSecondary } from "@/constants/Colors";

export default function Filter() {
  const unCheckAllItems = useItemsStore((state) => state.unCheckAllItems);
  const filter = useItemsStore((state) => state.filter);
  const updateFilter = useItemsStore((state) => state.updateFilter);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isShowList, setIsShowList] = useState(false);

  const handleChecked = (value: boolean) => {
    setIsAllChecked(value);
    unCheckAllItems(value);
  };

  const handleShowList = () => {
    setIsShowList(!isShowList);
  };

  const handleFilter = (value: string) => {
    updateFilter(value);
    setIsShowList(!isShowList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.select}>
        <Checkbox
          accessibilityLabel="checkbox of sellect or unselect all items"
          accessibilityLabelledBy="select"
          style={styles.checkbox}
          value={isAllChecked}
          onValueChange={handleChecked}
        />
        <Text nativeID="select" style={styles.text}>
          {isAllChecked ? "Unselect" : "Select"} All Items
        </Text>
      </View>

      <Pressable onPress={handleShowList} style={styles.filter}>
        <Text style={styles.text}>
          Filter:{" "}
          <Text style={{ fontWeight: "600" }}>
            {filter === "all" && "All"}
            {filter === "sale" && "For Sale"}
            {filter === "sold" && "Sold"}
          </Text>
        </Text>
        <MaterialIcons name="filter-list" size={24} color="rgb(150 150 150)" />

        <View style={[styles.filterList, !isShowList && { display: "none" }]}>
          {/* --- Close Button --- */}
          <Pressable onPress={handleShowList} style={styles.close}>
            <Text>X</Text>
          </Pressable>

          <Pressable onPress={() => handleFilter("all")}>
            <Text
              style={[
                styles.textFilterPressable,
                filter === "all" && {
                  backgroundColor: "rgb(150 150 150)",
                  fontWeight: "500",
                },
              ]}
            >
              All Items
            </Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("sale")}>
            <Text
              style={[
                styles.textFilterPressable,
                filter === "sale" && {
                  backgroundColor: "rgb(150 150 150)",
                  fontWeight: "500",
                },
              ]}
            >
              For Sale Items
            </Text>
          </Pressable>
          <Pressable onPress={() => handleFilter("sold")}>
            <Text
              style={[
                styles.textFilterPressable,
                filter === "sold" && {
                  backgroundColor: "rgb(150 150 150)",
                  fontWeight: "500",
                },
              ]}
            >
              Sold Items
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
    justifyContent: "space-between",
    zIndex: 2,
  },
  select: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  filter: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  close: {
    position: "absolute",
    top: 0,
    right: 4,
    padding: 10,
  },
  filterList: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "rgb(250 250 250)",
    borderColor: "rgb(150 150 150)",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 18,
    paddingLeft: 20,
    paddingRight: 30,
  },
  checkbox: {
    borderRadius: 5,
    borderColor: "rgb(150 150 150)",
  },
  text: {
    fontSize: 16,
    color: "rgb(150 150 150)",
  },
  textFilterPressable: {
    padding: 7,
    color: colorSecondary,
    backgroundColor: "rgb(250 250 250)",
    borderRadius: 6,
  },
});
