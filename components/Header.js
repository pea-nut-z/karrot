import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ModalAlert } from ".";
import { SIZES, COLORS } from "../constants";
import { HeaderButton } from "./index";
import { Ionicons } from "@expo/vector-icons";

export default function Header({
  imgAvailable,
  newItem,
  navigation,
  saveDraft,
  showPopoutMenu,
  submitFunc,
  title,
  toggleFilterScreen,
  userId,
  useBackBtn,
  useHomeBtn,
  useRightBtns,
}) {
  const [backBtnAlert, setBackBtnAlert] = useState(false);

  const renderBackBtn = () => {
    return (
      <TouchableOpacity
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
        <Ionicons name="arrow-back-outline" size={25} color={imgAvailable ? "#f5f5f5" : "black"} />
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setBackBtnAlert(false);
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
          display: "flex",
          flexDirection: "row",
        }}
      >
        {useRightBtns.map((buttonName, index) => {
          return (
            <HeaderButton
              key={`button-${index}`}
              userId={userId}
              name={buttonName}
              navigation={navigation}
              imgAvailable={imgAvailable}
              showPopoutMenu={showPopoutMenu}
              submitFunc={submitFunc}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.header}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* BACK BUTTON */}
        {useBackBtn && renderBackBtn()}
        {useHomeBtn && (
          <HeaderButton name={"home-outline"} imgAvailable={imgAvailable} navigation={navigation} />
        )}
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
  header: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width,
    height: 60,
    backgroundColor: COLORS.transparent,
  },
});
