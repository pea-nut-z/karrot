import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  SIZES,
  COLORS,
  viewOptions,
  locationOptions,
  rewardsOption,
  infoOptions,
} from "../../constants";
import { Header, CircleButtons, FlatButtons, MemberInfo } from "../../UI";
import * as helper from "../../helper";
import axios from "axios";

export default function MyAccount({ navigation }) {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(`${helper.proxy}/profile/read`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => console.error("Profile get initial states error: ", err));
  }, []);

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
          onPress={() =>
            navigation.navigate("EditProfile", { name: profile.name, image: profile.image })
          }
          style={styles.cameraBtn}
        >
          <Ionicons name={"camera"} size={25} color={COLORS.darkgray} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outterContainer}>
      <Header title={"My Account"} useRightBtns={["settings-outline"]} />
      <KeyboardAwareScrollView enableOnAndroid showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View>{renderCamerabtn()}</View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                memberId: profile.id,
              })
            }
            style={styles.margin}
          >
            <View style={styles.viewProfileButton}>
              <Text>View profile</Text>
            </View>
          </TouchableOpacity>

          <View style={[styles.circleButtons, styles.margin]}>
            <CircleButtons options={viewOptions} navigation={navigation} />
          </View>
        </View>

        <View>
          <View style={styles.flatBtnsContainer}>
            <FlatButtons options={locationOptions} navigateTo={navigateTo} />
          </View>
          <View style={styles.flatBtnsContainer}>
            <FlatButtons options={rewardsOption} navigateTo={navigateTo} />
          </View>
          <View style={styles.flatBtnsContainer}>
            <FlatButtons options={infoOptions} navigateTo={navigateTo} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outterContainer: { flex: 1 },
  topContainer: { backgroundColor: COLORS.white },
  margin: {
    marginVertical: SIZES.padding,
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
    alignSelf: "center",
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
  flatBtnsContainer: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.white,
  },
});
