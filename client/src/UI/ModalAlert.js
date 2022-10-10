import React from "react";
import Modal from "react-native-modal";
import { View, Text, TouchableOpacity } from "react-native";
import { SIZES, COLORS } from "../constants";
import * as variables from "../variables"

export default function ModalAlert({
  visibleVariable,
  closeModal,
  handleOption,
  option
}) {
  return (
    <Modal isVisible={visibleVariable} onBackdropPress={() => {
      closeModal()
    }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          borderRadius: 5,
          paddingHorizontal: SIZES.padding * 3,
          paddingVertical: SIZES.padding * 2,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            flexDirection: "row",
            borderRadius: 5,
          }}
        >
          <Text>
            {variables['alertOptions'][option]?.message}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {variables['alertOptions'][option]?.options.map((option) => {
            return (
              <TouchableOpacity key={option} onPress={() => handleOption(option)}>
                <Text
                  style={{
                    color: COLORS.primary,
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
