import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header, MemberInfo } from "../../UI";
import * as helper from "../../helper";
import { COLORS, SIZES } from "../../constants";
import axios from "axios";

export default function AllReviews({ route, navigation }) {
  const [numOfReviews, setNumOfReviews] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    const memberId = route.params.memberId;
    axios
      .get(`${helper.proxy}/review/read/${memberId}`)
      .then((res) => {
        setNumOfReviews(res.data.numOfReviews);
        setReviews(res.data.reviews);
      })
      .catch((err) => console.error("get AllReviews error: ", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Reviews"} useBackBtn={true} navigation={navigation} />
      <Text style={styles.numOfReviewsText}>
        {numOfReviews ? numOfReviews : 0} review{numOfReviews > 1 ? "s" : null}
      </Text>
      <ScrollView style={styles.container}>
        {reviews &&
          reviews.map((reviewer) => {
            return (
              <TouchableOpacity
                key={reviewer.reviewBy}
                onPress={() => navigation.push("Profile", { memberId: reviewer.reviewBy })}
                style={styles.reviewOutterContainer}
              >
                <View style={styles.memberInfoContainer}>
                  <MemberInfo
                    picture={reviewer.profile[0].image}
                    name={reviewer.profile[0].name}
                    atItemDetails={true}
                  />
                </View>
                <View>
                  <View style={styles.reviewInnerContainer}>
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
                    <Text style={styles.timeSinceText}>{helper.timeSince(reviewer.date)}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1 },
  numOfReviewsText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
  },
  reviewOutterContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderBottomColor: COLORS.secondary,
    borderBottomWidth: 1,
  },
  memberInfoContainer: { paddingRight: SIZES.padding * 6 },
  reviewInnerContainer: {
    flexDirection: "row",
    paddingVertical: SIZES.padding,
  },
  timeSinceText: { marginTop: 4, marginLeft: SIZES.padding },
});
