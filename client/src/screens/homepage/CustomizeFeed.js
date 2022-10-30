import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants";
import { Header } from "../../UI";
import * as helper from "../../helper";
import * as variables from "../../variables";
import axios from "axios";

export default function CustomizeFeed({ toggleFeedScreen }) {
  const [initialFeed, setInitialFeed] = useState([]);
  const [feed, setFeed] = useState([]);
  const [newFeed, setNewFeed] = useState(false);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/restrict/read/feed`)
      .then((res) => {
        const data = res.data.doc.feed;
        setInitialFeed(data);
        if (variables.categories.length != data.length) {
          setFeed(data);
        }
      })
      .catch((err) => {
        console.error("CustomizeFeed get feed error: ", err);
      });
  }, []);

  useEffect(() => {
    if (JSON.stringify(initialFeed.sort()) !== JSON.stringify(feed.sort())) {
      if (initialFeed.length == variables.categories.length && feed.length == 0) {
        setNewFeed(false);
      } else {
        setNewFeed(true);
      }
    }
  }, [feed, initialFeed]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        toggleFeedScreen={toggleFeedScreen}
        newFeed={
          !newFeed
            ? false
            : feed.length == 0
            ? variables.categories.map((value) => value.name)
            : feed
        }
        useBackBtn={true}
        title={"Customize feed"}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.header}>
          Personalized your feed.{"\n"}
          Choose the categories you want to see on the Home feed.
        </Text>
        <View style={styles.allOptionWrapper}>
          {variables.categories.map((option) => {
            const category = option.name;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => {
                  feed.includes(category)
                    ? setFeed(feed.filter((value) => value != category))
                    : setFeed([...feed, category]);
                }}
                style={styles.optionWrapper}
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
  allOptionWrapper: {
    width: "100%",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.padding,
    width: "50%",
    height: 60,
  },
});
