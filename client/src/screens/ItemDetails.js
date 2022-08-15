import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { Border, Header, ImageScrollView, MemberInfo, MemberRating, OtherItem } from "../UI";
import { FONTS, SIZES, itemStatusOptions, COLORS } from "../constants";
import axios from "axios";
import * as helper from "../helper";

export default function ItemDetails({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;
  const itemId = useRef(route.params.itemId).current;
  const newItem = useRef(route.params.newItem).current;
  const [profile, setProfile] = useState();
  const [item, setItem] = useState();
  const [otherItems, setOtherItems] = useState([]);
  const [itemStatus, setItemStatus] = useState();
  const [fav, setFav] = useState();
  const [hide, setHide] = useState();
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(itemStatusOptions);
  const [useWhiteBtns, setUseWhiteBtns] = useState();
  const [numOfReviews, setNumOfReivews] = useState();
  const [average, setAverage] = useState();

  useEffect(() => {
    if (helper.myId !== memberId) {
      axios
        .get(`${helper.proxy}/listing/read/${memberId}/${itemId}`)
        .then((res) => {
          const { fav, hide, twoOtherItems, listing, review } = res.data;
          const curItem = listing.items[0];
          setFav(fav);
          setHide(hide);
          setNumOfReivews(review.numOfReviews);
          setAverage(review.totalRating / review.numOfReviews);
          setProfile(listing);
          setItem(curItem);
          setOtherItems(twoOtherItems);
          setItemStatus(curItem.status);
          setUseWhiteBtns(
            typeof curItem.images[0] === "number" || curItem.images[0].includes(".png")
              ? false
              : true
          );
        })
        .catch((err) => console.error("itemDetail get listing error: ", err));
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
          <View style={styles.scrollContainer}>
            <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
              <ImageScrollView images={item.images} />

              {/* SELLER INFO */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Profile", { memberId })}
                style={styles.memberInfoContainer}
              >
                <MemberInfo
                  picture={profile.image}
                  name={profile.name}
                  location={profile.location}
                  atItemDetails={true}
                />

                <MemberRating average={average} numOfReviews={numOfReviews} atItemDetails={true} />
              </TouchableOpacity>

              <Border />

              {/* RENDER ITEM INFO */}
              {/* RENDER STATUS DROPDOWN ONLY TO SELLER */}
              <View style={styles.itemInfoContainer}>
                {helper.myId === memberId && (
                  <DropDownPicker
                    open={dropDown}
                    value={itemStatus}
                    items={dropDownItems}
                    placeholder={itemStatus}
                    setOpen={setDropDown}
                    setValue={setItemStatus}
                    onChangeValue={(value) => {
                      axios
                        .patch(`${helper.proxy}/update/${itemId}`, { status: value })
                        .then(() => setItemStatus(value))
                        .catch((err) => console.error("itemDetail change item status error: ", err));
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
                  {item.chats} chats • {item.favourites} favourites • {item.views + 1} views
                </Text>
              </View>

              <Border />

              {/* REPORT THIS POST  */}
              {helper.myId !== memberId && (
                <TouchableOpacity style={styles.reportContainer}>
                  <Text>Report this post</Text>
                </TouchableOpacity>
              )}

              <Border />

              {/* OTHER ITEMS FROM MEMBER */}
              <View style={styles.otherItemsTopContainer}>
                <Text>Other items by {profile.name}</Text>

                {/* SEE ALL ITEMS BUTTON */}
                <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate("SellerItemsTabs", {
                //     userId,
                //     sellerId,
                //   });
                // }}
                >
                  <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.otherItemsBottomContainer}>
                {otherItems?.map((item) => {
                  return (
                    <OtherItem
                      key={item.itemId}
                      memberId={memberId}
                      itemId={item.itemId}
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      navigation={navigation}
                    />
                  );
                })}
              </View>
            </KeyboardAwareScrollView>
          </View>
          {/* FIXED FAV AND FAV BAR */}
          <View style={styles.footerContainer}>
            <View style={styles.priceFavContainer}>
              <View>
                <TouchableOpacity
                  style={styles.heartContainer}
                  onPress={() => {
                    const action = fav ? "pull" : "push";
                    axios
                      .patch(`${helper.proxy}/activity/${action}/favourites/${memberId}/${itemId}`)
                      .then(() => {
                        setFav(!fav);
                      })
                      .catch((err) => {
                        console.error("itemDetail change fav error: ", err);
                      });
                  }}
                >
                  <Ionicons
                    name={fav ? "heart" : "heart-outline"}
                    size={30}
                    color={fav ? COLORS.primary : "black"}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: SIZES.padding * 2 }}>
                <Text>$ {item.price}</Text>
                {item.negotiable ? (
                  <TouchableOpacity>
                    <Text style={styles.makeOfferText}>Make Offer</Text>
                  </TouchableOpacity>
                ) : (
                  <Text>Non-negotiable</Text>
                )}
              </View>
            </View>

            <View>
              <TouchableOpacity style={styles.chatContainer}>
                <Text style={styles.chatText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  scrollContainer: { paddingBottom: 100 },
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
  reportContainer: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: SIZES.padding * 2,
  },
  otherItemsTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
  otherItemsBottomContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  seeAllText: {
    color: COLORS.darkgray,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding * 2,
    position: "absolute",
    bottom: 0,
    backgroundColor: COLORS.lightGray3,
    borderTopWidth: 1,
    borderTopColor: COLORS.secondary,
    width: "100%",
  },
  priceFavContainer: { flexDirection: "row" },
  heartContainer: {
    paddingRight: SIZES.padding * 2,
    borderRightWidth: 1,
    borderRightColor: COLORS.secondary,
  },
  makeOfferText: {
    color: COLORS.primary,
  },
  chatContainer: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    height: 40,
    width: 70,
  },
  chatText: {
    color: COLORS.white,
  },
});
