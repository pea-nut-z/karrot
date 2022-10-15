import React from "react";
import { SafeAreaView } from "react-native";
import { Header } from "../UI";

export default function Report({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Report seller"} useBackBtn={true} navigation={navigation} />
    </SafeAreaView>
  );
}
