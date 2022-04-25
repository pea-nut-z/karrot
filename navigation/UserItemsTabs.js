import React, { useEffect, useMemo } from "react";
import { Active, Sold, Hidden } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function UserItemsTabs({ route, navigation }) {
  const { userId } = route.params;

  return (
    <>
      <Header navigation={navigation} title={"Listings"} useBackBtn={true} />
      <MaterialTopTabs.Navigator
        screenOptions={{ tabBarIndicatorStyle: { backgroundColor: COLORS.primary } }}
      >
        <MaterialTopTabs.Screen
          name="Active"
          children={() => <Active userId={userId} atUserItemsTabs={true} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="Sold"
          children={() => <Sold userId={userId} atUserItemsTabs={true} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="Hidden"
          children={() => <Hidden userId={userId} navigation={navigation} atUserItemsTabs={true} />}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
