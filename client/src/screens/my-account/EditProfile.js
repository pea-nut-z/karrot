import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { SIZES, COLORS } from "../../constants";
import { Header } from "../../UI";
import * as helper from "../../helper";
import axios from "axios";

export default function EditProfile({ route, navigation }) {
  const initName = useRef(route.params.name).current;
  const initImage = useRef(route.params.image).current;
  const [image, setImage] = useState(initImage);
  const [name, setName] = useState(initName);
  const [popupMenu, setPopupMenu] = useState(false);

  const done = () => {
    if (name !== initName || image !== initImage) {
      axios.patch(`${helper.proxy}/profile/update`, { name, image }).catch((err) => {
        console.error("EditProfile error: ", err);
      });
    }
    navigation.goBack();
  };

  const choosePhotoFromLibrary = async () => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setPopupMenu(false);
    }
  };

  const renderPopUpMenu = () => {
    return (
      <Modal isVisible={popupMenu} onBackdropPress={() => setPopupMenu(false)}>
        <TouchableOpacity
          onPress={choosePhotoFromLibrary}
          style={{
            height: 65,
            backgroundColor: COLORS.white,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <Ionicons name={"image-outline"} size={35} />
          <Text style={{ marginLeft: SIZES.padding * 2 }}>Choose from album</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImage("N/A");
            setPopupMenu(false);
          }}
          style={{
            height: 65,
            backgroundColor: COLORS.white,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <Ionicons name={"trash-outline"} size={35} />
          <Text style={{ marginLeft: SIZES.padding * 2 }}>Delete profile photo</Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  const renderPicBtn = () => {
    return (
      <TouchableOpacity onPress={() => setPopupMenu(!popupMenu)}>
        {image !== "N/A" ? (
          <Image
            source={{ uri: image }}
            resizeMode={"contain"}
            style={{
              width: 110,
              height: 110,
              borderRadius: 300,
            }}
          />
        ) : (
          <Ionicons name={"person-circle-outline"} size={120} color={COLORS.secondary} />
        )}
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: COLORS.lightGray2,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: COLORS.secondary,
            borderRadius: 50,
            position: "absolute",
            top: 80,
            left: 80,
          }}
        >
          <Ionicons name={"camera"} size={20} color={COLORS.darkgray} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={"Edit Profile"}
        useBackBtn={true}
        useRightBtns={["DONE"]}
        submitFunc={done}
        navigation={navigation}
      />

      <View
        style={{
          paddingVertical: SIZES.padding * 2,
          alignItems: "center",
        }}
      >
        {renderPicBtn()}
      </View>
      <View>{renderPopUpMenu()}</View>
      <View>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          underlineColorAndroid="transparent"
          onSubmitEditing={() => Keyboard.dismiss}
          style={{
            marginHorizontal: SIZES.padding * 2,
            height: 50,
            borderRadius: 10,
            borderWidth: 1,
            padding: 9,
            fontSize: 18,
          }}
        />
      </View>
      <SafeAreaView />
    </SafeAreaView>
  );
}
