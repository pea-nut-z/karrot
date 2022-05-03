import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SIZES } from "../constants";

export default function FlatButtons({ atCategories, options, navigateTo }) {
  return (
    <View style={{ paddingBottom: 25 }}>
      {options.map((option, index) => {
        if (Platform.OS === "web" && typeof img === "number") {
          Image.resolveAssetSource = (source) => ({
            uri: source,
          });
        }
        return (
          <TouchableOpacity key={`option-${index}`} onPress={() => navigateTo(option)}>
            <View style={styles.container}>
              {atCategories ? (
                // CATEGORIES
                <Image
                  source={{ uri: Image.resolveAssetSource(option.icon).uri }}
                  resizeMode={"contain"}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              ) : (
                // MY ACCOUNT
                <Ionicons name={option["icon"]} size={30} />
              )}
              <Text style={styles.text}>{option.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  text: {
    // ....h5,
    paddingLeft: SIZES.padding * 2,
    paddingTop: 10,
  },
});
