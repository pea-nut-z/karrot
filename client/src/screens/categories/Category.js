import React, { useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { FONTS, COLORS } from "../../constants";
import { Header, NoItemsMsg, ItemCards } from "../../UI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as helper from "../../helper";
import axios from "axios";

export default function Category({ route, navigation }) {
  const { category } = route.params;

  useEffect(() => {
    axios.get(`${helper.proxy}/listings/`);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        title={category}
        useBackBtn={true}
        useRightBtns={["search-outline", "notifications-outline"]}
      />

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }} enableOnAndroid>
        {0 == 0 ? (
          <NoItemsMsg message={"Oops, no listings under this category."} />
        ) : (
          // <ItemCards userId={userId} items={itemsByCategory} navigation={navigation} />
          <Text>Testing</Text>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
