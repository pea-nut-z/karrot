import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Header, ItemCard } from "../../UI";
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

  return (
    <SafeAreaView>
      <Header title={"Favourites"} useBackBtn={true} navigation={navigation} />
      {items.map((item) => {
        return (
          <ItemCard
            key={item.details.items[0].itemId}
            accountInfo={item.details}
            listing={item.details.items[0]}
            atUserFavouritesScreen={true}
            navigation={navigation}
          />
        );
      })}
    </SafeAreaView>
  );
}
