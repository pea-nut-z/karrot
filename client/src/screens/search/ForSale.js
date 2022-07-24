import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCards } from "../../UI";
import { furtherFilterListings } from "../../store/selectors";
import { SIZES, COLORS, FONTS } from "../../constants";

export default function ForSale({
  userId,
  navigation,
  submittedSearchString,
  toggleFilterScreen,
  filters,
}) {
  const [newFilters, setNewFilters] = useState(filters);
  const [usedFilter, setUsedFilter] = useState();
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
        newFilters
      );
    }
  });

  // SET NEW FILTERS
  useEffect(() => {
    setNewFilters({ ...newFilters, ...filters });
  }, [filters]);

  // SET FILTER FLAG
  useEffect(() => {
    let isFilterUsed = Object.values(filters);
    isFilterUsed = isFilterUsed.some(
      (value) =>
        value !== undefined && value !== false && value !== true && value?.length !== 0 && value
    );
    isFilterUsed ? setUsedFilter(true) : setUsedFilter(false);
  }, [filters]);

  const renderFilterBtn = () => {
    if ((submittedSearchString && items) || !items & usedFilter) {
      return (
        <TouchableOpacity onPress={() => toggleFilterScreen()} style={styles.filterBtn}>
          <Ionicons
            name="funnel-outline"
            size={20}
            color={usedFilter ? COLORS.primary : COLORS.secondary}
          />
          <Text> Filter</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderHideSoldBtn = () => {
    if ((focused && submittedSearchString && items) || (!items && newFilters.hideSoldItems)) {
      return (
        <TouchableOpacity
          onPress={() => setNewFilters({ ...newFilters, hideSoldItems: !newFilters.hideSoldItems })}
          style={styles.filterBtn}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={25}
            color={newFilters.hideSoldItems ? COLORS.primary : COLORS.secondary}
          />
          <Text> Hide sold items</Text>
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
          height: 40,
        }}
      >
        {/* FILTER BUTTON */}
        {renderFilterBtn()}
        {/* hideSoldItem BUTTON */}
        {renderHideSoldBtn()}
      </View>
      {renderNoResultsMsg()}
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}
      >
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
