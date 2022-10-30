import { useState, useEffect } from "react";
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
import CustomizeFeed from "./CustomizeFeed";

LogBox.ignoreLogs(["Require cycle:"]);

export default function Home({ navigation }) {
  const [items, setItems] = useState();
  const [showFeedScreen, setShowFeedScreen] = useState(false);
  const [updateFeed, setUpdateFeed] = useState(true);

  useEffect(() => {
    if (updateFeed) {
      axios
        .get(`${helper.proxy}/listing/filter/feed`)
        .then((res) => {
          setItems(res.data.docs);
          setUpdateFeed(false);
        })
        .catch((err) => console.error("Homepage listing error: ", err));
    }
  }, [updateFeed]);

  const toggleFeedScreen = (newFeed) => {
    setShowFeedScreen(!showFeedScreen);
    if (newFeed) {
      axios
        .post(`${helper.proxy}/restrict/update/feed`, { values: newFeed })
        .then(() => {
          setUpdateFeed(true);
        })
        .catch((err) => {
          console.error("CustomizeFeed update feed error: ", err);
        });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      {showFeedScreen ? (
        <CustomizeFeed toggleFeedScreen={toggleFeedScreen} />
      ) : (
        <View style={{ flex: 1 }}>
          <Header
            navigation={navigation}
            title={"Marketplace"}
            toggleFeedScreen={toggleFeedScreen}
            useRightBtns={["search-outline", "funnel-outline", "notifications-outline"]}
          />
          <TouchableOpacity
            style={styles.sellBtn}
            onPress={() => {
              navigation.navigate("Sell", { itemId: false });
            }}
          >
            <Text style={styles.btnText}>+ Sell</Text>
          </TouchableOpacity>
          {!items ? <NoItemsMsg message={"Loading..."} /> : null}
          {items && !items.length ? (
            <NoItemsMsg message={"No items at all. Check your feed settings!"} />
          ) : null}
          {items && items.length ? (
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
          ) : null}
        </View>
      )}
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
