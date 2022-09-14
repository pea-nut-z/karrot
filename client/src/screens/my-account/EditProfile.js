import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Keyboard,
  SafeAreaView,
  StyleSheet,
} from "react-native";
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
        <TouchableOpacity onPress={choosePhotoFromLibrary} style={styles.modalContainer}>
          <Ionicons name={"image-outline"} size={35} />
          <Text style={styles.modalText}>Choose from album</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setImage("N/A");
            setPopupMenu(false);
          }}
          style={styles.modalContainer}
        >
          <Ionicons name={"trash-outline"} size={35} />
          <Text style={styles.modalText}>Delete profile photo</Text>
        </TouchableOpacity>
      </Modal>
    );
  };

  const renderPicBtn = () => {
    return (
      <TouchableOpacity onPress={() => setPopupMenu(!popupMenu)}>
        {image !== "N/A" ? (
          <Image source={{ uri: image }} resizeMode={"contain"} style={styles.imageContainer} />
        ) : (
          <Ionicons name={"person-circle-outline"} size={120} color={COLORS.secondary} />
        )}
        <View style={styles.cameraIconContainer}>
          <Ionicons name={"camera"} size={20} color={COLORS.darkgray} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={"Edit Profile"}
        useBackBtn={true}
        useRightBtns={["DONE"]}
        submitFunc={done}
        navigation={navigation}
      />

      <View style={styles.imageButtonContainer}>{renderPicBtn()}</View>
      <View>{renderPopUpMenu()}</View>
      <View>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          underlineColorAndroid="transparent"
          onSubmitEditing={() => Keyboard.dismiss}
          style={styles.nameInput}
        />
      </View>
      <SafeAreaView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    height: 65,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding * 2,
  },
  modalText: { marginLeft: SIZES.padding * 2 },
  imageContainer: {
    width: 110,
    height: 110,
    borderRadius: 300,
  },
  imageButtonContainer: {
    paddingVertical: SIZES.padding * 2,
    alignItems: "center",
  },
  cameraIconContainer: {
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
  },
  nameInput: {
    marginHorizontal: SIZES.padding * 2,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    padding: 9,
    fontSize: 18,
  },
});
