import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { FONTS, COLORS } from "../../constants";
import { Header } from "../../components";

export default function Purchases({ route, navigation }) {
  const { userId } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Header title={"Purchases"} useBackBtn={true} navigation={navigation} />

      {/* {items.length === 0 && <Text>No sold items</Text>} */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.secondary,
          }}
        >
          No purchases yet. {"\n"}
          Try chatting on a neighbour's listings.
        </Text>
      </View>
    </View>
  );
}
