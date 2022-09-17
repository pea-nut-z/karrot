import React, { useMemo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, COLORS, FONTS } from "../../constants";

export default function User({ userId, navigation, submittedSearchString }) {
  // const focused = useIsFocused();
  // const getMembers = useMemo(filterMembers, []);
  // const members = useSelector((state) => {
  //   if (focused && submittedSearchString) {
  //     return getMembers(state, "string", submittedSearchString);
  //   }
  // });

  // const renderMemberCards = () => {
  //   if (focused && submittedSearchString && members) {
  //     return members.map((member, index) => {
  //       return (
  //         <TouchableOpacity
  //           key={`member-${index}`}
  //           onPress={() =>
  //             navigation.navigate("Profile", {
  //               sellerId: parseInt(member.memberId),
  //               userId,
  //             })
  //           }
  //           style={styles.cardContainer}
  //         >
  //           <View>
  //             {member.displayPic !== "N/A" ? (
  //               <Image source={{ uri: member.displayPic }} resizeMode={"contain"} />
  //             ) : (
  //               <Ionicons name={"person-circle-outline"} size={60} color={COLORS.secondary} />
  //             )}
  //           </View>
  //           <View>
  //             <Text style={styles.cardText}>
  //               {member.username} #{member.memberId}
  //             </Text>
  //             <Text style={styles.cardText}>{member.location}</Text>
  //           </View>
  //         </TouchableOpacity>
  //       );
  //     });
  //   }
  // };

  // const renderNoResultsMsg = () => {
  //   if (focused && submittedSearchString && !members) {
  //     return (
  //       <View
  //         style={{
  //           alignItems: "center",
  //           paddingVertical: SIZES.padding,
  //           paddingHorizontal: SIZES.padding * 2,
  //         }}
  //       >
  //         <Text style={styles.boldText}>No results</Text>
  //         <View style={styles.noResultContainer}>
  //           <Text style={styles.boldText}>Tips</Text>
  //           <Text style={styles.regularText}>
  //             •Search by name.{"\n"}
  //             •Or search by User ID(the number following the hashtag # in the profile page).{"\n"}
  //             E.g. ShopApp #1314
  //           </Text>
  //         </View>
  //       </View>
  //     );
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* {renderNoResultsMsg()}
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        {renderMemberCards()}
      </KeyboardAwareScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  boldText: {
    // ...FONTS.h4,
    paddingVertical: SIZES.padding,
  },
  regularText: {
    // ...FONTS.body4,
    paddingVertical: SIZES.padding,
  },
  noResultContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  img: {
    width: 105,
    height: 105,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.secondary,
  },
  cardText: {
    // ...FONTS.body4,
    paddingHorizontal: SIZES.padding * 2,
  },
});
