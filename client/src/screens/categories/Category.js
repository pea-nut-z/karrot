import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Header, NoItemsMsg, ItemCard } from "../../UI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as helper from "../../helper";
import axios from "axios";

export default function Category({ route, navigation }) {
  const { category } = route.params;
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/filter/category?value=${category}`)
      .then((res) => {
        setItems(res.data.docs);
      })
      .catch((err) => console.error("Category fetch error: ", err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        title={category}
        useBackBtn={true}
        useRightBtns={["search-outline", "notifications-outline"]}
      />
      <View style={{ flex: 1 }}>
        {items.length ? (
          <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
            {items.map((profile) => {
              return (
                <ItemCard
                  key={profile.items.itemId}
                  profile={profile}
                  item={profile.items}
                  image={profile.items.images[0]}
                  navigation={navigation}
                />
              );
            })}
          </KeyboardAwareScrollView>
        ) : (
          <NoItemsMsg message={"Oops, no listings under this category."} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
