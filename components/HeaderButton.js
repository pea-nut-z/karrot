import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

export default function HeaderButton({
  userId,
  name,
  showPopoutMenu,
  imgAvailable,
  submitFunc,
  navigation,
}) {
  const navigateTo = (keyword) => {
    switch (keyword) {
      case "checkmark":
        return submitFunc();
      case "search":
        return navigation.navigate("SearchTabs", {
          userId,
        });
      case "funnel":
        return navigation.navigate("CustomizeFeed", {
          userId,
        });
      case "notifications":
        return navigation.navigate("NotificationsTabs", {
          userId,
        });
      case "home":
        return navigation.navigate("Home");
      default:
        return;
    }
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          const keyword = name.split("-")[0];
          keyword === "ellipsis" ? showPopoutMenu() : navigateTo(keyword);
        }}
        style={{
          padding: 5,
          marginLeft: 5,
        }}
      >
        <Ionicons name={name} size={25} color={imgAvailable ? "#f5f5f5" : "black"} />
      </TouchableOpacity>
    </View>
  );
}
