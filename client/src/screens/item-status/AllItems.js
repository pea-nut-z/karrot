import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCard } from "../../UI";
import { COLORS, FONTS } from "../../constants";

export default function AllItems({ accountInfo, activeData, soldData, navigation }) {
  const [profile, setProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    setProfile(accountInfo);
    setActiveItems(activeData);
    setSoldItems(soldData);
  }, [accountInfo, activeData, soldData]);

  return (
    <View style={{ flex: 1 }}>
      {!activeData && !soldData ? (
        <View style={styles.noListingMsgContainer}>
          <Text style={styles.noListingText}>No listings</Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={styles.ListingContainer}>
            {activeData &&
              activeItems.map((item) => {
                return (
                  <ItemCard
                    key={item.itemId}
                    accountInfo={profile}
                    listing={item}
                    navigation={navigation}
                  />
                );
              })}
            {soldData &&
              soldItems.map((item) => {
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
