import React, { useRef, useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllItems, Active, Sold } from "../screens";
import { Header } from "../UI";
import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function SellerItemsTabs({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;

  const [profile, setProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${helper.proxy}/listing/read/items?memberId=${memberId}`)
      .then((res) => {
        setProfile(res.data.profile);
        setActiveItems(res.data.listings["Active"]);
        setSoldItems(res.data.listings["Sold"]);
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
      <MaterialTopTabs.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="All"
          children={() => (
            <AllItems
              accountInfo={profile}
              activeData={activeItems}
              soldData={soldItems}
              navigation={navigation}
            />
          )}
        />

        <MaterialTopTabs.Screen
          name="Active"
          children={() => (
            <Active accountInfo={profile} activeData={activeItems} navigation={navigation} />
          )}
        />
        <MaterialTopTabs.Screen
          name="Sold"
          children={() => (
            <Sold accountInfo={profile} soldData={soldItems} navigation={navigation} />
          )}
        />
      </MaterialTopTabs.Navigator>
    </SafeAreaView>
  );
}
