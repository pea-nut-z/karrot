import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderButton({
  name,
  toggleHeaderMenu,
  useWhiteBtns,
  submitFunc,
  navigation,
}) {
  const navigateTo = (keyword) => {
    switch (keyword) {
      case "checkmark":
      case "DONE":
        return submitFunc();
      case "search":
        return;
      // navigation.navigate("SearchTabs", {
      //   userId,
      // });
      case "funnel":
        return;
      // navigation.navigate("CustomizeFeed", {
      //   userId,
      // });
      case "notifications":
        return;
      // navigation.navigate("NotificationsTabs", {
      //   userId,
      // });
      case "home":
        return navigation.navigate("Home");
      default:
        throw new Error("Header Button-> uncaught button action");
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          const keyword = name.split("-")[0];
          keyword === "ellipsis" ? toggleHeaderMenu() : navigateTo(keyword);
        }}
        style={{
          padding: 5,
          marginLeft: 5,
        }}
      >
        {name === "DONE" ? (
          <Text>{name}</Text>
        ) : (
          <Ionicons name={name} size={25} color={useWhiteBtns ? "#f5f5f5" : "black"} />
        )}
      </TouchableOpacity>
    </View>
  );
}
