import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity } from "react-native";
import { SIZES, COLORS } from "../constants";

export default function ModalMenu({ visible, closeModal, handleOption, options }) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        closeModal();
      }}
    >
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option}
            onPress={() => handleAction(option)}
            style={{
              height: 50,
              backgroundColor: COLORS.white,
              paddingHorizontal: SIZES.padding,
              justifyContent: "center",
            }}
          >
            <Text>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Modal>
  );
}
