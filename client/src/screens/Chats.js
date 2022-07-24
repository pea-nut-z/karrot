import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Header } from "../UI";

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
