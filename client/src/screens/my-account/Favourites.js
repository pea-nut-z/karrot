import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet,Text } from "react-native";
import { Header, ItemCard, NoItemsMsg } from "../../UI";
import { COLORS } from "../../constants";
import * as helper from "../../helper";
import axios from "axios";

export default function Favourites({ navigation }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get(`${helper.proxy}/activity/read/favourites`)
      .then((doc) => {
        setItems(doc.data);
      })
      .catch((err) => console.error("get Favourites error: ", err));
  }, []);

  const removeItem = (itemId) => {
    const newItems = items.filter(item => item.itemId == itemId)
    setItems(newItems)
  }

  return (
    <SafeAreaView style={{flex:"1"}}>
      <Header title={"Favourites"} useBackBtn={true} navigation={navigation} />
      {items.length ? (items.map((item) => {
        return (
          <ItemCard
            key={item.details.items[0].itemId}
            accountInfo={item.details}
            listing={item.details.items[0]}
            atUserFavouritesScreen={true}
            navigation={navigation}
            removeItem={removeItem}
          />
        );
      })) : (
          <NoItemsMsg/>
      )}
    </SafeAreaView>
  );
}

