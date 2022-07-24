import React from "react";
import { SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AllItems, Active, Sold } from "../screens";
import { Header } from "../UI";
import { COLORS } from "../constants";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function SellerItemsTabs({ route, navigation }) {
  const { userId, sellerId } = route.params;
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
    </SafeAreaView>
  );
}
