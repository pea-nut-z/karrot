import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SIZES, COLORS, viewOptions, locationOptions, infoOptions } from "../../constants";
import { Header, CircleButton, FlatButtons, MemberInfo } from "../../UI";

export default function MyAccount({ navigation }) {
  const profile = useSelector((state) => state.myProfile);
  const flatBtnOptions = locationOptions.concat(infoOptions);
  const navigateTo = (option) => {
    return;
  };

  const renderCamerabtn = () => {
    return (
      <View style={styles.cameraBtnContainer}>
        <MemberInfo
          picture={profile.image}
          name={profile.name}
          location={profile.location}
          id={profile.id}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.cameraBtn}
        >
          <Ionicons name={"camera"} size={25} color={COLORS.darkgray} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title={"My Account"} useRightBtns={["settings-outline"]} />
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        {/* CAMERA BUTTON */}
        <View>{renderCamerabtn()}</View>

        {/* VIEW PROFILE BUTTON */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              sellerId: profile.id,
              userId: profile.id,
            })
          }
          style={styles.margin}
        >
          <View style={styles.viewProfileButton}>
            <Text>View profile</Text>
          </View>
        </TouchableOpacity>

        {/* CIRCLE BUTTONS */}
        <View style={[styles.circleButtons, styles.margin]}>
          <CircleButton options={viewOptions} navigation={navigation} />
        </View>

        {/* FLAT BUTTONS */}
        <View style={styles.margin}>
          <FlatButtons options={flatBtnOptions} navigateTo={navigateTo} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginVertical: SIZES.padding,
    marginHorizontal: SIZES.padding * 2,
  },
  cameraBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.padding * 2,
  },
  cameraBtn: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.lightGray2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 50,
    top: 25,
    left: -55,
  },
  viewProfileButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding,
    height: 30,
    width: SIZES.width - SIZES.padding * 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.darkgray,
  },
  circleButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: SIZES.height * 0.12,
  },
});
