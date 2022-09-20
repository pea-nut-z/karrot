import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";

export default function CircleButtons({ options, navigation }) {
  return options.map((option) => {
    return (
      <View key={option.name} style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(option.navigateTo, { atMyProfile: true })}
        >
          <View style={styles.alignCircle}>
            <View style={styles.circle}>
              <Ionicons name={option.icon} size={25} />
            </View>
          </View>
          <Text style={styles.text}>{option.name}</Text>
        </TouchableOpacity>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: SIZES.width / 3,
  },
  alignCircle: {
    alignItems: "center",
  },
  circle: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.padding,
  },
  text: {
    // ....h5,
  },
});
