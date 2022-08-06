import React, { useMemo, useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Border, Header, ImageScrollView, MemberInfo, MemberRating, SellerOtherItems } from "../UI";
import { FONTS, SIZES, itemStatusOptions, COLORS } from "../constants";
import { timeSince } from "../helper";
import * as actions from "../store/actionTypes";
import { selectMemberAllItems } from "../store/selectors";

export default function ItemDetails({ route, navigation }) {
  const { listing, newItem } = route.params;
  const memberId = listing.id;
  const { images } = listing.item;

  const useWhiteBtns = typeof images[0] === "number" || images[0].includes(".png") ? false : true;
  const myId = useSelector((state) => state.myProfile.id);
  console.log({ myId });

  useEffect(() => {
    if (myId !== memberId) {
      dispatch({
        type: actions.INCREMENT_VIEW,
        sellerId,
        itemId,
      });
    }
    if (window === undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          zIndex: 1,
          position: "absolute",
          top: Platform.OS === "ios" ? 35 : 0,
        }}
      >
        <Header
          navigation={navigation}
          newItem={newItem}
          useWhiteBtns={useWhiteBtns}
          useBackBtn={true}
          useHomeBtn={true}
          useRightBtns={["share-social-outline"]}
        />
      </View>
    </SafeAreaView>
  );
}
