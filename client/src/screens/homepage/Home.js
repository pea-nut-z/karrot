import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  LogBox,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES } from "../../constants";
import { Header, ItemCard } from "../../UI";
import axios from "axios";
import * as helper from "../../helper";

LogBox.ignoreLogs(["Require cycle:"]);

export default function Home({ navigation }) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/search?by=category`)
      .then((res) => {
        setProfiles(res.data.docs);
      })
      .catch((err) => console.error("Homepage listing error: ", err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Header
        navigation={navigation}
        title={"Location"}
        useRightBtns={["search-outline", "funnel-outline", "notifications-outline"]}
      />
      <View style={{ flex: 1 }}>
        {/* SELL BUTTON */}
        <TouchableOpacity
          style={styles.sellBtn}
          onPress={() => {
            navigation.navigate("Sell", { itemId: false });
          }}
        >
          <Text style={styles.btnText}>+ Sell</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {profiles.length !== 0 ? (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
              {profiles.map((profile) => {
                return profile.items.map((item) => {
                  return (
                    <View key={item.itemId} style={styles.itemCard}>
                      <ItemCard accountInfo={profile} listing={item} navigation={navigation} />
                    </View>
                  );
                });
              })}
            </KeyboardAwareScrollView>
          ) : (
            <View style={styles.noItemsMsgContainer}>
              <Text style={styles.noItemsText}>No items</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  itemCard: {
    flex: 1,
    paddingBottom: 10,
  },
  sellBtn: {
    position: "absolute",
    zIndex: 1,
    bottom: SIZES.height * 0.03,
    right: SIZES.padding,
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 19,
  },
  noItemsMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    color: COLORS.secondary,
  },
});
