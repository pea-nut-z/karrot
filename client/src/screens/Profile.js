import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Header, MemberInfo, MemberRating, ModalAlert } from "../UI";
import { SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as actions from "../store/actionTypes";

export default function Profile({ route, navigation }) {
  const { sellerId, userId } = route.params;

  const seller = useSelector((state) => state.pro[sellerId]);

  const atCurrentUserProfile = sellerId === userId ? true : false;

  // const numOfItems = useSelector((state) => {
  //   const items = state.listings[sellerId];
  //   return Object.keys(items).length;
  // });

  // const numOfReviews = useSelector((state) => state["reviews"][sellerId]["reviewers"].length);

  const sellerIsBlocked = useSelector((state) => {
    if (!atCurrentUserProfile) {
      const list = state.restrictions[userId]["block"];
      return list.includes(sellerId);
    }
  });

  const sellerIsHidden = useSelector((state) => {
    if (!atCurrentUserProfile) {
      return state.restrictions[userId]["hide"];
    }
  });

  // Modal
  const [popupMenu, setPopupMenu] = useState(false);
  const [blockAlert, setBlockAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [unblockMsg, setUnblockMsg] = useState(false);
  const [unhideMsg, setUnhideMsg] = useState(false);
  const dispatch = useDispatch();

  const showPopoutMenu = () => {
    setPopupMenu(true);
  };

  const hidePopoutMenu = () => {
    setPopupMenu(false);
  };

  const closeAlertModal = () => {
    setBlockAlert(false);
    setHideAlert(false);
  };

  const closeMsgModal = () => {
    setUnblockMsg(false);
    setUnhideMsg(false);
  };
  const onClickOption = (option) => {
    if (option === "Report") navigation.navigate("Report", { sellerId, userId });
    if (option === "Block") setBlockAlert(true);
    if (option === "Unblock") {
      setUnblockMsg(true);
      dispatch({
        type: actions.BLOCK_REMOVED,
        userId,
        sellerId,
      });
    }
    if (option === "Hide this seller") setHideAlert(true);
    if (option === "Unhide this seller's posts") {
      setUnhideMsg(true);
      dispatch({
        type: actions.HIDE_REMOVED,
        userId,
        sellerId,
      });
    }
    // CONFIRMATION
    if (option === "block-confirmed") {
      closeAlertModal();
      dispatch({
        type: actions.BLOCK_ADDED,
        userId,
        sellerId,
      });
    }
    if (option === "hide-confirmed") {
      closeAlertModal();
      dispatch({
        type: actions.HIDE_ADDED,
        userId,
        sellerId,
      });
    }
    if (option === "cancel") closeAlertModal();
  };

  const renderPopoutMenu = () => {
    if (atCurrentUserProfile) {
      return (
        <View style={styles.popupMenuContainer}>
          <TouchableOpacity
            style={styles.popupMenuOption}
            onPress={() => {
              hidePopoutMenu();
              navigation.navigate("EditProfile");
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const options = sellerIsBlocked
        ? ["Report", "Unblock"]
        : ["Report", "Block", sellerIsHidden ? "Unhide this seller's posts" : "Hide this seller"];

      return (
        <View style={styles.popupMenuContainer}>
          {options.map((option) => {
            return (
              <TouchableOpacity
                key={option}
                style={styles.popupMenuOption}
                onPress={() => {
                  onClickOption(option);
                  hidePopoutMenu();
                }}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
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
      <Header
        sellerId={sellerId}
        navigation={navigation}
        title={"Profile"}
        showPopoutMenu={showPopoutMenu}
        useBackBtn={true}
        useRightBtns={["ellipsis-vertical-circle-outline"]}
      />

      {sellerIsBlocked && (
        <View
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            height: 30,
          }}
        >
          <Text style={{ color: COLORS.white }}>This user is blocked</Text>
        </View>
      )}

      <ModalAlert
        visibleVariable={blockAlert}
        closeModal={closeAlertModal}
        onClickOption={onClickOption}
        message={`Are you sure you want to block ${seller.username}? Their posts won't be visible to you and they won't be able to chat with you.`}
        options={["CANCEL", "BLOCK"]}
        actions={["cancel", "block-confirmed"]}
      />
      <ModalAlert
        visibleVariable={hideAlert}
        closeModal={closeAlertModal}
        onClickOption={onClickOption}
        message={`Hide ${seller.username} and all of ${seller.username}'s post ?
        `}
        options={["CANCEL", "YES, HIDE"]}
        actions={["cancel", "hide-confirmed"]}
      />
      <ModalAlert
        visibleVariable={unblockMsg}
        closeModal={closeMsgModal}
        onClickOption={onClickOption}
        message={`${seller.username} was unblocked`}
      />
      <ModalAlert
        visibleVariable={unhideMsg}
        closeModal={closeMsgModal}
        onClickOption={onClickOption}
        message={`${seller.username}'s posts have been unhidden`}
      />

      <View
        style={{
          position: "absolute",
          top: 65,
          right: SIZES.padding * 2,
          zIndex: 1,
        }}
      >
        {popupMenu && renderPopoutMenu()}
      </View>

      <TouchableWithoutFeedback onPress={hidePopoutMenu}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            {/* MEMBER INFO */}
            <View style={styles.margin}>
              <MemberInfo
                picture={seller.displayPic}
                name={seller.username}
                location={seller.location}
              />
            </View>

            {/* MEMBER RATING */}
            <View style={styles.margin}>
              <MemberRating memberId={sellerId} />
            </View>

            {/* RATE BUTTON  */}
            {!atCurrentUserProfile && (
              <TouchableOpacity
                style={[styles.rateBtn, styles.margin]}
                onPress={() => {
                  navigation.navigate("Rate", { userId, sellerId });
                }}
              >
                <Text>Rate</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.bottomContainer}>
            {/* ITEMS */}
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(atCurrentUserProfile ? "UserItemsTabs" : "SellerItemsTabs", {
                  userId,
                  sellerId,
                })
              }
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <Text style={{ fontSize: 16 }}>{/* {numOfItems} item{numOfItems > 1 && "s"} */}</Text>
              <Ionicons name={"chevron-forward-outline"} size={25} />
            </TouchableOpacity>

            {/* REVIEWS */}
            <TouchableOpacity
              onPress={() => navigation.navigate("AllReviews", { userId, memberId: sellerId })}
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <View>
                <Text style={{ fontSize: 16 }}>
                  {/* {numOfReviews} review{numOfReviews > 1 && "s"} */}
                </Text>
              </View>
              <Ionicons name={"chevron-forward-outline"} size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  margin: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
  topContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    borderWidth: 1,
    borderTopColor: COLORS.secondary,
  },
  rateBtn: {
    height: 40,
    width: SIZES.width - SIZES.padding * 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 5,
  },
  bottomSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
  popupMenuContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.darkgray,
    shadowOpacity: 0.6,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingVertical: SIZES.padding / 2,
  },
  popupMenuOption: {
    minWidth: 100,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding / 2,
  },
  confirmationContainer: {
    width: SIZES.width - SIZES.padding * 8,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    justifyContent: "space-between",
  },
  confirmationBtn: {
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: SIZES.padding,
  },
  confirmationText: {
    marginVertical: SIZES.padding,
  },
});
