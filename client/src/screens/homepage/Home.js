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
import { Header, ItemCard, NoItemsMsg } from "../../UI";
import axios from "axios";
import * as helper from "../../helper";

LogBox.ignoreLogs(["Require cycle:"]);

export default function Home({ navigation }) {
  const [items, setItems] = useState();

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/filter/feeds`)
      .then((res) => {
        setItems(res.data.docs);
      })
      .catch((err) => console.error("Homepage listing error: ", err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Header
        navigation={navigation}
        title={"Marketplace"}
        useRightBtns={["search-outline", "funnel-outline", "notifications-outline"]}
      />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.sellBtn}
          onPress={() => {
            navigation.navigate("Sell", { itemId: false });
          }}
        >
          <Text style={styles.btnText}>+ Sell</Text>
        </TouchableOpacity>
        {!items && <NoItemsMsg message={"Loading..."} />}
        {items && !items.length && (
          <NoItemsMsg message={"No items at all. Maybe too many filters!"} />
        )}
        {items && items.length && (
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
            {items.map((profile) => {
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
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
});
