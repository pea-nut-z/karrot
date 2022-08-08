import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { icons, COLORS, SIZES } from "../constants";
import axios from "axios";
import * as helper from "../helper";
import ItemDetails from "../screens/ItemDetails";

export default function MemberRating({ memberId, atItemDetails }) {
  const [average, setAverage] = useState();
  const [numOfReviewsState, setNumOfReviewsState] = useState();
  const [numerOfStars] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/review/${memberId}`)
      .then((res) => {
        const { totalRating, numOfReviews } = res.data.review;
        const ratingAverage = totalRating / numOfReviews;
        setAverage(ratingAverage);
        setNumOfReviewsState(numOfReviews);
      })
      .catch((err) => console.log("MemeberRating page review error: ", err));
  }, []);

  return (
    <View style={styles.outterContainer}>
      {/* <NUM OF REVIEWS */}
      <Text>
        {numOfReviewsState} Review{numOfReviewsState > 1 && "s"}
      </Text>

      <View style={styles.iconContainer}>
        {/* STARS */}
        <View style={styles.starContainer}>
          {numerOfStars.map((num) => {
            return (
              <Ionicons
                key={num}
                name={average >= num ? "star" : "star-outline"}
                size={atItemDetails ? 25 : 35}
                color={COLORS.primary}
              />
            );
          })}
        </View>

        {/*  EMOJI */}
        <Image
          source={average <= 2 ? icons.unamused : average >= 4 ? icons.excited : icons.happy}
          resizeMode="contain"
          style={styles.emoji(ItemDetails)}
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
