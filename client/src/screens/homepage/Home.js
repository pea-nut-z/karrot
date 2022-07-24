import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  LogBox,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS, SIZES, FONTS } from "../../constants";
import { Header, ItemCards, ModalAlert } from "../../UI";
import * as actions from "../../store/actionTypes";
import { filterListings } from "../../store/selectors";

LogBox.ignoreLogs(["Require cycle:"]);

export default function Home({ navigation }) {
  const [draftAlert, setDraftAlert] = useState(false);
  const dispatch = useDispatch();

  const userId = 111;

  // const accounts = useSelector((state) => state.accounts);

  // GET LISTINGS FOR SALE
  const getActiveListings = useMemo(filterListings, []);
  const activeListings = useSelector((state) =>
    getActiveListings(
      userId,
      state["listings"],
      state["members"],
      state["restrictions"],
      state["feeds"],
      "feed"
    )
  );

  // GET POST DRAFTS IF ANY
  const draftItemId = useSelector((state) => state["drafts"][userId]);

  const closeModal = () => {
    setDraftAlert(false);
  };

  const onClickOption = (option) => {
    if (option === "yes") {
      navigation.navigate("Sell", {
        userId,
        existingItemId: draftItemId,
        continueDraft: true,
      });
    }
    if (option === "no") {
      dispatch({
        type: actions.DRAFT_DELETED,
        userId,
      });
      dispatch({
        type: actions.ITEM_DELETED,
        sellerId: userId,
        itemId: draftItemId,
      });
      navigation.navigate("Sell", {
        userId,
      });
    }
    closeModal();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Header
        userId={userId}
        navigation={navigation}
        title={"Location"}
        useRightBtns={["search-outline", "funnel-outline", "notifications-outline"]}
      />
      <View style={{ flex: 1 }}>
        {/* SELL BUTTON */}
        <TouchableOpacity
          style={styles.sellBtn}
          onPress={() => {
            if (draftItemId) {
              setDraftAlert(true);
            } else {
              navigation.navigate("Sell", {
                userId,
              });
            }
          }}
        >
          <Text style={styles.btnText}>+ Sell</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          {activeListings.length !== 0 ? (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid>
              <View
                style={{
                  flex: 1,
                  paddingBottom: 10,
                }}
              >
                <ItemCards userId={userId} items={activeListings} navigation={navigation} />
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  // ...FONTS.h4,
                  color: COLORS.secondary,
                }}
              >
                No items
              </Text>
            </View>
          )}
        </View>
        <ModalAlert
          visibleVariable={draftAlert}
          closeModal={closeModal}
          onClickOption={onClickOption}
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
    // ...FONTS.body2
  },
});
