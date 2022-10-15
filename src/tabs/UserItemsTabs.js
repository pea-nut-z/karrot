import React from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Active, Sold, Hidden } from "../screens";
import { Header } from "../UI";
import { COLORS } from "../constants";

const MaterialTopTabs = createMaterialTopTabNavigator();

export default function UserItemsTabs({ route, navigation }) {
  const { userId } = route.params;

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
    </SafeAreaView>
  );
}
