import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  // FONTS,
  COLORS,
  SIZES,
} from "../constants";

export default function MemberInfo({ picture, name, location, id, atItemDetails }) {
  return (
    <View style={{ alignItems: "center" }}>
      {picture !== "N/A" ? (
        <Image
          source={{ uri: picture }}
          resizeMode={"contain"}
          style={atItemDetails ? styles.ItemDetails : styles.profile}
        />
      ) : (
        <Ionicons
          name={"person-circle-outline"}
          size={atItemDetails ? styles.ItemDetails.height : styles.profile.height}
          color={COLORS.secondary}
        />
      )}

      <Text>
        {name} {location && `• ${location}`}
        {id && ` • #${id}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  ItemDetails: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
