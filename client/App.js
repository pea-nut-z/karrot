import * as React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  Sell,
  ItemDetails,
  Categories,
  Category,
  Chats,
  MyAccount,
  Purchases,
  Favourites,
  Filters,
  CustomizeFeed,
  Profile,
  EditProfile,
  Rate,
  Feedback,
  Report,
  AllReviews,
} from "./src/screens/";
import {
  BottomMainTabs,
  SellerItemsTabs,
  UserItemsTabs,
  SearchTabs,
  NotificationsTabs,
  // ReviewsTabs,
} from "./src/tabs";
import store from "./src/store/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AuthProvider> */}
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"BottomMainTabs"}
        >
          {/* HOME */}
          <Stack.Screen name="BottomMainTabs" component={BottomMainTabs} />
          <Stack.Screen name="Sell" component={Sell} />
          <Stack.Screen name="SellerItemsTabs" component={SellerItemsTabs} />
          {/* CATEGORIES */}
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Category" component={Category} />
          {/* CHATS */}
          <Stack.Screen name="Chats" component={Chats} />
          {/* MY ACCOUNT */}
          <Stack.Screen name="MyAccount" component={MyAccount} />
          <Stack.Screen name="UserItemsTabs" component={UserItemsTabs} />
          <Stack.Screen name="Purchases" component={Purchases} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          {/* SHARED */}
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="Rate" component={Rate} />
          <Stack.Screen name="AllReviews" component={AllReviews} />
          {/* HEARDER NAVIGATE */}
          <Stack.Screen name="SearchTabs" component={SearchTabs} />
          <Stack.Screen name="Filters" component={Filters} />
          <Stack.Screen name="CustomizeFeed" component={CustomizeFeed} />
          <Stack.Screen name="NotificationsTabs" component={NotificationsTabs} />
          <Stack.Screen name="Report" component={Report} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
