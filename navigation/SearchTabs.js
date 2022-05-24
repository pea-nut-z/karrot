import React, { useRef, useState } from "react";
import { View, TextInput, Text, ScrollView, StyleSheet, Platform, SafeAreaView } from "react-native";
import { ForSale, User } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import Filters from "../screens/header/search/Filters";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ModalAlert } from "../components";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function SearchTabs({ route, navigation }) {
  const { userId } = route.params;
  const [searchHistory, setSearchHistory] = useState(["baseball", "fashion"]);
  const [searchString, setSearchString] = useState("");
  const [submittedSearchString, setSubmittedSearchString] = useState("");
  const [showSearchHistory, setShowSearchHistory] = useState(true);
  const [searchFieldAlert, setSearchFieldAlert] = useState(false);
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    sort: "",
    minPrice: 0,
    maxPrice: 0,
    hideSoldItems: false,
  });
  const searchBarRef = useRef();

  const toggleSearchHistoryBox = () => {
    setShowSearchHistory(!showSearchHistory);
  };

  const toggleFilterScreen = () => {
    setShowFilterScreen(!showFilterScreen);
  };

  const createFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const clearFilters = () => {
    setFilters({
      ...filters,
      categories: [],
      sort: "",
      minPrice: 0,
      maxPrice: 0,
    });
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <Ionicons name={"search-outline"} size={20} style={{ marginLeft: 4 }} />
        <TextInput
          ref={searchBarRef}
          value={searchString}
          onFocus={() => {
            // console.log("onFocus");
            setShowSearchHistory(true);
            setSearchFieldAlert(false);
          }}
          onBlur={() => {
            // console.log("onBlur");
            if (searchString) {
              setShowSearchHistory(false);
            } else {
              setTimeout(() => {
                setShowSearchHistory(false);
              }, 100);
            }
          }}
          onChangeText={(text) => setSearchString(text)}
          onSubmitEditing={() => {
            if (searchString.trim()) {
              setSubmittedSearchString(searchString);
              setSearchHistory([searchString, ...searchHistory]);
            } else {
              setSearchFieldAlert(true);
            }
            clearFilters();
          }}
          underlineColorAndroid="transparent"
          clearButtonMode="never"
          autoFocus={true}
          style={styles.inputField}
        />

        <TouchableOpacity
          onPress={() => {
            setSearchString("");
            searchBarRef.current.focus();
          }}
          style={styles.deleteSearchStringBtn}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: 10,
            }}
          >
            X
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchHistory = () => {
    if (searchHistory.length !== 0 && !searchString && showSearchHistory) {
      return (
        <View style={styles.recentSearchContainer}>
          <View style={styles.deleteAllContainer}>
            <Text style={styles.regularText}>Recent searches</Text>
            <TouchableOpacity
              style={styles.deleteAllBtn}
              onPress={() => {
                setSearchHistory([]);
              }}
            >
              <Text
                style={{
                  color: COLORS.darkgray,
                  // ...FONTS.body4,
                }}
              >
                Delete All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {searchHistory.map((item, index) => {
              return (
                <View key={`item-${index}`} style={styles.recentSearchItemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      setSearchString(item);
                      setSubmittedSearchString(item);
                      clearFilters();
                    }}
                    style={styles.recentSearchItem}
                  >
                    <View style={styles.priceTagIcon}>
                      <Ionicons name={"pricetag-outline"} size={20} />
                    </View>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const newSearches = searchHistory.filter(
                        (previousItem) => previousItem !== item
                      );
                      setSearchHistory(newSearches);
                    }}
                    style={styles.deleteRecentSearchItem}
                  >
                    <Text
                      style={{
                        color: COLORS.darkgray,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {showFilterScreen && (
        <Filters
          toggleFilterScreen={toggleFilterScreen}
          createFilters={createFilters}
          filters={filters}
        />
      )}
      {!showFilterScreen && (
        <View style={{ flex: 1 }}>
          <Header navigation={navigation} useBackBtn={true} />

          {/* SEARCH INPUT  */}
          {renderSearchBar()}
          <ModalAlert
            visibleVariable={searchFieldAlert}
            closeModal={() => setSearchFieldAlert(false)}
            message={"Search field is empty"}
          />

          {/* SEARCH HISTORY */}
          {renderSearchHistory()}

          {/* SEARCH TABS - FOR SALE & USER */}
          <MaterialTopTabs.Navigator
            screenOptions={{
              tabBarIndicatorStyle: {
                backgroundColor: COLORS.primary,
              },
            }}
          >
            <MaterialTopTabs.Screen
              name="For Sale"
              children={() => (
                <ForSale
                  userId={userId}
                  navigation={navigation}
                  submittedSearchString={submittedSearchString}
                  toggleFilterScreen={toggleFilterScreen}
                  filters={filters}
                  toggleSearchHistoryBox={toggleSearchHistoryBox}
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
                  toggleSearchHistoryBox={toggleSearchHistoryBox}
                />
              )}
            />
          </MaterialTopTabs.Navigator>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    position: "absolute",
    width: SIZES.width - 35 - SIZES.padding * 4,
    left: 35,
    top: -3,
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding * 2,
    borderRadius: 10,
  },
  inputField: {
    flex: 1,
    width: "90%",
    padding: 9,
    fontSize: 18,
    height: 40,
  },
  recentSearchContainer: {
    width: SIZES.width,
    paddingHorizontal: SIZES.padding * 2,
    maxHeight: 250,
    backgroundColor: COLORS.lightGray,
    position: "absolute",
    zIndex: 2,
    top: Platform.OS === "ios" ? 101 : 54,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },
  deleteAllContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  deleteAllBtn: {
    width: 80,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  recentSearchItemContainer: {
    width: SIZES.width,
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 18,
    paddingVertical: SIZES.padding,
  },
  priceTagIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    width: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: SIZES.padding,
  },
  recentSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    width: SIZES.width * 0.75,
    height: "100%",
  },
  deleteRecentSearchItem: {
    width: SIZES.width * 0.11,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  deleteSearchStringBtn: {
    width: 22,
    height: 22,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkgray,
    marginRight: 4,
  },
});
