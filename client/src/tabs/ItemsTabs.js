import React, { useState, useEffect, useRef, useReducer } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Header, ItemStatusTab } from "../UI";
import { COLORS } from "../constants";
import * as helper from "../helper";
import axios from "axios";

const MaterialTopTabs = createMaterialTopTabNavigator();
const { Navigator, Screen } = MaterialTopTabs;

const initialItems = {
  Active: [],
  Sold: [],
  Hidden: [],
}

const itemsReducer =(state, action)=> {
  const { type, fromStatus, toStatus, itemId, newState } = action
  
  switch (type) {
    case "set":
      return ({
        ...state, ...newState
      })
    case "update":
      const item = state[fromStatus].filter(item => item.itemId == itemId)
      item[0]['status'] = toStatus
  return ({
        ...state,
        [fromStatus]: state[fromStatus].filter(item=>item.itemId != itemId),
        [toStatus]: [...state[toStatus], ...item]
      });
    default:
      throw new Error();
  }
}

export default function ItemsTabs({ route, navigation }) {
  const atMyProfile = useRef(route.params.atMyProfile).current;
  const [profile, setProfile] = useState({});
  const [items, itemDispatch] = useReducer(itemsReducer,initialItems)

  useEffect(() => {
    const memberId = route.params.memberId;
    const IDquery = !atMyProfile ? "?memberId=" + memberId : "";

    const unsubscribe = navigation.addListener("focus", () => {
      axios
        .get(`${helper.proxy}/listing/read/items${IDquery}`)
        .then((res) => {
          const { profile, listings } = res.data;
          setProfile(profile);
          itemDispatch({type:'set',newState:listings})
        })
        .catch((err) => console.error("itemsTabs get listings error: ", err));
    });

    return unsubscribe;
  }, []);

  const updateItemStatus = (fromStatus, toStatus, itemId) => {
    itemDispatch({type:"update", fromStatus,toStatus,itemId})
  }

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
                listings={[...items.Active, ...items.Sold]}
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
              listings={items.Active}
              message={"No active items"}
              navigation={navigation}
              updateItemStatus={atMyProfile? updateItemStatus : null}
            />
          )}
        />
        <Screen
          name="Sold"
          children={() => (
            <ItemStatusTab
              accountInfo={profile}
              listings={items.Sold}
              message={"No sold items"}
              navigation={navigation}
              updateItemStatus={atMyProfile? updateItemStatus : null}
            />
          )}
        />
        {atMyProfile && (
          <Screen
            name="Hidden"
            children={() => (
              <ItemStatusTab
                accountInfo={profile}
                listings={items.Hidden}
                message={"No hidden items"}
                navigation={navigation}
                updateItemStatus={updateItemStatus}
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
