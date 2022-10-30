import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS } from "../constants";
import { HeaderButton } from "./index";

export default function Header({
  title,
  newItem,
  newFeed,
  navigation,
  openModal,
  saveDraft,
  submitFunc,
  toggleFeedScreen,
  toggleHeaderMenu,
  toggleFilterScreen,
  useBackBtn,
  useHomeBtn,
  useRightBtns,
  useWhiteBtns,
}) {
  const handleBackBtn = () => {
    switch (title) {
      case "Filter":
        return toggleFilterScreen();
      case "Edit Post":
        return openModal("edit");
      case "Post For Sale":
        return saveDraft();
      case "Customize feed":
        return toggleFeedScreen(newFeed);
      default:
        newItem ? navigation.navigate("Home") : navigation.goBack();
    }
  };

  const handleRightBtn = (keyword) => {
    switch (keyword) {
      case "checkmark":
      case "DONE":
        return submitFunc();
      case "search":
        return navigation.navigate("SearchTabs");
      case "funnel":
        return toggleFeedScreen();
      case "notifications":
        return;
      // navigation.navigate("NotificationsTabs", {
      //   userId,
      // });
      case "home":
        return navigation.navigate("Home");
      default:
        throw new Error("Header Button-> uncaught button action");
    }
  };

  return (
    <View style={[styles.header, useHomeBtn ? null : styles.headerBorder]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {useBackBtn && (
          <TouchableOpacity onPress={handleBackBtn}>
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color={useWhiteBtns ? "#f5f5f5" : "black"}
            />
          </TouchableOpacity>
        )}
        {useHomeBtn && (
          <HeaderButton name={"home-outline"} useWhiteBtns={useWhiteBtns} navigation={navigation} />
        )}
        {title && <Text style={styles.boldText}>{title}</Text>}
      </View>
      {useRightBtns && (
        <View style={{ flexDirection: "row" }}>
          {useRightBtns.map((name) => {
            return (
              <TouchableOpacity
                key={name}
                onPress={() => {
                  const keyword = name.split("-")[0];
                  keyword === "ellipsis" ? toggleHeaderMenu() : handleRightBtn(keyword);
                }}
                style={{
                  padding: 5,
                  marginLeft: 5,
                }}
              >
                {name === "DONE" ? (
                  <Text>{name}</Text>
                ) : (
                  <Ionicons name={name} size={25} color={useWhiteBtns ? "#f5f5f5" : "black"} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SIZES.width,
    height: 60,
    backgroundColor: COLORS.transparent,
  },
  headerBorder: {
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
});
