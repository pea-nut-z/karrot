import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as screens from "./src/screens";
import * as tabs from "./src/tabs";
import store from "./src/store/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"BottomMainTabs"}
        >
          {/* HOME */}
          {/* <Stack.Screen name="Login" component={screens.Login} /> */}
          <Stack.Screen name="BottomMainTabs" component={tabs.BottomMainTabs} />
          <Stack.Screen name="Sell" component={screens.Sell} />
          {/* CATEGORIES */}
          <Stack.Screen name="Categories" component={screens.Categories} />
          <Stack.Screen name="Category" component={screens.Category} />
          {/* CHATS */}
          <Stack.Screen name="Chats" component={screens.Chats} />
          {/* MY ACCOUNT */}
          <Stack.Screen name="MyAccount" component={screens.MyAccount} />
          <Stack.Screen name="ItemsTabs" component={tabs.ItemsTabs} />
          <Stack.Screen name="Purchases" component={screens.Purchases} />
          <Stack.Screen name="Favourites" component={screens.Favourites} />
          <Stack.Screen name="EditProfile" component={screens.EditProfile} />
          {/* SHARED */}
          <Stack.Screen name="Feedback" component={screens.Feedback} />
          <Stack.Screen name="Profile" component={screens.Profile} />
          <Stack.Screen name="ItemDetails" component={screens.ItemDetails} />
          <Stack.Screen name="Rate" component={screens.Rate} />
          <Stack.Screen name="AllReviews" component={screens.AllReviews} />
          {/* HEARDER NAVIGATE */}
          <Stack.Screen name="SearchTabs" component={tabs.SearchTabs} />
          <Stack.Screen name="Filters" component={screens.Filters} />
          <Stack.Screen name="CustomizeFeed" component={screens.CustomizeFeed} />
          <Stack.Screen name="NotificationsTabs" component={tabs.NotificationsTabs} />
          <Stack.Screen name="Report" component={screens.Report} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
