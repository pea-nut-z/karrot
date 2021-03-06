import React from "react";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { Header, ItemCards } from "../../UI";
import { selectSellersAndListingsByFav } from "../../store/selectors";

export default function Favourites({ route, navigation }) {
  const { userId } = route.params;

  // USER'S FAVOURITES
  const favs = useSelector((state) =>
    selectSellersAndListingsByFav(state.favourites[userId], state.members, state.listings)
  );

  return (
    <SafeAreaView>
      <Header title={"Favourites"} useBackBtn={true} navigation={navigation} />
      <ItemCards
        userId={userId}
        items={favs}
        navigation={navigation}
        atUserFavouritesScreen={true}
      />
    </SafeAreaView>
  );
}
