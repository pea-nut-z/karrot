// import React, { useState } from "react";
// import { View, Button, Text, TextInput, StyleSheet } from "react-native";
// import { COLORS, SIZES } from "../../constants";
// import { useAuth } from "../../AuthContext";

// export default function Login({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login, currentUser } = useAuth();

//   const onLogin = () => {
//     setError("");
//     setLoading(true);
//     login(email, password)
//       .then(() => {
//         setError("");
//         setLoading(false);
//         navigation.navigate("Home");
//       })
//       .catch(() => {
//         setError("Authentication failed");
//         setLoading(false);
//       });
//   };

//   const renderButtonOrLoading = () => {
//     if (loading) {
//       return <Text>Loading</Text>;
//     }
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           justifyContent: "space-evenly",
//           paddingVertical: SIZES.padding,
//         }}
//       >
//         <Button color={COLORS.primary} onPress={() => onLogin()} title="Log In" />
//         <Button
//           color={COLORS.primary}
//           onPress={() => navigation.navigate("Signup")}
//           title="Sign Up"
//         />
//       </View>
//     );
//   };
//   return (
//     <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: SIZES.padding * 2 }}>
//       <View style={{ alignItems: "center", paddingVertical: SIZES.padding }}>
//         <Text
//           style={{
//             fontWeight: "bold",
//             fontSize: 20,
//             paddingVertical: SIZES.padding,
//           }}
//         >
//           Marketplace
//         </Text>
//       </View>

//       <View>
//         <Text style={styles.label}>Email:</Text>
//         <TextInput defaultValue={email} onChangeText={setEmail} style={styles.input} />
//         <Text style={styles.label}>Password:</Text>
//         <TextInput
//           secureTextEntry={true}
//           defaultValue={password}
//           onChangeText={setPassword}
//           style={styles.input}
//         />
//       </View>

//       {renderButtonOrLoading()}
//       <Text>{error}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   label: {
//     fontWeight: "bold",
//     paddingVertical: SIZES.padding,
//   },
//   input: {
//     paddingVertical: SIZES.padding,
//     paddingHorizontal: SIZES.padding * 2,
//     borderWidth: 1,
//     borderColor: COLORS.secondary,
//     borderRadius: 5,
//   },
// });
