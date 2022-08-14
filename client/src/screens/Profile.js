import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Header, MemberInfo, MemberRating, ModalAlert } from "../UI";
import { SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as helper from "../helper";

export default function Profile({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;
  const atMyProfile = useRef(memberId === helper.myId).current;

  const [profile, setProfile] = useState();
  const [numOfItems, setNumOfItems] = useState();
  const [numOfReviews, setNumOfReivews] = useState();
  const [block, setBlock] = useState(false);
  const [hide, setHide] = useState(false);

  // Modal
  const [popupMenu, setPopupMenu] = useState(false);
  const [blockAlert, setBlockAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const [hideMsg, setHideMsg] = useState(false);
  const [unblockMsg, setUnblockMsg] = useState(false);
  const [unhideMsg, setUnhideMsg] = useState(false);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/profile/read/${memberId}`)
      .then((res) => {
        const { account, reviewCount, hide, block } = res.data;
        setProfile(account);
        setNumOfItems(account.numOfItems);
        setNumOfReivews(reviewCount.numOfReviews);
        setHide(hide);
        setBlock(block);
      })
      .catch((err) => console.error("Profile get initial states error: ", err));
  }, []);

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
    setHideMsg(false);
  };

  const onClickOption = (option) => {
    let endpoint, callback;

    switch (option) {
      case "Report":
        navigation.navigate("Report", { memberId });
        return;
      case "cancel":
        closeAlertModal();
        return;
      case "Hide":
        setHideAlert(true);
        return;
      case "Block":
        setBlockAlert(true);
        return;
      case "Unblock":
        endpoint = `pull/block`;
        callback = () => {
          setUnblockMsg(true);
          setBlock(false);
        };
        break;
      case "Unhide":
        endpoint = `pull/hide`;
        callback = () => {
          setUnhideMsg(true);
          setHide(false);
        };
        break;
      case "block-confirmed":
        endpoint = `push/block`;
        callback = () => {
          setBlock(true);
          closeAlertModal();
        };
        break;
      case "hide-confirmed":
        endpoint = `push/hide`;
        callback = () => {
          setHide(true);
          setHideMsg(true);
          closeAlertModal();
        };
        break;
      default:
        return;
    }

    axios
      .patch(`${helper.proxy}/restrict/${endpoint}/${memberId}`)
      .then(() => {
        callback && callback();
      })
      .catch((err) => {
        console.error("Profile onClickOption error: ", err);
      });
  };

  const renderPopoutMenu = () => {
    if (atMyProfile) {
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
      const options = block ? ["Report", "Unblock"] : ["Report", "Block", hide ? "Unhide" : "Hide"];

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
        navigation={navigation}
        title={"Profile"}
        showPopoutMenu={showPopoutMenu}
        useBackBtn={true}
        useRightBtns={["ellipsis-vertical-circle-outline"]}
      />

      {block && (
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

      <TouchableWithoutFeedback onPress={hidePopoutMenu}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            {profile && (
              <View>
                <ModalAlert
                  visibleVariable={blockAlert}
                  closeModal={closeAlertModal}
                  onClickOption={onClickOption}
                  message={`Are you sure you want to block ${profile.name}? Their posts won't be visible to you and they won't be able to chat with you.`}
                  options={["CANCEL", "BLOCK"]}
                  actions={["cancel", "block-confirmed"]}
                />
                <ModalAlert
                  visibleVariable={hideAlert}
                  closeModal={closeAlertModal}
                  onClickOption={onClickOption}
                  message={`Hide ${profile.name} and all of ${profile.name}'s post ?`}
                  options={["CANCEL", "YES, HIDE"]}
                  actions={["cancel", "hide-confirmed"]}
                />
                <ModalAlert
                  visibleVariable={unblockMsg}
                  closeModal={closeMsgModal}
                  onClickOption={onClickOption}
                  message={`${profile.name} was unblocked`}
                />
                <ModalAlert
                  visibleVariable={unhideMsg}
                  closeModal={closeMsgModal}
                  onClickOption={onClickOption}
                  message={`${profile.name}'s posts have been unhidden`}
                />
                <ModalAlert
                  visibleVariable={hideMsg}
                  closeModal={closeMsgModal}
                  onClickOption={onClickOption}
                  message={`${profile.name}'s posts will no longer be visible to you`}
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
                {/* MEMBER INFO */}
                <View style={styles.margin}>
                  <MemberInfo
                    picture={profile.image}
                    name={profile.name}
                    location={profile.location}
                  />
                </View>
              </View>
            )}

            {/* MEMBER RATING */}
            <View style={styles.margin}>
              <MemberRating memberId={memberId} />
            </View>

            {/* RATE BUTTON  */}
            {!atMyProfile && (
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
              //   onPress={() =>
              //     navigation.navigate(atMyProfile ? "UserItemsTabs" : "SellerItemsTabs", {
              //       userId,
              //       sellerId,
              //     })
              //   }
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <Text style={{ fontSize: 16 }}>
                {numOfItems} item{numOfItems > 1 && "s"}
              </Text>
              <Ionicons name={"chevron-forward-outline"} size={25} />
            </TouchableOpacity>

            {/* REVIEWS */}
            <TouchableOpacity
              //   onPress={() => navigation.navigate("AllReviews", { userId, memberId: sellerId })}
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <View>
                <Text style={{ fontSize: 16 }}>
                  {numOfReviews} review{numOfReviews > 1 && "s"}
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
