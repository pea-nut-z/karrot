import React, { useMemo, useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Border, Header, ImageScrollView, MemberInfo, MemberRating, SellerOtherItems } from "../UI";
import { FONTS, SIZES, itemStatusOptions, COLORS } from "../constants";
import * as actions from "../store/actionTypes";
import { selectMemberAllItems } from "../store/selectors";
import axios from "axios";
import * as helper from "../helper";

export default function ItemDetails({ route, navigation }) {
  const [profile, setProfile] = useState();
  const [item, setItem] = useState();
  const [newItem, setNewItem] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(itemStatusOptions);
  const [useWhiteBtns, setUseWhiteBtns] = useState();

  const myId = useSelector((state) => state.profile.id);

  useEffect(() => {
    const props = route.params.listing;
    setProfile(props);
    setItem(props.items);
    setNewItem(route.params.newItem);

    const images = props.items.images;
    setUseWhiteBtns(typeof images[0] === "number" || images[0].includes(".png") ? false : true);
    if (myId !== props.id) {
      axios
        .patch(`${helper.proxy}/memberListing/add-view/${props.id}/${props.items.itemId}`)
        .catch((err) => {
          console.log("ItemDetails page listing add-view: ", err);
        });
    }
    if (window === undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {item && (
        <View>
          <View style={styles.headerContainer}>
            <Header
              navigation={navigation}
              newItem={newItem}
              useWhiteBtns={useWhiteBtns}
              useBackBtn={true}
              useHomeBtn={true}
              useRightBtns={["share-social-outline"]}
            />
          </View>
          <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
            <ImageScrollView images={item.images} />

            {/* SELLER INFO */}
            <TouchableOpacity
              // onPress={() => navigation.navigate("Profile", { userId, sellerId })}
              style={styles.memberInfoContainer}
            >
              <MemberInfo
                picture={profile.image}
                name={profile.name}
                location={profile.location}
                atItemDetails={true}
              />

              <MemberRating memberId={profile.id} atItemDetails={true} />
            </TouchableOpacity>

            <Border />

            {/* RENDER ITEM INFO */}
          </KeyboardAwareScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 1,
    position: "absolute",
    top: Platform.OS === "ios" ? 35 : 0,
  },
  memberInfoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
});
