import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header, ItemStatusTab } from "../UI";

import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = MaterialTopTabs;

export default function MyItemsTabs({ navigation }) {
  const [profile, setProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/read/items`)
      .then((res) => {
        const { profile, listings } = res.data;
        const active = listings["Active"] || [];
        const sold = listings["Sold"] || [];
        const hidden = listings["Hidden"] || [];
        setProfile(profile);
        setActiveItems(active);
        setSoldItems(sold);
        setHiddenItems(hidden);
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
      <Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      >
        <Screen
          name="Active"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={activeItems}
              message={"No Active items"}
              navigation={navigation}
            />
          )}
        />
        <Screen
          name="Sold"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={soldItems}
              message={"No sold items"}
              navigation={navigation}
            />
          )}
        />
        <Screen
          name="Hidden"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={hiddenItems}
              message={"No hidden items"}
              navigation={navigation}
            />
          )}
        />
      </Navigator>
    </SafeAreaView>
  );
}
