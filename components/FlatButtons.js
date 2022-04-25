import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { SIZES } from "../constants";

export default function FlatButtons({ options, navigateTo }) {
  return (
    <View style={{ paddingBottom: 25 }}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity key={`option-${index}`} onPress={() => navigateTo(option)}>
            <View style={styles.container}>
              {typeof option["icon"] === "number" ? (
                <Image
                  source={option.icon}
                  resizeMode={"contain"}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              ) : (
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
