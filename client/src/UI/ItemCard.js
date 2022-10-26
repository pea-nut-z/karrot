import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { ModalAlert } from ".";
import { SIZES, COLORS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import * as helper from "../helper";
import * as variables from "../variables";
import axios from "axios";
import Modal from "react-native-modal";

export default function ItemCard({ profile, item, image, navigation, removeFav, changeItemStatus }) {
  const [showOutterModal, setShowOutterModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState("");

  useEffect(() => {
    if (Platform.OS === "web" && typeof image === "number") {
      Image.resolveAssetSource = (source) => ({
        uri: source,
      });
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    setShowOutterModal(false);
  };

  const handleAction = (action) => {
    switch (action) {
      case "Hide":
      case "Unhide":
      case "Delete":
        setModalKey(action);
        setShowModal(true);
        break;
      case "Confirm-Hide":
        closeModal();
        changeItemStatus.update(item.status, "Hidden", item.itemId);
        break;
      case "Confirm-Delete":
        closeModal();
        changeItemStatus.delete(item.status, item.itemId);
        break;
      case "Confirm-Unhide":
      case "Change to active":
        closeModal();
        changeItemStatus.update(item.status, "Active", item.itemId);
        break;
      case "Sold":
        closeModal();
        changeItemStatus.update(item.status, "Sold", item.itemId);
        break;
      case "Edit":
        closeModal();
        navigation.navigate("Sell", { itemId: item.itemId });
        break;
      case "Cancel":
        closeModal();
        break;
      default:
        closeModal();
        throw new Error(`Item Card-> uncaught modal action: ${action}`);
    }
  };

  return (
    <TouchableOpacity
      style={styles.outterContainer}
      onPress={() =>
        navigation.push("ItemDetails", {
          memberId: profile.id,
          itemId: item.itemId,
        })
      }
    >
      {/* ITEM DESCRIPTION */}
      <View style={styles.innerContainer}>
        <Image
          source={
            Platform.OS === "web" && typeof image === "number"
              ? { uri: Image.resolveAssetSource(image).uri }
              : typeof image !== "number"
              ? { uri: image }
              : image
          }
          resizeMode={"contain"}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.locationTimeText}>
            {item.location} • {helper.timeSince(item.date)}
          </Text>
          <View style={styles.priceContainer}>
            {item.status == "Reserved" && (
              <View style={styles.reserveContainer}>
                <Text style={styles.reserveText}>Reserved</Text>
              </View>
            )}
            <Text>$ {item.price}</Text>
          </View>
        </View>
      </View>

      {/* FEATURES FOR MY ITEM */}
      <View>
        {helper.myId == profile.id && !removeFav && (
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowOutterModal(true);
              }}
            >
              <Ionicons name={"ellipsis-vertical-circle"} size={35} />
            </TouchableOpacity>
            <Modal
              isVisible={showOutterModal}
              onBackdropPress={() => {
                closeModal();
              }}
            >
              {variables["detailedItemStatusOptions"][item.status].map((action) => {
                return (
                  <TouchableOpacity
                    key={action}
                    onPress={() => handleAction(action)}
                    style={{
                      height: 50,
                      backgroundColor: COLORS.white,
                      paddingHorizontal: SIZES.padding,
                      justifyContent: "center",
                    }}
                  >
                    <Text>{action}</Text>
                  </TouchableOpacity>
                );
              })}
              <ModalAlert
                visibleVariable={showModal}
                closeModal={closeModal}
                handleAction={handleAction}
                keys={["listing", modalKey]}
              />
            </Modal>
          </View>
        )}

        {removeFav && (
          <View
            style={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                axios
                  .patch(`${helper.proxy}/activity/remove/favourite/${profile.id}/${item.itemId}`)
                  .then(() => {
                    removeFav(item.itemId);
                  })
                  .catch((err) => console.error("Remove favourite error: ", err));
              }}
            >
              <Ionicons name={"heart"} size={30} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    flex: 1,
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: 105,
    height: 105,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
  },
  infoContainer: { paddingHorizontal: SIZES.padding },
  titleText: {
    paddingVertical: SIZES.padding,
  },
  locationTimeText: {
    color: COLORS.darkgray,
  },
  priceContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  reserveContainer: {
    height: 25,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 5,
  },
  reserveText: { color: "white" },
});
