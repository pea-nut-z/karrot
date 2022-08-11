import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { SIZES, COLORS } from "../constants";
import { ModalAlert } from ".";
import { Ionicons } from "@expo/vector-icons";
import { timeSince } from "../helper";
import { useDispatch } from "react-redux";
import * as actions from "../store/actionTypes";
import Modal from "react-native-modal";

export default function ItemCard({ listing, navigation }) {
  const [profile, setProfile] = useState();
  const [item, setItem] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    setProfile(listing);
    setItem(listing.items);
    setImage(listing.items.images[0]);
    if (Platform.OS === "web") {
      Image.resolveAssetSource = (source) => ({
        uri: source,
      });
    }
  }, [listing]);

  return (
    <View>
      {item && (
        <TouchableOpacity
          style={styles.outterContainer}
          onPress={() =>
            navigation.navigate("ItemDetails", {
              memberId: profile.id,
              itemId: item.itemId,
            })
          }
        >
          <View style={styles.innerContainer}>
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

            {/* ITEM INFO */}
            <View style={styles.infoContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.locationTimeText}>
                {profile.location} • {timeSince(item.date)}
              </Text>
              <View style={styles.priceContainer}>
                {item.status === "Reserved" && (
                  <View style={styles.reserveContainer}>
                    <Text style={styles.reserveText}>Reserved</Text>
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 105,
    height: 105,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
  },
  infoContainer: { paddingHorizontal: SIZES.padding * 2 },
  titleText: {
    paddingVertical: SIZES.padding,
  },
  locationTimeText: {
    color: COLORS.darkgray,
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reserveContainer: {
    height: 25,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
  },
  reserveText: { color: "white" },
});