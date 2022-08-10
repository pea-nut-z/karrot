import React, { useMemo, useEffect, useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Border, Header, ImageScrollView, MemberInfo, MemberRating, OtherItem } from "../UI";
import { FONTS, SIZES, itemStatusOptions, COLORS } from "../constants";
import { timeSince } from "../helper";
import * as actions from "../store/actionTypes";
import { selectMemberAllItems } from "../store/selectors";

export default function ItemDetails({ route, navigation }) {
  const { userId, sellerId, itemId, newItem } = route.params;

  // SELLER INFO
  const seller = useSelector((state) => state["members"][sellerId]);

  // CURRENT ITEM INFO
  const item = useSelector((state) => {
    return state["listings"][sellerId][itemId];
  });

  const images = item.images;
  const useWhiteBtns = typeof images[0] === "number" || images[0].includes(".png") ? false : true;

  // USER'S FAVOURITES
  const favs = useSelector((state) => state["favourites"][userId]);
  const isFav = favs.find((item) => item.itemId === itemId);

  // SELLER'S LISTINGS
  const getSellerAllItems = useMemo(selectMemberAllItems, []);
  const sellerAllItems = useSelector((state) => getSellerAllItems(state, sellerId));

  // DROPDOWN MENU
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(itemStatusOptions);
  const [itemStatus, setItemStatus] = useState(item.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId !== sellerId) {
      dispatch({
        type: actions.ITEM_VIEW_INCREMENTED,
        sellerId,
        itemId,
      });
    }
    if (window === undefined) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* HEADER */}
      <View
        style={{
          zIndex: 1,
          position: "absolute",
          top: Platform.OS === "ios" ? 35 : 0,
        }}
      >
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
        <ImageScrollView images={images} />

        {/* SELLER INFO */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile", { userId, sellerId })}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <MemberInfo
            picture={seller.displayPic}
            name={seller.username}
            location={seller.location}
            atItemDetails={true}
          />

          <MemberRating memberId={sellerId} atItemDetails={true} />
        </TouchableOpacity>

        <Border />

        {/* RENDER ITEM INFO */}
        {/* RENDER STATUS DROPDOWN ONLY TO SELLER */}
        <View
          style={{
            minHeight: SIZES.height * 0.21,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          {userId === sellerId && (
            <DropDownPicker
              open={dropDown}
              value={itemStatus}
              items={dropDownItems}
              placeholder={itemStatus}
              setOpen={setDropDown}
              setValue={setItemStatus}
              onChangeValue={(value) => {
                dispatch({
                  type: actions.ITEM_STATUS_CHANGED,
                  sellerId,
                  itemId,
                  status: value,
                });
              }}
              setItems={setDropDownItems}
              disableBorderRadius={true}
              style={{
                borderRadius: 0,
                borderColor: COLORS.secondary,
                backgroundColor: COLORS.lightGray4,
                width: 120,
              }}
              placeholderStyle={{
                color: COLORS.secondary,
                marginLeft: SIZES.padding,
              }}
              dropDownContainerStyle={{
                borderRadius: 0,
                borderColor: COLORS.secondary,
                width: 120,
              }}
            />
          )}

          <Text style={{ paddingVertical: SIZES.padding, ...FONTS.h4 }}>{item.title}</Text>
          <Text
            style={{
              paddingBottom: SIZES.padding,
              color: COLORS.secondary,
              // ...FONTS.body4,
            }}
          >
            {item.category} • {timeSince(item.date)}
          </Text>
          <Text
            style={{
              paddingVertical: SIZES.padding,
              // ...FONTS.body4
            }}
          >
            {item.description}
          </Text>
          <Text
            style={{
              paddingVertical: SIZES.padding,
              color: COLORS.secondary,
              ...FONTS.body4,
            }}
          >
            {item.chats} chats • {item.favourites} favourites • {item.views} views
          </Text>
        </View>

        <Border />

        {/* REPORT THIS POST  */}
        {sellerId === userId && (
          <TouchableOpacity
            style={{
              height: 60,
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={
                {
                  // ...FONTS.h4
                }
              }
            >
              Report this post
            </Text>
          </TouchableOpacity>
        )}

        <Border />

        {/* OTHER ITEMS FROM SELLER */}
        {sellerAllItems.length !== 1 && (
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
              }}
            >
              <Text
                style={
                  {
                    // ...FONTS.h4
                  }
                }
              >
                Other items by {seller.username}
              </Text>

              {/* SEE ALL ITEMS BUTTON */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SellerItemsTabs", {
                    userId,
                    sellerId,
                  });
                }}
              >
                <Text
                  style={{
                    color: COLORS.darkgray,
                    // ...FONTS.body4
                  }}
                >
                  See all
                </Text>
              </TouchableOpacity>
            </View>
            {/* FOUR OTHER ITEMS */}
            <OtherItem userId={userId} sellerId={sellerId} itemId={itemId} navigation={navigation} />
          </View>
        )}
      </KeyboardAwareScrollView>

      {/* FOOTER BUTTON */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding * 2,
          paddingVertical: SIZES.padding,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              style={{
                paddingRight: SIZES.padding * 2,
                borderRightWidth: 1,
                borderRightColor: COLORS.secondary,
              }}
              onPress={() => {
                dispatch({
                  type: isFav ? actions.FAVOURITE_REMOVED : actions.FAVOURITE_ADDED,
                  userId,
                  sellerId,
                  itemId,
                });
              }}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={30}
                color={isFav ? COLORS.primary : "black"}
              />
            </TouchableOpacity>
          </View>

          <View style={{ paddingHorizontal: SIZES.padding * 2 }}>
            <Text
              style={
                {
                  // ...FONTS.body4
                }
              }
            >
              $ {item.price}
            </Text>
            {item.negotiable ? (
              <TouchableOpacity>
                <Text
                  style={{
                    color: COLORS.primary,
                    // ...FONTS.body4
                  }}
                >
                  Make Offer
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={
                  {
                    // ...FONTS.body4
                  }
                }
              >
                Non-negotiable
              </Text>
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.primary,
              height: 40,
              width: 70,
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                // ...FONTS.body4
              }}
            >
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <SafeAreaView /> */}
    </SafeAreaView>
  );
}
