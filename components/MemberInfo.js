import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../constants";

export default function MemberInfo({ picture, name, location, id, atItemDetails }) {
  return (
    <View style={{ alignItems: "center" }}>
      {picture !== "N/A" ? (
        <Image
          source={{ uri: picture }}
          resizeMode={"contain"}
          style={{
            width: atItemDetails ? 60 : 110,
            height: atItemDetails ? 60 : 110,
            borderRadius: 100,
          }}
        />
      ) : (
        <Ionicons
          name={"person-circle-outline"}
          size={atItemDetails ? 60 : 110}
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
