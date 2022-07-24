import React from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";

export default function ModalMenu({
  itemId,
  visibleVariable,
  menuVariable,
  closeModal,
  onClickOption,
  options,
}) {
  return (
    <Modal
      isVisible={visibleVariable}
      onBackdropPress={() => {
        closeModal();
      }}
    >
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onClickOption(option, itemId)}
            style={{
              height: 50,
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              justifyContent: "center",
            }}
          >
            <Text
              style={
                {
                  // ...FONTS.body4
                }
              }
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Modal>
  );
}
