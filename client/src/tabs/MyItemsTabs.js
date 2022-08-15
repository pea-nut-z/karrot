import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Active, Sold, Hidden } from "../screens";
import { Header } from "../UI";
import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function MyItemsTabs({ navigation }) {
  const [accountInfo, setAccountInfo] = useState();
  const [listings, setListings] = useState();

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/read/items`)
      .then((res) => {
        setAccountInfo(res.data.profile);
        setListings(res.data.items);
      })
      .catch((err) => console.error("MyItemsTabs get listings error: ", err));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header navigation={navigation} title={"Listings"} useBackBtn={true} />
      <MaterialTopTabs.Navigator
        screenOptions={{ tabBarIndicatorStyle: { backgroundColor: COLORS.primary } }}
      >
        <MaterialTopTabs.Screen
          name="Active"
          children={() => <Active atMyItemsTabs={true} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="Sold"
          children={() => <Sold atMyItemsTabs={true} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="Hidden"
          children={() => <Hidden atMyItemsTabs={true} navigation={navigation} />}
        />
      </MaterialTopTabs.Navigator>
    </SafeAreaView>
  );
}
