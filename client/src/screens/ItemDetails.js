import React, { useMemo, useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Border, Header, ImageScrollView, MemberInfo, MemberRating, SellerOtherItems } from "../UI";
import { FONTS, SIZES, itemStatusOptions, COLORS } from "../constants";
import * as types from "../store/actionTypes";
import { selectMemberAllItems } from "../store/selectors";
import axios from "axios";
import * as helper from "../helper";

export default function ItemDetails({ route, navigation }) {
  const [profile, setProfile] = useState();
  const [item, setItem] = useState();
  const [itemStatus, setItemStatus] = useState();
  const [newItem, setNewItem] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(itemStatusOptions);
  const [useWhiteBtns, setUseWhiteBtns] = useState();
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.profile.id);
  const views = useSelector((state) => state.activity.views);
  console.log({ views });

  useEffect(() => {
    // add if(mineNewItem)
    // setNewItem(route.params.newItem);

    const { memberId, itemId } = route.params;
    axios
      .get(`${helper.proxy}/listing/?id=${memberId}&itemId=${itemId}`)
      .then((res) => {
        const listing = res.data.docs[0];
        const item = listing.items;
        setProfile(listing);
        setItem(item);
        setItemStatus(item.status);
      })
      .catch((err) => console.error("itemDetail get listing error: ", err));

    if (window === undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (item) {
      const images = item.images;
      setUseWhiteBtns(typeof images[0] === "number" || images[0].includes(".png") ? false : true);
    }
    if (profile && myId !== profile.id && !views.includes(item.itemId)) {
      axios
        .patch(`${helper.proxy}/activity/update-view/${profile.id}/${item.itemId}`)
        .then(() => {
          dispatch({ type: types.ADD_VIEW, data: item.itemId });
        })
        .catch((err) => {
          console.log("ItemDetail add-view error: ", err);
        });
    }
  }, [item]);

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
            {/* RENDER STATUS DROPDOWN ONLY TO SELLER */}
            <View style={styles.itemInfoContainer}>
              {myId === profile.id && (
                <DropDownPicker
                  open={dropDown}
                  value={itemStatus}
                  items={dropDownItems}
                  placeholder={itemStatus}
                  setOpen={setDropDown}
                  setValue={setItemStatus}
                  onChangeValue={(value) => {
                    // dispatch({
                    //   type: actions.ITEM_STATUS_CHANGED,
                    //   sellerId,
                    //   itemId,
                    //   status: value,
                    // });
                  }}
                  setItems={setDropDownItems}
                  disableBorderRadius={true}
                  style={styles.dropDown}
                  placeholderStyle={styles.dropDownPlaceholder}
                  dropDownContainerStyle={styles.dropDownContainer}
                />
              )}

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.categoryDate}>
                {item.category} • {helper.timeSince(item.date)}
              </Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.chatsFavs}>
                {item.chats} chats • {item.favourites} favourites • {item.views} views
              </Text>
            </View>
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
  itemInfoContainer: {
    minHeight: SIZES.height * 0.21,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  dropDown: {
    borderRadius: 0,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.lightGray4,
    width: 120,
  },
  dropDownPlaceholder: {
    color: COLORS.secondary,
    marginLeft: SIZES.padding,
  },
  dropDownContainer: {
    borderRadius: 0,
    borderColor: COLORS.secondary,
    width: 120,
  },
  title: { paddingVertical: SIZES.padding },
  categoryDate: {
    paddingBottom: SIZES.padding,
    color: COLORS.secondary,
  },
  desc: {
    paddingVertical: SIZES.padding,
  },
  chatsFavs: {
    paddingVertical: SIZES.padding,
    color: COLORS.secondary,
  },
});
