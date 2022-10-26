import React, { useReducer } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES } from "../../constants";
import { Border, Header } from "../../UI";
import * as variables from "../../variables";

const filtersReducer = (state, action) => {
  const { type, filter, value } = action;
  switch (type) {
    case "update":
      return { ...state, [filter]: value };
    case "add-category":
      if (!state.categories) {
        return { ...state, categories: [value] };
      } else {
        return { ...state, categories: [...state.categories, value] };
      }
    case "remove-category":
      if (state.categories.length == 1) {
        return { ...state, categories: null };
      } else {
        return { ...state, categories: state.categories.filter((category) => category != value) };
      }
    case "clear":
      return { ...state, ...variables.emptyFilters };
    default:
      throw new Error(`Filters -> uncaught filter reducer type: ${type}`);
  }
};

export default function Filters({ toggleFilterScreen, createFilters, filters }) {
  const [newFilters, filterDispath] = useReducer(filtersReducer, filters);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header useBackBtn={true} toggleFilterScreen={toggleFilterScreen} title={"Filter"} />
      {/* CATEGORIES */}
      <KeyboardAwareScrollView>
        <Text style={styles.subheader}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {variables.categories.map((option) => {
            const { name } = option;
            return (
              <TouchableOpacity
                key={name}
                onPress={() => {
                  newFilters.categories?.includes(name)
                    ? filterDispath({ type: "remove-category", value: name })
                    : filterDispath({ type: "add-category", value: name });
                }}
                style={styles.categories}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={newFilters.categories?.includes(name) ? COLORS.primary : COLORS.secondary}
                />
                <Text style={styles.regularText}>
                  {name.includes("Games") ? "Games, hobbies..." : name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Border />

        {/* SORT */}
        <View style={{ flex: 1 }}>
          <Text style={styles.subheader}>Sort</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              paddingHorizontal: SIZES.padding * 2,
              paddingVertical: SIZES.padding,
            }}
          >
            <TouchableOpacity
              onPress={() => filterDispath({ type: "update", filter: "sort", value: "Relevance" })}
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "50%",
              }}
            >
              <Ionicons
                name={newFilters.sort === "Relevance" ? "ellipse" : "ellipse-outline"}
                size={25}
                color={newFilters.sort === "Relevance" ? COLORS.primary : null}
              />
              <Text style={styles.regularText}>Relevance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => filterDispath({ type: "update", filter: "sort", value: "Most recent" })}
              style={{
                width: "50%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name={newFilters.sort === "Most recent" ? "ellipse" : "ellipse-outline"}
                size={25}
                color={newFilters.sort === "Most recent" ? COLORS.primary : null}
              />
              <Text style={styles.regularText}>Most recent</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Border />

        {/* Price */}
        <View style={{ flex: 1 }}>
          <Text style={styles.subheader}>Price</Text>
          <View style={styles.priceContainer}>
            <CurrencyInput
              value={newFilters.minPrice}
              onChangeValue={(value) => filterDispath({ type: "update", filter: "minPrice", value })}
              delimiter=""
              separator=""
              precision={0}
              maxValue={9999999}
              ignoreNegative={true}
              placeholder="0"
              style={styles.price}
            />
            <Text>~</Text>
            <CurrencyInput
              value={newFilters.maxPrice}
              onChangeValue={(value) => filterDispath({ type: "update", filter: "maxPrice", value })}
              delimiter=""
              separator=""
              precision={0}
              maxValue={9999999}
              ignoreNegative={true}
              placeholder="No limit"
              style={styles.price}
            />
          </View>
        </View>

        <Border />
      </KeyboardAwareScrollView>

      {/* BUTTONS */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={() => filterDispath({ type: "clear" })} style={styles.clearBtn}>
          <Text>Clear fields</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleFilterScreen();
            createFilters(newFilters);
          }}
          style={styles.applyBtn}
        >
          <Text style={{ color: COLORS.white }}>Apply filter</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  subheader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  regularText: {
    paddingLeft: SIZES.padding,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: SIZES.padding * 2,
  },
  categories: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    width: "50%",
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    borderWidth: 1,
    borderRadius: 5,
    width: SIZES.width / 2 - SIZES.padding * 8,
    height: 40,
    paddingHorizontal: SIZES.padding * 2,
  },
  clearBtn: {
    width: SIZES.width / 2,
    height: 65,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtn: {
    width: SIZES.width / 2,
    height: 65,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
