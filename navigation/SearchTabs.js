import React, { useState } from "react";
import { View, Keyboard } from "react-native";
import { ForSale, User } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import Filters from "../screens/header/search/Filters";

import { COLORS } from "../constants";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function SearchTabs({ route, navigation }) {
  const { userId } = route.params;

  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [hideSoldItems, setHideSoldItems] = useState(false);

  const [searchString, setSearchString] = useState("");
  const [submittedSearchString, setSubmittedSearchString] = useState("");
  const [searchHistoryView, setSearchHistoryView] = useState(true);
  const [filterScreen, setFilterScreen] = useState(false);

  const filters = {
    categories,
    sort,
    minPrice,
    maxPrice,
    hideSoldItems,
  };

  const getSearchString = (str) => {
    setSearchString(str);
  };

  const submitSearchString = (str) => {
    setSubmittedSearchString(str);
  };

  const toggleHideSoldItemsBtn = () => {
    setHideSoldItems(!hideSoldItems);
  };

  const toggleFilterScreen = () => {
    setFilterScreen(!filterScreen);
  };

  const clearFilterFields = () => {
    setCategories([]);
    setSort(null);
    setMinPrice(null);
    setMaxPrice(null);
  };

  const hideSearchHistory = () => {
    setSearchHistoryView(false);
    Keyboard.dismiss();
  };

  const showSearchHistory = () => {
    setSearchHistoryView(true);
  };

  const addCategoryToFilter = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const removeCategoryFromFilter = (newCategory) => {
    setCategories([...categories.filter((name) => name !== newCategory)]);
  };

  const addSortToFilter = (name) => {
    setSort(name);
  };

  const addMinPriceToFilter = (value) => {
    setMinPrice(value);
  };

  const addMaxPriceToFilter = (value) => {
    setMaxPrice(value);
  };

  return (
    <View style={{ flex: 1 }}>
      {filterScreen && (
        <Filters
          categories={categories}
          addCategoryToFilter={addCategoryToFilter}
          removeCategoryFromFilter={removeCategoryFromFilter}
          sort={sort}
          addSortToFilter={addSortToFilter}
          minPrice={minPrice}
          addMinPriceToFilter={addMinPriceToFilter}
          maxPrice={maxPrice}
          addMaxPriceToFilter={addMaxPriceToFilter}
          clearFilterFields={clearFilterFields}
          toggleFilterScreen={toggleFilterScreen}
        />
      )}
      {!filterScreen && (
        <View style={{ flex: 1 }}>
          <View style={{ zIndex: 1, alignItems: "center" }}>
            <Header
              navigation={navigation}
              submitSearchString={submitSearchString}
              showSearchHistory={showSearchHistory}
              clearFilterFields={clearFilterFields}
              searchString={searchString}
              getSearchString={getSearchString}
              useBackBtn={true}
              useSearchBar={true}
              useSearchHistory={searchHistoryView}
            />
          </View>
          <MaterialTopTabs.Navigator
            screenOptions={{ tabBarIndicatorStyle: { backgroundColor: COLORS.primary } }}
          >
            <MaterialTopTabs.Screen
              name="For Sale"
              children={() => (
                <ForSale
                  userId={userId}
                  navigation={navigation}
                  submittedSearchString={submittedSearchString}
                  hideSearchHistory={hideSearchHistory}
                  toggleFilterScreen={toggleFilterScreen}
                  hideSoldItems={hideSoldItems}
                  toggleHideSoldItemsBtn={toggleHideSoldItemsBtn}
                  filters={filters}
                />
              )}
            />
            <MaterialTopTabs.Screen
              name="User"
              children={() => (
                <User
                  userId={userId}
                  navigation={navigation}
                  submittedSearchString={submittedSearchString}
                  hideSearchHistory={hideSearchHistory}
                />
              )}
            />
          </MaterialTopTabs.Navigator>
        </View>
      )}
    </View>
  );
}
