import React from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ItemCard, NoItemsMsg } from "./index";

export default function ItemStatusTab({ items, message, navigation, changeItemStatus }) {
  return (
    <View style={{ flex: 1 }}>
      {items.length ? (
        <KeyboardAwareScrollView
          extraHeight={50}
          enableOnAndroid
          showsVerticalScrollIndicator={false}
        >
          {items.map((profile) => {
            return (
              <ItemCard
                key={profile.items.itemId}
                profile={profile}
                item={profile.items}
                image={profile.items.images[0]}
                navigation={navigation}
                changeItemStatus={changeItemStatus}
              />
            );
          })}
        </KeyboardAwareScrollView>
      ) : (
        <NoItemsMsg message={message} />
      )}
    </View>
  );
}
