import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { Header } from "../../UI";
import * as helper from "../../helper";
import * as variables from "../../variables";
import axios from "axios";

export default function CustomizeFeed({ navigation }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/restrict/read/feed`)
      .then((res) => {
        if (variables.categories.length != res.data.doc.feed.length) {
          setFeed(res.data.doc.feed);
        }
      })
      .catch((err) => {
        console.error("CustomizeFeed get feed error: ", err);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} useBackBtn={true} title={"Customize feed"} />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>
          Personalized your feed.{"\n"}
          Choose the categories you want to see on the Home feed.
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {variables.categories.map((option) => {
            const category = option.name;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  let values;
                  if (feed.includes(category)) {
                    values = feed.filter((value) => value != category);
                  } else {
                    values = [...feed, category];
                  }

                  setFeed(values);

                  if (feed.length == 1 && feed.includes(category)) {
                    values = variables.categories.map((value) => value.name);
                  }

                  axios.post(`${helper.proxy}/restrict/update/feed`, { values }).catch((err) => {
                    console.error("CustomizeFeed update feed error: ", err);
                  });
                }}
                style={styles.selectionWrapper}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={feed.includes(category) ? COLORS.primary : COLORS.secondary}
                />
                <Text style={{ marginLeft: SIZES.padding }}>
                  {category.includes("Games") ? `Games,hobbies & ${"\n"}crafts` : category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: SIZES.padding,
  },
  selectionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    width: "50%",
    height: 60,
  },
});
