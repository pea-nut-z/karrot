import React from "react";
import { AllItems, Active, Sold } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import { COLORS } from "../constants";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function SellerItemsTabs({ route, navigation }) {
  const { userId, sellerId } = route.params;
  return (
    <>
      <Header navigation={navigation} title={"Items"} useBackBtn={true} />
      <MaterialTopTabs.Navigator
        tabBarOptions={{ indicatorStyle: { backgroundColor: COLORS.primary } }}
      >
        <MaterialTopTabs.Screen
          name="All"
          children={() => (
            <AllItems
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />

        <MaterialTopTabs.Screen
          name="Active"
          children={() => (
            <Active
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />
        <MaterialTopTabs.Screen
          name="Sold"
          children={() => (
            <Sold
              userId={userId}
              sellerId={sellerId}
              atUserItemsTabs={false}
              navigation={navigation}
            />
          )}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
