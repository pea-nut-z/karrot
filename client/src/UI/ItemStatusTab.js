import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCard, NoItemsMsg } from "./index";

export default function ItemStatusTab({
  accountInfo,
  listings,
  message,
  navigation,
  changeItemStatus,
}) {
  const [profile, setProfile] = useState({});
  const [items, setItems] = useState();

  useEffect(() => {
    setProfile(accountInfo);
    setItems(listings);
  }, [accountInfo, listings]);

  return (
    <View style={{ flex: 1 }}>
      {listings.length === 0 ? (
        <NoItemsMsg message={message} />
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
                    changeItemStatus={changeItemStatus}
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
  ListingContainer: { paddingBottom: 50 },
});
