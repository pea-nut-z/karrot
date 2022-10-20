import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import { HeaderButton } from "./index";

export default function Header({
  useWhiteBtns,
  newItem,
  navigation,
  openModal,
  saveDraft,
  toggleHeaderMenu,
  submitFunc,
  title,
  toggleFilterScreen,
  useBackBtn,
  useHomeBtn,
  useRightBtns,
}) {
  const renderBackBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (title === "Filter") {
            toggleFilterScreen();
          } else if (title === "Edit Post") {
            openModal("edit");
          } else if (title === "Post For Sale") {
            saveDraft();
          } else if (newItem) {
            navigation.navigate("Home");
          } else {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back-outline" size={25} color={useWhiteBtns ? "#f5f5f5" : "black"} />
      </TouchableOpacity>
    );
  };

  const renderRightBtn = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {useRightBtns.map((buttonName) => {
          return (
            <HeaderButton
              key={buttonName}
              name={buttonName}
              navigation={navigation}
              useWhiteBtns={useWhiteBtns}
              toggleHeaderMenu={toggleHeaderMenu}
              submitFunc={submitFunc}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View style={[styles.header, useHomeBtn ? null : styles.headerBorder]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {useBackBtn && renderBackBtn()}
        {useHomeBtn && (
          <HeaderButton name={"home-outline"} useWhiteBtns={useWhiteBtns} navigation={navigation} />
        )}
        {title && <Text style={styles.boldText}>{title}</Text>}
      </View>
      {useRightBtns && renderRightBtn()}
    </View>
  );
}

const styles = StyleSheet.create({
  regularText: {
    // ...FONTS.body4,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    // ...FONTS.h4,
  },
  header: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width,
    height: 60,
    backgroundColor: COLORS.transparent,
  },
  headerBorder: {
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
});
