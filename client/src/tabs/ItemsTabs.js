import React, { useEffect, useRef, useReducer } from "react";
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
};

const itemsReducer = (state, action) => {
  const { type, fromStatus, toStatus, itemId, newState } = action;

  switch (type) {
    case "set":
      return {
        ...state,
        ...newState,
      };
    case "update":
      const item = state[fromStatus].filter((profile) => profile.items.itemId == itemId);
      item[0]["items"]["status"] = toStatus;
      axios
        .patch(`${helper.proxy}/my-item/update/${itemId}`, { status: toStatus })
        .catch((err) => console.error("itemsTabs update error: ", err));
      return {
        ...state,
        [fromStatus]: state[fromStatus].filter((profile) => profile.items.itemId != itemId),
        [toStatus]: [...state[toStatus], ...item],
      };
    case "delete":
      axios
        .delete(`${helper.proxy}/my-item/delete/${itemId}`)
        .catch((err) => console.error("itemsTabs delete error: ", err));
      return {
        ...state,
        [fromStatus]: state[fromStatus].filter((profile) => profile.items.itemId != itemId),
      };
    default:
      throw new Error(`Item Tabs-> uncaught item reducer type: ${type}`);
  }
};

export default function ItemsTabs({ route, navigation }) {
  const atMyProfile = useRef(route.params.atMyProfile).current;
  const [items, itemDispatch] = useReducer(itemsReducer, initialItems);

  useEffect(() => {
    const memberId = route.params.memberId;
    const IDquery = !atMyProfile ? "?memberId=" + memberId : "";

    axios
      .get(`${helper.proxy}/listing/read/items${IDquery}`)
      .then((res) => {
        itemDispatch({ type: "set", newState: res.data.docs });
      })
      .catch((err) => console.error("itemsTabs get listings error: ", err));
  }, []);

  class ChangeItemStatus {
    update(fromStatus, toStatus, itemId) {
      itemDispatch({ type: "update", fromStatus, toStatus, itemId });
    }
    delete(fromStatus, itemId) {
      itemDispatch({ type: "delete", fromStatus, itemId });
    }
  }

  const changeItemStatus = new ChangeItemStatus();

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
                items={[...items.Active, ...items.Sold]}
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
              items={items.Active}
              message={"No active items"}
              navigation={navigation}
              changeItemStatus={atMyProfile ? changeItemStatus : null}
            />
          )}
        />
        <Screen
          name="Sold"
          children={() => (
            <ItemStatusTab
              items={items.Sold}
              message={"No sold items"}
              navigation={navigation}
              changeItemStatus={atMyProfile ? changeItemStatus : null}
            />
          )}
        />
        {atMyProfile && (
          <Screen
            name="Hidden"
            children={() => (
              <ItemStatusTab
                items={items.Hidden}
                message={"No hidden items"}
                navigation={navigation}
                changeItemStatus={changeItemStatus}
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
