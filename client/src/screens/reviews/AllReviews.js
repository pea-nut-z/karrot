import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header, MemberInfo } from "../../UI";
import * as helper from "../../helper";
import { COLORS, SIZES } from "../../constants";
import axios from "axios";

export default function AllReviews({ route, navigation }) {
  // const { userId, memberId } = route.params;
  // const reviewCount = useSelector((state) => state["reviews"][memberId]["reviewers"].length);
  // const reviews = useSelector((state) => state["reviews"][sellerId]);
  // const reviews = useSelector((state) =>
  //   selectReviews(state["reviews"][memberId]["reviews"], state.members)
  // );
  // const numOfStars = [1, 2, 3, 4, 5];
  const [numOfReviews, setNumOfReviews] = useState();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const memberId = route.params.memberId;
    axios
      .get(`${helper.proxy}/review/read/${memberId}`)
      .then((res) => {
        setNumOfReviews(res.doc.numOfReviews);
        setReviews(res.doc.reviews);
      })
      .catch((err) => console.error("get AllReviews error: ", err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Reviews"} useBackBtn={true} navigation={navigation} />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding * 2,
        }}
      >
        {numOfReviews ? numOfReviews : 0} review{numOfReviews > 1 ? "s" : null}
      </Text>
      <ScrollView style={{ flex: 1 }}>
        {reviews.map((reviewer, index) => {
          return (
            <TouchableOpacity
              key={index}
              // onPress={() => navigation.push("Profile", { userId, sellerId: reviewer.reviewerId })}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: SIZES.padding * 2,
                paddingVertical: SIZES.padding,
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
              }}
            >
              <View style={{ paddingRight: SIZES.padding * 6 }}>
                <MemberInfo
                  picture={reviewer.displayPic}
                  name={reviewer.name}
                  atItemDetails={true}
                />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: SIZES.padding,
                  }}
                >
                  {helper.starRatingArr.map((num) => {
                    return num <= reviewer.rating ? (
                      <View key={num}>
                        <Ionicons name={"star"} size={20} color={COLORS.primary} />
                      </View>
                    ) : (
                      <View key={num}>
                        <Ionicons name={"star-outline"} size={20} color={COLORS.primary} />
                      </View>
                    );
                  })}
                  <Text style={{ marginTop: 4, marginLeft: SIZES.padding }}>
                    {helper.timeSince(reviewer.date)}
                  </Text>
                </View>

                <Text>{reviewer.headline}</Text>
                <Text>{reviewer.review}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
