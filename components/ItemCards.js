import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { SIZES, COLORS } from "../constants";
import { ModalAlert } from ".";
import { Ionicons } from "@expo/vector-icons";
import { timeSince } from "../helper";
import { useDispatch } from "react-redux";
import * as actions from "../store/actionTypes";
import Modal from "react-native-modal";

export default function ItemCards({
  userId,
  items,
  navigation,
  atUserActiveItemsScreen,
  atUserHiddenItemsScreen,
  atUserSoldItemsScreen,
  atUserFavouritesScreen,
}) {
  const dispatch = useDispatch();

  const [optionBtn, setOptionBtn] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [hideItemAlert, setHideItemAlert] = useState(false);
  const [unhideItemAlert, setUnhideItemAlert] = useState(false);
  const [deleteItemAlert, setDeleteItemAlert] = useState(false);

  // THREE DOTS OPTION BTN
  const renderOptionBtn = () => {
    if (atUserActiveItemsScreen || atUserHiddenItemsScreen || atUserSoldItemsScreen) {
      return (
        <TouchableOpacity
          onPress={() => {
            setOptionBtn(true);
            setOptionModal(true);
          }}
        >
          <Ionicons name={"ellipsis-vertical-circle"} size={40} />
        </TouchableOpacity>
      );
    }
  };

  const closeModal = () => {
    setUnhideItemAlert(false);
    setHideItemAlert(false);
    setDeleteItemAlert(false);
    setOptionModal(false);
    setOptionBtn(false);
  };

  const renderOptionModal = (itemId) => {
    let options = atUserHiddenItemsScreen
      ? ["Edit", "Delete"]
      : atUserSoldItemsScreen
      ? ["Change to active", "Edit", "Hide", "Delete"]
      : ["Edit", "Hide", "Delete"];

    return (
      <Modal
        isVisible={optionBtn}
        onBackdropPress={() => {
          closeModal();
        }}
      >
        {options.map((option) => {
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onClickOption(option, itemId)}
              style={{
                height: 50,
                backgroundColor: COLORS.white,
                paddingHorizontal: SIZES.padding,
                justifyContent: "center",
              }}
            >
              <Text
                style={
                  {
                    // ...FONTS.body4,
                  }
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
        <ModalAlert
          itemId={itemId}
          visibleVariable={hideItemAlert}
          closeModal={closeModal}
          onClickOption={onClickOption}
          message={"Other users won't be able to see your post. Hide post?"}
          options={["CANCEL", "HIDE"]}
          actions={["cancel", "hide-confirmed"]}
        />

        <ModalAlert
          itemId={itemId}
          visibleVariable={deleteItemAlert}
          closeModal={closeModal}
          onClickOption={onClickOption}
          message={"Are you sure you want to delete this post?"}
          options={["CANCEL", "DELETE"]}
          actions={["cancel", "delete-confirmed"]}
        />
      </Modal>
    );
  };

  const onClickOption = (action, itemId, status) => {
    const sellerId = userId;
    if (action === "toggle-status") {
      dispatch({
        type: actions.ITEM_STATUS_CHANGED,
        sellerId,
        itemId,
        status: status === "Reserved" ? "Active" : "Reserved",
      });
    }
    if (action === "Change to active") {
      closeModal();
      dispatch({
        type: actions.ITEM_STATUS_CHANGED,
        sellerId,
        itemId,
        status: "Active",
      });
    }
    if (action === "Sold") {
      dispatch({
        type: actions.ITEM_STATUS_CHANGED,
        sellerId,
        itemId,
        status: "Sold",
      });
    }
    if (action === "Edit") {
      closeModal();
      navigation.navigate("Sell", { userId, existingItemId: itemId });
    }
    if (action === "Hide") {
      setHideItemAlert(true);
    }
    if (action === "unhide") {
      setUnhideItemAlert(true);
    }
    if (action === "Delete") {
      setDeleteItemAlert(true);
    }
    if (action === "cancel") {
      closeModal();
    }

    // CONFIRMATIONS MODALS
    if (action === "hide-confirmed") {
      closeModal();
      dispatch({
        type: actions.ITEM_STATUS_CHANGED,
        sellerId,
        itemId,
        status: "Hidden",
      });
    }
    if (action === "unhide-confirmed") {
      closeModal();
      dispatch({
        type: actions.ITEM_STATUS_CHANGED,
        sellerId,
        itemId,
        status: "Active",
      });
    }
    if (action === "delete-confirmed") {
      closeModal();
      dispatch({
        type: actions.ITEM_DELETED,
        sellerId,
        itemId,
      });
    }
  };

  return (
    <View>
      {items.map((item, index) => {
        const { sellerId, location, itemId, date, status } = item;
        const img = item["images"][0];
        if (Platform.OS === "web") {
          Image.resolveAssetSource = (source) => ({
            uri: source,
          });
        }
        return (
          <View key={`item-${index}`}>
            <TouchableOpacity
              style={{
                height: 130,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: SIZES.padding,
                paddingHorizontal: SIZES.padding * 2,
              }}
              onPress={() =>
                navigation.navigate("ItemDetails", {
                  userId,
                  sellerId,
                  itemId,
                })
              }
            >
              {/* ITEM CARD */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: Image.resolveAssetSource(img).uri }}
                  resizeMode={"contain"}
                  style={{
                    width: 105,
                    height: 105,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: COLORS.secondary,
                  }}
                />

                {/* ITEM INFO */}
                <View style={{ paddingHorizontal: SIZES.padding * 2 }}>
                  <Text
                    style={{
                      // ...FONTS.h4,
                      paddingVertical: SIZES.padding,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      // ...FONTS.body4,
                      color: COLORS.darkgray,
                    }}
                  >
                    {location} • {timeSince(date)}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {status === "Reserved" && (
                      <View
                        style={{
                          height: 25,
                          width: 70,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "green",
                          borderRadius: 5,
                        }}
                      >
                        <Text style={{ color: "white" }}>Reserved</Text>
                      </View>
                    )}
                    <Text
                      style={
                        {
                          // marginLeft: status !== "Active" ? SIZES.padding : null,
                          // ...FONTS.h4,
                        }
                      }
                    >
                      $ {item.price}
                    </Text>
                  </View>
                </View>
              </View>

              {/* IF ON USER LISTINGS - ITEM OPTION BUTTON */}
              <View>
                {renderOptionBtn()}
                {renderOptionModal(itemId)}

                {/* IF ON USER FAVOURITES SCREEN */}
                {atUserFavouritesScreen && (
                  <View
                    style={{
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        dispatch({
                          type: actions.FAVOURITE_REMOVED,
                          userId,
                          sellerId,
                          itemId,
                        });
                      }}
                    >
                      <Ionicons name={"heart"} size={30} color={COLORS.primary} />
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Ionicons name={"heart-outline"} size={15} color={COLORS.darkgray} />
                      <Text> {item.favourites}</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* IF ON USER ACTIVE ITEMS SCREEN */}
            {atUserActiveItemsScreen && (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: COLORS.secondary,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    paddingVertical: SIZES.padding,
                  }}
                  onPress={() => onClickOption("toggle-status", itemId, status)}
                >
                  <Text
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {status === "Reserved" ? "Change to active" : "Change to reserved"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: COLORS.secondary,
                    width: "50%",
                    paddingVertical: SIZES.padding,
                  }}
                  onPress={() => onClickOption("Sold", itemId)}
                >
                  <Text
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Change to sold
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* IF ON USER HIDDEN ITEMS SCREEN */}
            {atUserHiddenItemsScreen && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.secondary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: SIZES.padding,
                }}
                onPress={() => onClickOption("unhide", itemId)}
              >
                <Text
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Change to unhidden
                </Text>
              </TouchableOpacity>
            )}
            <ModalAlert
              itemId={itemId}
              visibleVariable={unhideItemAlert}
              closeModal={closeModal}
              onClickOption={onClickOption}
              message={"Post unhidden"}
              options={["CANCEL", "UNHIDE"]}
              actions={["cancel", "unhide-confirmed"]}
            />

            {atUserSoldItemsScreen && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.secondary,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: SIZES.padding,
                }}
                onPress={() => onClickOption("unhide", itemId)}
              >
                <Text
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Leave review
                </Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
}
