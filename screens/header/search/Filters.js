import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Border, Header } from "../../../components";
import { COLORS, categoryOptions, SIZES, FONTS } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Filters({ toggleFilterScreen, createFilters, filters }) {
  const [newFilters, setNewFilters] = useState(filters);

  const clearNewFilters = () => {
    setNewFilters({
      ...newFilters,
      categories: [],
      sort: "",
      minPrice: 0,
      maxPrice: 0,
    });
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header useBackBtn={true} toggleFilterScreen={toggleFilterScreen} title={"Filter"} />
      {/* CATEGORIES */}
      <KeyboardAwareScrollView>
        <Text style={styles.subheader}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categoryOptions.map((option, index) => {
            const { name } = option;
            return (
              <TouchableOpacity
                key={`option-${index}`}
                onPress={
                  () =>
                    newFilters.categories.includes(name)
                      ? setNewFilters({
                          ...newFilters,
                          categories: [
                            ...newFilters.categories.filter((category) => category !== name),
                          ],
                        })
                      : setNewFilters({
                          ...newFilters,
                          categories: [...newFilters.categories, name],
                        })
                  // ? removeCategoryFromFilter(name)
                  // : addCategoryToFilter(name)
                }
                style={styles.categories}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={newFilters.categories.includes(name) ? COLORS.primary : COLORS.secondary}
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
              onPress={() => setNewFilters({ ...newFilters, sort: "Relevance" })}
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
              onPress={() => setNewFilters({ ...newFilters, sort: "Most recent" })}
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
              onChangeValue={(value) => setNewFilters({ ...newFilters, minPrice: value })}
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
              onChangeValue={(value) => setNewFilters({ ...newFilters, maxPrice: value })}
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
        <TouchableOpacity onPress={clearNewFilters} style={styles.clearBtn}>
          <Text>Clear fields</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleFilterScreen();
            createFilters(newFilters);
            console.log({ newFilters });
          }}
          style={styles.applyBtn}
        >
          <Text style={{ color: COLORS.white }}>Apply filter</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  subheader: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    // ...FONTS.h4,
  },
  regularText: {
    paddingLeft: SIZES.padding,
    // ...FONTS.body4,
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
