import React from "react";
import { View } from "react-native";
import { Activity, SearchAlerts } from "../screens";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header } from "../components";
import { COLORS } from "../constants";
const MaterialTopTabs = createMaterialTopTabNavigator();

export default function NotificationsTabs({ route, navigation }) {
  const { userId } = route.params;

  return (
    <>
      <View>
        <Header
          title={"Notifications"}
          navigation={navigation}
          useBackBtn={true}
          useRightBtns={["pencil-outline", "trash-outline"]}
        />
      </View>
      <MaterialTopTabs.Navigator
        tabBarOptions={{ indicatorStyle: { backgroundColor: COLORS.primary } }}
      >
        <MaterialTopTabs.Screen
          name="Activity"
          children={() => <Activity userId={userId} navigation={navigation} />}
        />
        <MaterialTopTabs.Screen
          name="Search alerts"
          children={() => <SearchAlerts userId={userId} navigation={navigation} />}
        />
      </MaterialTopTabs.Navigator>
    </>
  );
}
