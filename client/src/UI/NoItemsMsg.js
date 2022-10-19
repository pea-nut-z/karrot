import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants";

export default function NoItemsMsg({ message }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: COLORS.secondary,
  },
});
