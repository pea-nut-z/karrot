import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { SIZES, COLORS, viewOptions, locationOptions, infoOptions } from "../../constants";
import { Header, CircleButton, FlatButtons, MemberInfo } from "../../components";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function MyAccount({ navigation }) {
  // MOCK USERID
  const userId = 111;
  const userInfo = useSelector((state) => state.members[userId]);
  const flatBtnOptions = locationOptions.concat(infoOptions);
  const navigateTo = (option) => {
    // navigation.navigate("Category", {
    //   userId,
    //   selectedCategory: option.name,
    // });
    return;
  };

  const renderCamerabtn = () => {
    return (
      <View style={styles.cameraBtnContainer}>
        <MemberInfo
          picture={userInfo.displayPic}
          name={userInfo.username}
          location={userInfo.location}
          id={userId}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile", { userId })}
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
        {/* PROFILE DISPLAY */}
        <View>{renderCamerabtn()}</View>

        {/* VIEW PROFILE BUTTON */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              sellerId: userId,
              userId,
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
          <CircleButton options={viewOptions} userId={userId} navigation={navigation} />
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
