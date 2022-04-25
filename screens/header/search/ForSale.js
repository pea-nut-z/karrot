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
  hideSearchHistory,
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

  const renderFilterBtn = () => {
    if (focused && submittedSearchString && items) {
      let isFilterUsed = Object.values(filters);
      isFilterUsed = isFilterUsed.some(
        (value) =>
          value !== undefined && value !== false && value !== true && value?.length !== 0 && value
      );

      return (
        <TouchableOpacity
          onPress={() => toggleFilterScreen()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <Ionicons name={"funnel-outline"} size={20} color={isFilterUsed ? COLORS.primary : null} />
          <Text>Filter</Text>
        </TouchableOpacity>
      );
    }
  };
  const renderHideSoldItemsBtn = () => {
    if (focused && submittedSearchString && items) {
      return (
        <TouchableOpacity
          onPress={() => toggleHideSoldItemsBtn()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 35,
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={25}
            color={hideSoldItems ? COLORS.primary : COLORS.secondary}
          />
          <Text>Hide sold items</Text>
        </TouchableOpacity>
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {renderFilterBtn()}
        {renderHideSoldItemsBtn()}
      </View>
      {renderNoResultsMsg()}
      <TouchableWithoutFeedback onPress={() => hideSearchHistory()}>
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 30 }}>
            {items && <ItemCards userId={userId} items={items} navigation={navigation} />}
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
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
  noResultContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
});
