import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, TextInput, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Textarea from "react-native-textarea";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header } from "../../UI";
import { COLORS, SIZES } from "../../constants";
import * as helper from "../../helper";
import axios from "axios";

export default function Rate({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;
  const [rating, setRating] = useState(0);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");

  const submitReview = () => {
    const newReview = {
      rating,
      headline,
      review,
    };

    axios
      .post(`${helper.proxy}/review/create/${memberId}`, newReview)
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => console.error("Rate create review error: ", err));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={"Rate"}
        useRightBtns={["checkmark-done"]}
        submitFunc={submitReview}
        useBackBtn={true}
        navigation={navigation}
      />

      <KeyboardAwareScrollView>
        <View style={{ flex: 1, ...styles.container }}>
          <Text style={styles.subtitle}>Overall rating</Text>
          <View style={styles.starContainer}>
            {helper.starRatingArr.map((num) => {
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
            containerStyle={{
              height: 200,
              ...styles.inputContainer,
            }}
            onChangeText={setReview}
            placeholder={"What did you like or dislike? What did you use this product for?"}
            underlineColorAndroid={"transparent"}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
  starContainer: { flexDirection: "row", paddingVertical: SIZES.padding },
});
