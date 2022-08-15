import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { FONTS, COLORS } from "../../constants";
import { Header } from "../../UI";

export default function Purchases({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Purchases"} useBackBtn={true} navigation={navigation} />
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
    </SafeAreaView>
  );
}
