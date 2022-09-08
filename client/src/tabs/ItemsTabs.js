import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header, ItemStatusTab } from "../UI";
import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = MaterialTopTabs;

export default function ItemsTabs({ route, navigation }) {
  const memberId = useRef(route.params.memberId).current;
  const atMyProfile = useRef(route.params.atMyProfile).current;

  const [profile, setProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    const IDquery = !atMyProfile ? "?memberId=" + memberId : null;
    axios
      .get(`${helper.proxy}/listing/read/items${IDquery}`)
      .then((res) => {
        const { profile, listings } = res.data;
        const active = listings["Active"] || [];
        const sold = listings["Sold"] || [];
        if (atMyProfile) {
          const hidden = listings["Hidden"] || [];
          setHiddenItems(hidden);
        } else {
          setAllItems([...active, ...sold]);
        }
        setProfile(profile);
        setActiveItems(active);
        setSoldItems(sold);
      })
      .catch((err) => console.error("itemsTabs get listings error: ", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} title={"Listings"} useBackBtn={true} />
      <Navigator
        screenOptions={{
          tabBarIndicatorStyle: styles.tabBar,
        }}
      >
        {!atMyProfile && (
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
        )}
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
        {atMyProfile && (
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
        )}
      </Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: COLORS.primary,
  },
});
