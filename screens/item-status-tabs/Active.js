import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { ItemCards } from "../../components";
import { filterMemberItems } from "../../store/selectors";
import { COLORS, FONTS } from "../../constants";

export default function Active({ userId, sellerId, atUserItemsTabs, navigation }) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;

  // LISTINGS
  const getActiveItems = useMemo(filterMemberItems, []);
  const activeAndReservedItems = useSelector((state) =>
    getActiveItems(state, memberId, undefined, "active-and-reserved")
  );

  return (
    <View style={{ flex: 1 }}>
      {activeAndReservedItems.length === 0 ? (
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
            No active items
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, paddingBottom: 50 }}>
            <ItemCards
              userId={userId}
              items={activeAndReservedItems}
              navigation={navigation}
              atUserActiveItemsScreen={atUserItemsTabs}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
