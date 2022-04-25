import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Textarea from "react-native-textarea";
import { useDispatch } from "react-redux";
import { Header } from "../../components";
import { COLORS, SIZES } from "../../constants";
import { useSelector } from "react-redux";
import * as actions from "../../store/actionTypes";

export default function Rate({ route, navigation }) {
  const { userId, sellerId } = route.params;

  const numOfStars = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");

  const dispatch = useDispatch();

  const submitReview = () => {
    dispatch({
      type: actions.REVIEW_ADDED,
      memberId: sellerId,
      reviewerId: userId,
      payload: {
        rating,
        headline,
        review,
      },
    });

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title={"Rate"}
        useRightBtns={["checkmark-done"]}
        submitFunc={submitReview}
        useBackBtn={true}
        navigation={navigation}
      />
      <View style={{ flex: 1, ...styles.container }}>
        <Text style={styles.subtitle}>Overall rating</Text>
        <View style={{ flexDirection: "row", paddingVertical: SIZES.padding }}>
          {numOfStars.map((num) => {
            return num <= rating ? (
              <TouchableOpacity key={num} onPress={() => setRating(num)}>
                <Ionicons name={"star"} size={40} color={COLORS.primary} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity key={num} onPress={() => setRating(num)}>
                <Ionicons name={"star-outline"} size={40} color={COLORS.primary} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* HEADLINE */}
      <View style={{ flex: 1, ...styles.container }}>
        <Text style={styles.subtitle}>Add a headline</Text>
        <TextInput
          maxLength={64}
          onChangeText={setHeadline}
          placeholder="What's most important to know?"
          style={{
            height: 40,
            ...styles.inputContainer,
          }}
        />
      </View>

      {/* REVIEW */}
      <View style={{ flex: 7, ...styles.container }}>
        <Text style={styles.subtitle}>Add a written review</Text>
        <Textarea
          style={{
            height: 200,
            ...styles.inputContainer,
          }}
          onChangeText={setReview}
          placeholder={"What did you like or dislike? What did you use this product for?"}
          underlineColorAndroid={"transparent"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    borderRadius: 3,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
