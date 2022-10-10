import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCard } from "./index";
import { COLORS } from "../constants";

export default function ItemStatusTab({ accountInfo, listings, message,navigation }) {
  const [profile, setProfile] = useState({});
  const [items, setItems] = useState();

  useEffect(() => {
    setProfile(accountInfo);
    setItems(listings);
  }, [accountInfo, listings]);

  return (
    <View style={{ flex: 1 }}>
      {listings.length === 0 ? (
        <View style={styles.noListingMsgContainer}>
          <Text style={styles.noListingText}>{message}</Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={styles.ListingContainer}>
            {items &&
              items.map((item) => {
                return (
                  <ItemCard
                    key={item.itemId}
                    accountInfo={profile}
                    listing={item}
                    navigation={navigation}
                  />
                );
              })}
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noListingMsgContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noListingText: {
    color: COLORS.secondary,
  },
  ListingContainer: { paddingBottom: 50 },
});
