import React, { useState } from "react";
import { View } from "react-native";
import { AllReviews, Buyers, Sellers } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import { COLORS } from "../constants";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function ReviewsTabs({ route, navigation }) {
  const { memberId } = route.params;

  return (
    <>
      <View>
        <Header title={"Reviews"} navigation={navigation} useBackBtn={true} />
      </View>
      <MaterialTopTabs.Navigator
        tabBarOptions={{ indicatorStyle: { backgroundColor: COLORS.primary } }}
      >
        <MaterialTopTabs.Screen
          name="All"
          children={() => <AllReviews memberId={memberId} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="From buyers"
          children={() => <Buyers memberId={memberId} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="From sellers"
          children={() => <Sellers memberId={memberId} navigation={navigation} />}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
