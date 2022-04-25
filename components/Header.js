import React, { useState } from "react";
import {
  SafeAreaView,
  // TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { ModalAlert } from ".";
import { SIZES, COLORS } from "../constants";
import { HeaderButton } from "./index";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header({
  userId,
  newItem,
  navigation,
  title,
  saveDraft,
  showPopoutMenu,
  hidePopoutMenu,
  submitSearchString,
  showSearchHistory,
  clearFilterFields,
  searchString,
  getSearchString,
  toggleFilterScreen,
  submitFunc,
  useImgStyle,
  useBackBtn,
  useSearchBar,
  useRightBtns,
  useSearchHistory,
}) {
  const [recentSearches, setRecentSearches] = useState(["baseball", "fashion"]);
  const [searchFieldAlert, setSearchFieldAlert] = useState(false);
  const [backBtnAlert, setBackBtnAlert] = useState(false);

  const renderBackBtn = () => {
    return (
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          if (title === "Filter") {
            toggleFilterScreen();
          } else if (title === "Edit Post") {
            setBackBtnAlert(true);
          } else if (title === "Post For Sale") {
            saveDraft();
          } else if (newItem) {
            navigation.navigate("Home");
          } else {
            navigation.goBack();
          }
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={25}
          style={useImgStyle ? styles.backBtnWithImg : null}
        />
      </TouchableOpacity>
    );
  };

  const closeModal = () => {
    setBackBtnAlert(false);
    setSearchFieldAlert(false);
  };

  const onClickOption = (actions) => {
    closeModal();
    switch (actions) {
      case "yes":
        navigation.goBack();
      default:
        return;
    }
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Ionicons name={"search-outline"} size={20} style={{ marginLeft: 4 }} />

        <TextInput
          value={searchString}
          onFocus={() => {
            showSearchHistory();
            setSearchFieldAlert(false);
          }}
          onChangeText={(text) => getSearchString(text)}
          onSubmitEditing={() => {
            if (searchString.trim()) {
              submitSearchString(searchString);
              setRecentSearches([searchString, ...recentSearches]);
            } else {
              setSearchFieldAlert(true);
            }
            clearFilterFields();
          }}
          underlineColorAndroid="transparent"
          clearButtonMode="always"
          autoFocus={true}
          style={{
            flex: 1,
            width: "90%",
            padding: 9,
            fontSize: 18,
            height: 40,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            getSearchString("");
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

  const renderRecentSearches = () => {
    if (recentSearches.length !== 0 && !searchString) {
      return (
        <View style={styles.searchBoxContainer}>
          <View style={styles.searchesAndDeleteContainer}>
            <Text style={styles.regularText}>Recent searches</Text>
            <TouchableOpacity
              style={{
                width: 80,
              }}
              onPress={() => setRecentSearches([])}
            >
              <Text
                style={{
                  textAlign: "center",
                  textAlignVertical: "center",
                  color: COLORS.darkgray,
                  // ...FONTS.body4,
                }}
              >
                Delete All
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {recentSearches.map((item, index) => {
              return (
                <View key={`item-${index}`} style={styles.searchStringContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      getSearchString(item);
                      submitSearchString(item);
                    }}
                  >
                    <View style={styles.searchItem}>
                      <View style={styles.searchIcon}>
                        <Ionicons name={"pricetag-outline"} size={20} />
                      </View>
                      <View
                        style={{
                          justifyContent: "center",
                          marginLeft: SIZES.padding,
                        }}
                      >
                        <Text style={styles.regularText}>{item}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const newSearches = recentSearches.filter(
                        (previousItem) => previousItem !== item
                      );
                      setRecentSearches(newSearches);
                    }}
                  >
                    <Text style={styles.deleteItemText}>X</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  const renderRightBtn = () => {
    return (
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {useRightBtns &&
          useRightBtns.map((buttonName, index) => {
            return (
              <HeaderButton
                key={`button-${index}`}
                userId={userId}
                name={buttonName}
                navigation={navigation}
                showPopoutMenu={showPopoutMenu}
                submitFunc={submitFunc}
              />
            );
          })}
      </View>
    );
  };
  return (
    <SafeAreaView style={{ backgroundColor: useImgStyle ? "transparent" : "white" }}>
      <TouchableWithoutFeedback
        onPress={() => {
          if (hidePopoutMenu) hidePopoutMenu();
        }}
      >
        <View style={useImgStyle ? styles.headerWithImg : styles.headerWithoutImg}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* BACK BUTTON */}
            {useBackBtn && renderBackBtn()}
            <ModalAlert
              visibleVariable={backBtnAlert}
              closeModal={closeModal}
              onClickOption={onClickOption}
              message={"Quit editing post?"}
              options={["No", "Yes"]}
              actions={["no", "yes"]}
            />

            {/* SEARCH INPUT  */}
            {useSearchBar && renderSearchBar()}
            <ModalAlert
              visibleVariable={searchFieldAlert}
              closeModal={closeModal}
              onClickOption={onClickOption}
              message={"Search field is empty"}
            />

            {/* TITLE */}
            {title && (
              <Text
                style={{
                  ...styles.boldText,
                }}
              >
                {title}
              </Text>
            )}
          </View>
          {/* RIGHT BUTTONS */}
          {useRightBtns && renderRightBtn()}
        </View>
      </TouchableWithoutFeedback>
      {/* SEARCH HISTORY */}
      {useSearchHistory && renderRecentSearches()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  regularText: {
    // ...FONTS.body4,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    // ...FONTS.h4,
  },
  headerWithoutImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
    alignItems: "center",
    flexDirection: "row",
    width: SIZES.width,
    height: 55,
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
  },
  headerWithImg: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    alignItems: "center",
    flexDirection: "row",
    width: SIZES.width,
    backgroundColor: COLORS.transparent,
    justifyContent: "space-between",
  },
  backBtn: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },
  backBtnWithImg: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: COLORS.darkgray,
    shadowOpacity: 2.0,
    color: COLORS.black,
  },
  searchBoxContainer: {
    width: "100%",
    position: "absolute",
    top: 109,
    paddingHorizontal: SIZES.padding * 2,
    backgroundColor: COLORS.white,
  },
  searchesAndDeleteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
  },
  searchStringContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  searchIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 35,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: SIZES.padding,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    height: 50,
  },
  deleteItemText: {
    color: COLORS.darkgray,
    height: "100%",
    width: 60,
    fontSize: 15,
    textAlign: "center",
    textAlignVertical: "center",
  },
  deleteSearchStringBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.darkgray,
    marginRight: 4,
  },
});
