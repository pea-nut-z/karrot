import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, ItemCard, NoItemsMsg } from "../../UI";
import * as helper from "../../helper";
import axios from "axios";

export default function Favourites({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/activity/read/favourites`)
      .then((res) => {
        setItems(res.data.docs);
      })
      .catch((err) => console.error("get Favourites error: ", err));
  }, []);

  const removeFav = (itemId) => {
    const newItems = items.filter((item) => item.items.itemId != itemId);
    setItems(newItems);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"Favourites"} useBackBtn={true} navigation={navigation} />
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
                removeFav={removeFav}
              />
            );
          })}
        </KeyboardAwareScrollView>
      ) : (
        <NoItemsMsg message={"No Items"} />
      )}
    </SafeAreaView>
  );
}
