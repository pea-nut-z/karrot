import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllItems, Active, Sold } from "../screens";
import { Header, ItemStatusTab } from "../UI";
import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = MaterialTopTabs;

export default function SellerItemsTabs({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;

  const [profile, setProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/read/items?memberId=${memberId}`)
      .then((res) => {
        const { profile, listings } = res.data;
        const active = listings["Active"] || [];
        const sold = listings["Sold"] || [];
        setProfile(profile);
        setActiveItems(active);
        setSoldItems(sold);
        setAllItems([...active, ...sold]);
      })
      .catch((err) => console.error("MyItemsTabs get listings error: ", err));
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Header navigation={navigation} title={"Items"} useBackBtn={true} />
      <Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      >
        <Screen
          name="All"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={allItems}
              message={"No listings"}
              navigation={navigation}
            />
          )}
        />

        <Screen
          name="Active"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={activeItems}
              message={"No active items"}
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
      </Navigator>
    </SafeAreaView>
  );
}
