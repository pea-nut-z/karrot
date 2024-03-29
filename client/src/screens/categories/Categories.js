import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { SIZES } from "../../constants";
import { Header, FlatButtons } from "../../UI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as variables from "../../variables";

export default function Categories({ navigation }) {
  const navigateTo = (option) => {
    navigation.navigate("Category", {
      category: option.name,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        title={"Categories"}
        useRightBtns={["search-outline", "notifications-outline"]}
      />
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.subheader}>For Sale</Text>
          <FlatButtons
            atCategories={true}
            options={variables.categories}
            navigateTo={navigateTo}
            navigation={navigation}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subheader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
});
