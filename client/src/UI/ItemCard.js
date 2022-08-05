import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { SIZES, COLORS } from "../constants";
import { ModalAlert } from ".";
import { Ionicons } from "@expo/vector-icons";
import { timeSince } from "../helper";
import { useDispatch } from "react-redux";
import * as actions from "../store/actionTypes";
import Modal from "react-native-modal";

export default function ItemCard({ listing, navigation }) {
  const { item, location } = listing;
  let image = item.images[0];
  if (Platform.OS === "web") {
    Image.resolveAssetSource = (source) => ({
      uri: source,
    });
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          height: 130,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() =>
          navigation.navigate("ItemDetails", {
            itemId: item.itemId,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            source={
              Platform.OS === "web" && typeof image === "number"
                ? { uri: Image.resolveAssetSource(image).uri }
                : typeof image !== "number"
                ? { uri: image }
                : image
            }
            resizeMode={"contain"}
            style={{
              width: 105,
              height: 105,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: COLORS.secondary,
            }}
          />

          {/* ITEM INFO */}
          <View style={{ paddingHorizontal: SIZES.padding * 2 }}>
            <Text
              style={{
                paddingVertical: SIZES.padding,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                color: COLORS.darkgray,
              }}
            >
              {location} • {timeSince(item.date)}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.status === "Reserved" && (
                <View
                  style={{
                    height: 25,
                    width: 70,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "green",
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: "white" }}>Reserved</Text>
                </View>
              )}
              <Text>$ {item.price}</Text>
            </View>
          </View>
        </View>

        {/* IF ON USER LISTINGS - ITEM OPTION BUTTON */}
        <View>
          {/* {renderOptionBtn()}
          {renderOptionModal(item.itemId)} */}

          {/* IF ON USER FAVOURITES SCREEN */}
          {/* {atUserFavouritesScreen && (
            <View
              style={{
                height: "100%",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch({
                    type: actions.FAVOURITE_REMOVED,
                    userId,
                    sellerId,
                    itemId,
                  });
                }}
              >
                <Ionicons name={"heart"} size={30} color={COLORS.primary} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Ionicons name={"heart-outline"} size={15} color={COLORS.darkgray} />
                <Text> {item.favourites}</Text>
              </View>
            </View>
          )} */}
        </View>
      </TouchableOpacity>
    </View>
  );
}
