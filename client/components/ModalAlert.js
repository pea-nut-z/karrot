import React from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SIZES, FONTS, COLORS } from "../constants";

export default function ModalAlert({
  itemId,
  visibleVariable,
  closeModal,
  onClickOption,
  message,
  options,
  actions,
}) {
  return (
    <Modal isVisible={visibleVariable} onBackdropPress={() => closeModal()}>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 5,
          paddingHorizontal: SIZES.padding * 3,
          paddingVertical: SIZES.padding * 2,
          marginTop: SIZES.height * 0.5,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            flexDirection: "row",
            borderRadius: 5,
          }}
        >
          <Text
            style={
              {
                // ...FONTS.body4
              }
            }
          >
            {message}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {options?.map((option, index) => {
            return (
              <TouchableOpacity key={option} onPress={() => onClickOption(actions[index], itemId)}>
                <Text
                  style={{
                    color: COLORS.primary,
                    // ...FONTS.body4,
                    marginLeft: SIZES.padding * 2,
                    marginTop: SIZES.padding * 2,
                  }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}
