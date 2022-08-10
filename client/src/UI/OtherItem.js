import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native";
import { SIZES, COLORS } from "../constants";

export default function OtherItem({ memberId, itemId, image, title, price, navigation }) {
  // if (Platform.OS === "web" && typeof image === "number") {
  //   Image.resolveAssetSource = (source) => ({
  //     uri: source,
  //   });
  // }

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push("ItemDetails", {
          memberId,
          itemId,
        });
      }}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            Platform.OS === "web" && typeof image === "number"
              ? { uri: Image.resolveAssetSource(image).uri }
              : typeof image !== "number"
              ? { uri: image }
              : image
          }
          resizeMode={"contain"}
          style={styles.image}
        />
      </View>

      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.priceText}>${price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZES.width / 2 - SIZES.padding * 2,
    height: SIZES.width / 2,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: SIZES.width / 2 - SIZES.padding * 6,
    height: SIZES.width / 2 - SIZES.padding * 6,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: typeof img === "number" ? COLORS.secondary : COLORS.white,
  },
  titleText: {
    marginLeft: SIZES.padding * 2,
    marginVertical: SIZES.padding / 2,
  },
  priceText: { marginLeft: SIZES.padding * 2 },
});
