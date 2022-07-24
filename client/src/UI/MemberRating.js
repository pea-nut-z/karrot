import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import { icons, COLORS, SIZES } from "../constants";

export default function MemberRating({ memberId, atItemDetails }) {
  //  MEMBER RATING INFO
  const totalRating = useSelector((state) => state["reviews"][memberId]["total"]);
  const numOfReviews = useSelector((state) => state["reviews"][memberId]["reviewers"].length);
  const numerOfStars = [1, 2, 3, 4, 5];
  const [average, setAverage] = useState();

  useEffect(() => {
    const ratingAverage = totalRating / numOfReviews;
    setAverage(ratingAverage);
  }, [totalRating, numOfReviews]);

  return (
    <View
      style={{
        alignItems: "flex-end",
      }}
    >
      {/* <NUM OF REVIEWS */}
      <Text>
        {numOfReviews} Review{numOfReviews > 1 && "s"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* STARS */}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          {numerOfStars.map((num, index) => {
            return (
              <Ionicons
                key={`star-${index}`}
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
          style={{
            height: atItemDetails ? 25 : 35,
            width: atItemDetails ? 25 : 35,
            marginLeft: SIZES.padding / 2,
          }}
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
