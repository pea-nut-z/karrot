import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  // FONTS,
  COLORS,
  SIZES,
} from "../constants";

export default function MemberInfo({ picture, name, location, id, atItemDetails }) {
  const styleVariables = atItemDetails ? styles.ItemDetails : styles.profile;
  const textVariables = atItemDetails ? styles.itemDetailsText : styles.profileText;

  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      {picture !== "N/A" ? (
        <Image source={{ uri: picture }} resizeMode={"contain"} style={styleVariables} />
      ) : (
        <Ionicons
          name={"person-circle-outline"}
          size={styleVariables.height}
          color={COLORS.secondary}
        />
      )}

      <Text style={textVariables}>
        {name} {location && `• ${location}`}
        {id && ` • #${id}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  profileText: {
    // ...FONTS.h4,
    marginTop: SIZES.padding,
    textAlign: "center",
  },
  profile: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  itemDetailsText: {
    // ...FONTS.body4,
    marginTop: SIZES.padding,
    textAlign: "center",
  },
  ItemDetails: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});
