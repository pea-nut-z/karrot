import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { icons, COLORS, SIZES } from "../constants";
import * as helper from "../helper";

export default function MemberRating({ average, numOfReviews, atItemDetails }) {
  const [rating, setRating] = useState();
  const [reviewCount, setReviewCount] = useState();

  useEffect(() => {
    setRating(average);
    setReviewCount(numOfReviews);
  }, [average, numOfReviews]);

  return (
    <View style={styles.outterContainer}>
      {/* <NUM OF REVIEWS */}
      <Text>
        {reviewCount} Review{reviewCount > 1 && "s"}
      </Text>

      <View style={styles.iconContainer}>
        {/* STARS */}
        <View style={styles.starContainer}>
          {helper.starRatingArr.map((num) => {
            return (
              <Ionicons
                key={num}
                name={rating >= num ? "star" : "star-outline"}
                size={atItemDetails ? 25 : 35}
                color={COLORS.primary}
              />
            );
          })}
        </View>

        {/*  EMOJI */}
        <Image
          source={rating <= 2 ? icons.unamused : rating >= 4 ? icons.excited : icons.happy}
          resizeMode="contain"
          style={styles.emoji(atItemDetails)}
        />
      </View>

      {/* TOOLTIP */}
      {/* <Tooltip
        popover={
          <Text style={{ color: COLORS.white }}>
            The review rating is calculated by using an average.
          </Text>
        }
        backgroundColor={COLORS.primary}
        containerStyle={{ flexDirection: "row" }}
        withOverlay={false}
        width={150}
        height={80}
      >
        <View
          style={{
            marginTop: SIZES.padding / 2,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ textDecorationLine: "underline" }}>ShopApp Rating</Text>
          <Text> ⓘ</Text>
        </View>
      </Tooltip> */}
    </View>
  );
}

const styles = StyleSheet.create({
  outterContainer: {
    alignItems: "flex-end",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
  },
  emoji: (atItemDetails) => ({
    height: atItemDetails ? 25 : 35,
    width: atItemDetails ? 25 : 35,
    marginLeft: SIZES.padding / 2,
  }),
});
