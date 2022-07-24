import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { filterMemberItems } from "../../store/selectors";
import { ItemCards } from "../../components";
import { COLORS, FONTS } from "../../constants";

export default function Sold({ userId, sellerId, atUserItemsTabs, navigation }) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;

  // LISTINGS
  const getSoldItems = useMemo(filterMemberItems, []);
  const soldItems = useSelector((state) => getSoldItems(state, memberId, undefined, "sold"));

  return (
    <View style={{ flex: 1 }}>
      {soldItems.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              // ...FONTS.body2,
            }}
          >
            No sold items
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 50 }}>
            <ItemCards
              userId={userId}
              items={soldItems}
              navigation={navigation}
              atUserSoldItemsScreen={atUserItemsTabs}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
