import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { ItemCards } from "../../components";
import { selectMemberAllItems } from "../../store/selectors";
import { COLORS, FONTS } from "../../constants";

export default function AllItems({ userId, sellerId, atUserItemsTabs, navigation }) {
  // CHECK CURRENT SCREEN
  const memberId = atUserItemsTabs ? userId : sellerId;
  // LISTINGS
  const getMemberAllItems = useMemo(selectMemberAllItems, []);
  const memberAllItems = useSelector((state) => getMemberAllItems(state, memberId));

  return (
    <View style={{ flex: 1 }}>
      {memberAllItems.length === 0 ? (
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
            No listings
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
          <View style={{ paddingBottom: 50 }}>
            <ItemCards userId={userId} items={memberAllItems} navigation={navigation} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
}
