import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { ItemCards } from "../../../components";
import { furtherFilterListings } from "../../../store/selectors";
import { useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

import { SIZES, COLORS, FONTS } from "../../../constants";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ForSale({
  userId,
  navigation,
  submittedSearchString,
  toggleFilterScreen,
  hideSoldItems,
  toggleHideSoldItemsBtn,
  filters,
}) {
  const focused = useIsFocused();
  const getItems = useMemo(furtherFilterListings, []);
  const items = useSelector((state) => {
    if (focused && submittedSearchString) {
      return getItems(
        userId,
        state.listings,
        state.members,
        state.restrictions,
        state.feeds,
        "string",
        submittedSearchString,
        filters
      );
    }
  });

  const renderFilterBtns = () => {
    if (focused && submittedSearchString && items) {
      let isFilterUsed = Object.values(filters);
      isFilterUsed = isFilterUsed.some(
        (value) =>
          value !== undefined && value !== false && value !== true && value?.length !== 0 && value
      );
      return (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={() => toggleFilterScreen()} style={styles.filterBtn}>
            <Ionicons
              name="funnel-outline"
              size={20}
              color={isFilterUsed ? COLORS.primary : COLORS.secondary}
            />
            <Text> Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleHideSoldItemsBtn()} style={styles.filterBtn}>
            <Ionicons
              name="checkmark-circle-outline"
              size={25}
              color={hideSoldItems ? COLORS.primary : COLORS.secondary}
            />
            <Text> Hide sold items</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const renderNoResultsMsg = () => {
    if (focused && submittedSearchString && !items) {
      return (
        <View style={{ alignItems: "center" }}>
          <Text style={styles.boldText}>No results</Text>
          <View style={styles.noResultContainer}>
            <Text style={styles.boldText}>Tips</Text>
            <Text style={styles.regularText}>
              •Make sure your keyword was entered correctly.{"\n"}
              •Search in more general terms, e.g. bag not red bag.{"\n"}
              •Add search alerts and get notified of new listings.
            </Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderFilterBtns()}
      {renderNoResultsMsg()}
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 30 }}>
          {items && <ItemCards userId={userId} items={items} navigation={navigation} />}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    // ...FONTS.h4,
    paddingVertical: SIZES.padding,
  },
  regularText: {
    // ...FONTS.body4,
    paddingVertical: SIZES.padding,
  },
  filterBtn: {
    flexDirection: "row",
    width: SIZES.width / 2,
    alignItems: "center",
    justifyContent: "center",
    height: 35,
  },
  noResultContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
});
