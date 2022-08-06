import React, { useMemo, useState, useEffect } from "react";
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
import { Header, ItemCard, ModalAlert } from "../../UI";
import * as types from "../../store/actionTypes";
import axios from "axios";
import * as helper from "../../helper";

LogBox.ignoreLogs(["Require cycle:"]);

export default function Home({ navigation }) {
  const [listings, setListings] = useState([]);
  const [draft, setDraft] = useState([]);
  const [draftAlert, setDraftAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/homeListings`)
      .then((res) => {
        setListings(res.data.listings);
      })
      .catch((err) => console.error("Homepage listing error: ", err));

    axios
      .get(`${helper.proxy}/draft`)
      .then((res) => {
        setDraft(res.data.draft);
      })
      .catch((err) => console.error("Homepage draft error: ", err));
  }, []);

  const closeDraftModal = () => {
    setDraftAlert(false);
  };

  const handleDraftOption = (option) => {
    if (option === "no") {
      axios.patch(`${PROXY}/draft`).catch((err) => {
        console.log("Homepage delete draft error: ", err);
      });
    }
    navigation.navigate("Sell", { draft });
    closeDraftModal();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Header
        // userId={userId}
        navigation={navigation}
        title={"Location"}
        useRightBtns={["search-outline", "funnel-outline", "notifications-outline"]}
      />
      <View style={{ flex: 1 }}>
        {/* SELL BUTTON */}
        <TouchableOpacity
          style={styles.sellBtn}
          onPress={() => {
            console.log({ draft });

            if (draft) {
              setDraftAlert(true);
            } else {
              navigation.navigate("Sell");
            }
          }}
        >
          <Text style={styles.btnText}>+ Sell</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {listings.length !== 0 ? (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
              {listings.map((listing) => {
                return (
                  <View key={listing.items.itemId} style={styles.itemCard}>
                    <ItemCard listing={listing} navigation={navigation} />
                  </View>
                );
              })}
            </KeyboardAwareScrollView>
          ) : (
            <View style={styles.noItemsMsgContainer}>
              <Text style={styles.noItemsText}>No items</Text>
            </View>
          )}
        </View>
        <ModalAlert
          visibleVariable={draftAlert}
          closeModal={closeDraftModal}
          onClickOption={handleDraftOption}
          message={"You have a saved draft. Continue writing?"}
          options={["YES", "NO"]}
          actions={["yes", "no"]}
        />
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
