import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { ModalAlert } from ".";
import { SIZES, COLORS } from "../constants";
import { HeaderButton } from "./index";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({
  userId,
  newItem,
  navigation,
  title,
  saveDraft,
  showPopoutMenu,
  toggleFilterScreen,
  submitFunc,
  useImgStyle,
  useBackBtn,
  useRightBtns,
}) {
  const [backBtnAlert, setBackBtnAlert] = useState(false);

  const renderBackBtn = () => {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          if (title === "Filter") {
            toggleFilterScreen();
          } else if (title === "Edit Post") {
            setBackBtnAlert(true);
          } else if (title === "Post For Sale") {
            saveDraft();
          } else if (newItem) {
            navigation.navigate("Home");
          } else {
            navigation.goBack();
          }
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={25}
          style={useImgStyle ? styles.backBtnWithImg : null}
        />
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setBackBtnAlert(false);
    setSearchFieldAlert(false);
  };

  const onClickOption = (actions) => {
    closeModal();
    switch (actions) {
      case "yes":
        navigation.goBack();
      default:
        return;
    }
  };

  const renderRightBtn = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {useRightBtns &&
          useRightBtns.map((buttonName, index) => {
            return (
              <HeaderButton
                key={`button-${index}`}
                userId={userId}
                name={buttonName}
                navigation={navigation}
                showPopoutMenu={showPopoutMenu}
                submitFunc={submitFunc}
              />
            );
          })}
      </View>
    );
  };
  return (
    <View style={useImgStyle ? styles.headerWithImg : styles.headerWithoutImg}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* BACK BUTTON */}
        {useBackBtn && renderBackBtn()}
        <ModalAlert
          visibleVariable={backBtnAlert}
          closeModal={closeModal}
          onClickOption={onClickOption}
          message={"Quit editing post?"}
          options={["No", "Yes"]}
          actions={["no", "yes"]}
        />

        {/* TITLE */}
        {title && <Text style={styles.boldText}>{title}</Text>}
      </View>
      {/* RIGHT BUTTONS */}
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
  headerWithoutImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    alignItems: "center",
    flexDirection: "row",
    width: SIZES.width,
    height: 55,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
  },
  headerWithImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: "center",
    flexDirection: "row",
    width: SIZES.width,
    backgroundColor: COLORS.transparent,
    justifyContent: "space-between",
  },
  backBtn: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },
  backBtnWithImg: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: COLORS.darkgray,
    shadowOpacity: 2.0,
    color: COLORS.black,
  },
});
