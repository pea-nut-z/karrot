import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Image,
  SafeAreaView,
} from "react-native";
import { Header, MemberRating } from "../../components";
export default function Feedback({ route, navigation }) {
  const { userId } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Header title={"Feedback"} navigation={navigation} useBackBtn={true} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <MemberRating rating={60} />
          <Text>Positive Feedback</Text>
        </View>
        <Text>No positive feedback yet</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <MemberRating rating={19} />
          <Text>Disapprovals</Text>
        </View>
        <Text>Yay! You haven't receieved any disapprovals.</Text>
      </View>
    </View>
  );
}
