import React, { useEffect, useMemo } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { ItemCards } from "../../components";
import { filterMemberItems } from "../../store/selectors";
import { COLORS, FONTS } from "../../constants";

export default function Hidden({ userId, navigation }) {
  // USER'S LISTINGS
  const getHiddenItems = useMemo(filterMemberItems, []);
  const hiddenItems = useSelector((state) => getHiddenItems(state, userId, undefined, "hidden"));

  return (
    <View style={{ flex: 1 }}>
      {hiddenItems.length === 0 ? (
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
            No hidden items
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 50 }}>
            <ItemCards
              userId={userId}
              items={hiddenItems}
              navigation={navigation}
              atUserHiddenItemsScreen={true}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
