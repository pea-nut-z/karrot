import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCard } from "../../UI";
import { SIZES, COLORS } from "../../constants";
import axios from "axios";
import * as helper from "../../helper";

export default function ForSale({
  navigation,
  submittedSearchString,
  filters,
  toggleFilterScreen,
  toggleSearchHistoryBox,
}) {
  const [applyFilters, setApplyFilters] = useState(false);
  const [hideSold, setHideSold] = useState(true);
  const [items, setItems] = useState();
  const [filteredItems, setFilteredItems] = useState();

  useEffect(() => {
    if (submittedSearchString) {
      setFilteredItems();
      setHideSold(true);
      axios
        .get(`${helper.proxy}/listing/filter/word?value=${submittedSearchString}`)
        .then((res) => {
          setItems(res.data.docs);
        })
        .catch((err) => console.error("ForSale error: ", err));
    }
  }, [submittedSearchString]);

  useEffect(() => {
    if (items) {
      const useFilters = Object.values(filters).some((value) => value);
      useFilters ? setApplyFilters(true) : setApplyFilters(false);
      let newItems = items;

      if (filters.minPrice || filters.maxPrice) {
        newItems = newItems.filter((profile) => {
          return profile.items.price >= filters.minPrice && profile.items.price <= filters.maxPrice;
        });
      }

      if (hideSold) {
        newItems = newItems.filter((profile) => profile.items.status != "Sold");
      }

      if (filters.categories) {
        newItems = newItems.filter((profile) =>
          filters.categories.include(profile.items.categories)
        );
      }

      if (filters.sort == "Most recent") {
        newItems = newItems.sort((a, b) => new Date(b.items.date) - new Date(a.items.date));
      }

      setFilteredItems(newItems);
    }
  }, [filters, items, hideSold]);

  return (
    <View style={{ flex: 1 }}>
      {items?.length ? (
        <View style={styles.filterWraper}>
          <TouchableOpacity onPress={toggleFilterScreen} style={styles.filterBtn}>
            <Ionicons
              name="funnel-outline"
              size={20}
              color={applyFilters ? COLORS.primary : COLORS.secondary}
            />
            <Text> Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHideSold(!hideSold)} style={styles.filterBtn}>
            <Ionicons
              name="checkmark-circle-outline"
              size={25}
              color={hideSold ? COLORS.primary : COLORS.secondary}
            />
            <Text> Hide sold items</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {filteredItems && filteredItems.length ? (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          {filteredItems.map((profile) => {
            return (
              <ItemCard
                key={profile.items.itemId}
                profile={profile}
                item={profile.items}
                image={profile.items.images[0]}
                navigation={navigation}
              />
            );
          })}
        </KeyboardAwareScrollView>
      ) : null}

      {filteredItems && !filteredItems.length ? (
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
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    paddingVertical: SIZES.padding,
  },
  regularText: {
    paddingVertical: SIZES.padding,
  },
  filterWraper: { flexDirection: "row", alignItems: "center", height: 40 },
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
