import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { categoryOptions, COLORS, FONTS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actionTypes";
import { Header, ModalAlert } from "../../components";

export default function CustomizeFeed({ route, navigation }) {
  const { userId } = route.params;

  const [alert, setAlert] = useState(false);

  const feed = useSelector((state) => state.feeds[userId]);
  const dispatch = useDispatch();

  const closeModal = () => {
    setAlert(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header navigation={navigation} useBackBtn={true} title={"Customize feed"} />
      <View
        style={{
          paddingHorizontal: SIZES.padding * 2,
          paddingVertical: SIZES.padding,
          flex: 1,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            // ...FONTS.body3,
            fontWeight: "bold",
            paddingVertical: SIZES.padding,
          }}
        >
          Personalized your feed.{"\n"}
          Choose the categories you want to see on the Home feed.
        </Text>
        <Text
          style={{
            // ...FONTS.body4,
            textAlign: "center",
            paddingVertical: SIZES.padding,
          }}
        >
          At least one category must be chosen
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {categoryOptions.map((option, index) => {
            return (
              <TouchableOpacity
                key={`option-${index}`}
                onPress={() => {
                  if (feed.includes(option.name) && feed.length === 1) {
                    setAlert(true);
                  } else {
                    dispatch({
                      type: feed.includes(option.name) ? actions.FEED_REMOVED : actions.FEED_ADDED,
                      userId,
                      feed: option.name,
                    });
                  }
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: SIZES.padding,
                  width: "50%",
                  height: 60,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={feed.includes(option.name) ? COLORS.primary : COLORS.secondary}
                />
                <Text style={{ marginLeft: SIZES.padding }}>
                  {option.name.includes("Games") ? `Games,hobbies & ${"\n"}crafts` : option.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <ModalAlert
        visibleVariable={alert}
        closeModal={closeModal}
        // onClickOption={onClickOption}
        message={"You must select at least one category"}
      />
    </View>
  );
}
