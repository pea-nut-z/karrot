import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Header, ItemCards } from "../../components";
import { selectSellersAndListingsByFav } from "../../store/selectors";

export default function Favourites({ route, navigation }) {
  const { userId } = route.params;

  // USER'S FAVOURITES
  const favs = useSelector((state) =>
    selectSellersAndListingsByFav(state.favourites[userId], state.members, state.listings)
  );

  return (
    <View>
      <Header title={"Favourites"} useBackBtn={true} navigation={navigation} />
      <ItemCards
        userId={userId}
        items={favs}
        navigation={navigation}
        atUserFavouritesScreen={true}
      />
    </View>
  );
}
