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
import * as variables from "../variables";

export default function Profile({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;
  const atMyProfile = useRef(memberId === helper.myId).current;

  const [profile, setProfile] = useState();
  const [numOfItems, setNumOfItems] = useState();
  const [numOfReviews, setNumOfReivews] = useState();
  const [average, setAverage] = useState();
  const [block, setBlock] = useState(false);
  const [hide, setHide] = useState(false);

  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(`${helper.proxy}/profile/get/${memberId}`)
        .then((res) => {
          const { account, review, hide, block } = res.data;
          setProfile(account);
          setNumOfItems(account.numOfItems);
          setNumOfReivews(review.numOfReviews);
          setAverage(review.totalRating / review.numOfReviews);
          setHide(hide);
          setBlock(block);
        })
        .catch((err) => console.error("Profile get initial states error: ", err));
    });
    return unsubscribe;
  }, [navigation]);

  const toggleHeaderMenu = () => {
    setShowHeaderMenu(!showHeaderMenu);
  };

  const openModal = (action) => {
    setShowModal(true);
    setModalKey(action);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowHeaderMenu(false);
  };

  const handleAction = (action) => {
    let endpoint, callback;

    switch (action) {
      case "Report":
        return navigation.navigate("Report", { memberId });
      case "Hide":
      case "Block":
        return openModal(action);
      case "Unblock":
        endpoint = `pull/block`;
        callback = () => {
          openModal(action);
          setBlock(false);
        };
        break;
      case "Unhide":
        endpoint = `pull/hide`;
        callback = () => {
          openModal(action);
          setHide(false);
        };
        break;
      case "Blocked":
        endpoint = `push/block`;
        callback = () => {
          closeModal();
          setBlock(true);
        };
        break;
      case "Hid":
        endpoint = `push/hide`;
        callback = () => {
          openModal(action);
          setHide(true);
        };
        break;
      case "Cancel":
        return closeModal();
      default:
        throw new Error(`Profile->uncaught modal action: ${action}`);
    }

    axios
      .patch(`${helper.proxy}/restrict/${endpoint}/${memberId}`)
      .then(() => {
        callback && callback();
      })
      .catch((err) => {
        console.error("Profile handleOption error: ", err);
      });
  };

  const renderHeaderMenu = () => {
    if (atMyProfile) {
      return (
        <View style={styles.headerMenuContainer}>
          <TouchableOpacity
            style={styles.headerMenuOption}
            onPress={() => {
              toggleHeaderMenu();
              navigation.navigate("EditProfile", { name: profile.name, image: profile.image });
            }}
          >
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      const actions = variables.getRestrictActions(block, hide);

      return (
        <View style={styles.headerMenuContainer}>
          {actions.map((action) => {
            return (
              <TouchableOpacity
                key={action}
                style={styles.headerMenuOption}
                onPress={() => {
                  toggleHeaderMenu();
                  handleAction(action);
                }}
              >
                <Text>{action}</Text>
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
        toggleHeaderMenu={toggleHeaderMenu}
        useBackBtn={true}
        useRightBtns={["ellipsis-vertical-circle-outline"]}
      />

      {block && (
        <View style={styles.blockMsgContianer}>
          <Text style={styles.blockMsgText}>This user is blocked</Text>
        </View>
      )}

      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            {profile && (
              <View>
                <ModalAlert
                  visibleVariable={showModal}
                  closeModal={closeModal}
                  handleAction={handleAction}
                  keys={["user", modalKey]}
                  name={profile.name}
                />
                <View style={styles.headerMenuOutterContainer}>
                  {showHeaderMenu && renderHeaderMenu()}
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
              <MemberRating average={average} numOfReviews={numOfReviews} />
            </View>

            {/* RATE BUTTON  */}
            {!atMyProfile && (
              <TouchableOpacity
                style={[styles.rateBtn, styles.margin]}
                onPress={() => {
                  navigation.navigate("Rate", { memberId });
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
                navigation.push("ItemsTabs", {
                  memberId,
                  atMyProfile,
                })
              }
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <Text style={styles.numOfItemsText}>
                {numOfItems} item{numOfItems > 1 && "s"}
              </Text>
              <Ionicons name={"chevron-forward-outline"} size={25} />
            </TouchableOpacity>

            {/* REVIEWS */}
            <TouchableOpacity
              onPress={() => navigation.push("AllReviews", { memberId })}
              style={[styles.bottomSubContainer, styles.margin]}
            >
              <View>
                <Text style={styles.numOfReviewsText}>
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
  headerMenuOutterContainer: {
    position: "absolute",
    top: -115,
    left: 120,
    zIndex: 1,
  },
  headerMenuContainer: {
    backgroundColor: COLORS.white,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: COLORS.darkgray,
    shadowOpacity: 0.6,
    elevation: 5,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingVertical: SIZES.padding / 2,
  },
  headerMenuOption: {
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
  blockMsgContianer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  blockMsgText: { color: COLORS.white },
  numOfItemsText: { fontSize: 16 },
  numOfReviewsText: { fontSize: 16 },
});
