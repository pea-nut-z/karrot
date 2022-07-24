import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../components";
import { icons, SIZES, FONTS, COLORS } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";

export default function Chats() {
  const userId = 111;
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header title={"Chats"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
