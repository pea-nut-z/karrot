import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { filterMemberItems } from "../store/selectors";
import { useSelector } from "react-redux";
import { FONTS, SIZES, COLORS } from "../constants";

export default function SellerOtherItems({ sellerId, itemId, navigation }) {
  const getOtherItems = useMemo(filterMemberItems, []);
  const otherItems = useSelector((state) =>
    getOtherItems(state, sellerId, itemId, "four-other-items")
  );

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      {otherItems.map((item) => {
        const sellerId = item.sellerId;
        const itemId = item.itemId;
        const img = item["images"][0];
        return (
          <TouchableOpacity
            key={itemId}
            onPress={() => {
              navigation.navigate("ItemDetails", {
                sellerId,
                itemId,
              });
            }}
          >
            <View
              style={{
                width: SIZES.width / 2 - SIZES.padding * 2,
                height: SIZES.width / 2,
                justifyContent: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  source={typeof img === "number" ? img : { uri: img }}
                  resizeMode={"contain"}
                  style={{
                    width: SIZES.width / 2 - SIZES.padding * 6,
                    height: SIZES.width / 2 - SIZES.padding * 6,
                    borderWidth: 1,
                    borderColor: COLORS.secondary,
                    backgroundColor: typeof img === "number" ? COLORS.secondary : COLORS.white,
                  }}
                />
              </View>
              <Text
                style={{
                  marginLeft: SIZES.padding * 2,
                  marginVertical: SIZES.padding / 2,
                }}
              >
                {item.title}
              </Text>
              <Text style={{ marginLeft: SIZES.padding * 2 }}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
