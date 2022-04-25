import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Header } from "../components";
import { icons, SIZES, FONTS, COLORS } from "../constants";
// import AsyncStorage from "@react-native-community/async-storage";

export default function Chats() {
  const userId = 111;
  return (
    <View>
      <Header title={"Chats"} />
    </View>
  );
}

const styles = StyleSheet.create({});
