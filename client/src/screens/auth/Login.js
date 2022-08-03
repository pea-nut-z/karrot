import React, { useEffect } from "react";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";

export default function Login({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getInitialStates());
    navigation.navigate("BottomMainTabs");
  }, []);

  return (
    <View style={{ fontSize: 40, marginTop: "50%" }}>
      <Text>LOGIN PAGE</Text>
    </View>
  );
}
