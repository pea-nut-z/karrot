import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES, categoryOptions, categoryDropDown } from "../../constants";
import { Header, ModalAlert } from "../../UI";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrencyInput from "react-native-currency-input";
import Textarea from "react-native-textarea";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as helper from "../../helper";
import axios from "axios";

export default function Sell({ route, navigation }) {
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(categoryDropDown);
  const [numOfImg, setNumOfImg] = useState(0);
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [free, setFree] = useState(false);
  const [negotiable, setNegotiable] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);
  const [submitAlert, setSubmitAlert] = useState("");
  const [draftAlert, setDraftAlert] = useState(false);
  const [draft, setDraft] = useState(false);

  const itemId = useRef(route.params.itemId).current;

  useEffect(() => {
    axios
      .get(`${helper.proxy}/profile/draft`)
      .then((res) => {
        const existngDraft = res["data"]["doc"]["draft"];
        if (existngDraft) {
          setDraftAlert(true);
          setDraft(existngDraft);
        }
      })
      .catch((err) => console.error("Homepage data error: ", err));
  }, []);

  useEffect(() => {
    if (price === 0) {
      setFree(true);
      setPrice(null);
    }
  }, [price]);

  const handleDraftOption = (option) => {
    if (option === "no") {
      axios
        .patch(`${helper.proxy}/profile/update`, { draft: false })
        .then(() => {
          setDraft(false);
        })
        .catch((err) => {
          console.error("Sell->delete draft error: ", err);
        });
    } else {
      const { images, title, price, free, negotiable, category, description } = draft;
      setNumOfImg(images.length);
      setImages(images);
      setTitle(title);
      setPrice(price);
      setFree(free);
      setNegotiable(negotiable);
      setCategory(category);
      setDescription(description);
    }
    closeDraftModal();
  };

  const closeDraftModal = () => {
    setDraftAlert(false);
  };

  const closeModal = () => {
    setAlert(false);
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
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setNumOfImg(numOfImg + 1);
      setImages([...images, result.uri]);
    }
  };

  const renderImage = ({ img }) => {
    return (
      <View style={styles.imgContainer}>
        <ImageBackground
          source={typeof img === "number" ? img : { uri: img }}
          style={styles.img}
        ></ImageBackground>
        <TouchableOpacity onPress={() => deleteImg(img)} style={styles.deleteImgBtn}>
          <Ionicons name="close-circle" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const deleteImg = (selectedImg) => {
    const newImgs = images.filter((img) => {
      return img !== selectedImg;
    });
    setImages(newImgs);
    setNumOfImg(numOfImg - 1);
  };

  const submitListing = () => {
    let imgPath;
    if (images.length === 0) {
      const obj = categoryOptions.find((obj) => obj.name === category);
      imgPath = [obj.icon];
    } else {
      imgPath = images;
    }

    const listing = {
      images: imgPath,
      title,
      price,
      free,
      negotiable,
      category,
      description,
    };

    if (itemId) {
      // it is a edit with itemId
      axios
        .patch(`${helper.proxy}/listing/update/${itemId}`, listing)
        .then((res) => {
          // console.log("update: ", res.data.doc);
          navigation.navigate("ItemDetails", {
            memberId: helper.myId,
            itemId,
          });
        })
        .catch((err) => {
          console.error("Sell -> submit existing listing error: ", err);
        });
    } else {
      // it is a draft or new item without itemId
      axios
        .post(`${helper.proxy}/listing/create`, listing)
        .then((res) => {
          // console.log("post: ", res.data.doc);
          navigation.navigate("ItemDetails", {
            memberId: helper.myId,
            itemId: res.date.itemId,
            newItem: true,
          });
        })
        .catch((err) => {
          console.error("Sell -> submit new listing error: ", err);
        });
    }
  };

  const checkFields = () => {
    if (!title) {
      setSubmitAlert("Enter a title");
      setAlert(true);
    } else if (!category) {
      setSubmitAlert("Select a category");
      setAlert(true);
    } else if (!description) {
      setSubmitAlert("Enter a description");
      setAlert(true);
    } else if (description.length < 20) {
      setSubmitAlert("Tell us a bit more for description - minimum 20 characters");
      setAlert(true);
    } else {
      submitListing();
    }
  };

  const saveDraft = () => {
    const listing = {
      images,
      title,
      price,
      category,
      description,
    };
    const notBlank = (value) => value !== "" && value?.length !== 0 && value !== null;
    const values = Object.values(listing);
    const listingIsNotBlank = values.some((val) => notBlank(val));

    if (listingIsNotBlank) {
      axios.patch(`${helper.proxy}/profile/update`, listing).catch((err) => {
        console.error("Sell->add draft error: ", err);
      });
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        title={itemId ? "Edit Post" : "Post For Sale"}
        saveDraft={saveDraft}
        useBackBtn={true}
        useRightBtns={["checkmark-done"]}
        submitFunc={checkFields}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={100}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, styles.uploadImgContainer]}>
          <TouchableOpacity
            onPress={() => {
              numOfImg < helper.maxUploadImg
                ? choosePhotoFromLibrary()
                : Alert.alert("Choose up to 10 images");
            }}
            style={styles.uploadImgBtn}
          >
            <Ionicons name="camera" size={25} color={COLORS.secondary} />
            <Text>
              {numOfImg} / {helper.maxUploadImg}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(img, index) => `img-${index}`}
            renderItem={renderImage}
          />
        </View>
        {/* TITLE */}
        <TextInput
          maxLength={64}
          defaultValue={title}
          onChangeText={setTitle}
          placeholder="Title"
          style={[styles.container, styles.regularHeight]}
        />

        <View style={[styles.freeNegotiableContainer, styles.container]}>
          {/* FREE LABEL */}
          {/* PRICE */}
          {free ? (
            <View style={styles.regularHeight}>
              <TouchableOpacity
                onPress={() => {
                  setFree(false);
                }}
                style={styles.freeLabel}
              >
                <Text style={{ color: COLORS.primary }}>Free X</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CurrencyInput
              value={price}
              onChangeValue={setPrice}
              unit="$  "
              delimiter=","
              separator="."
              precision={2}
              maxValue={9999999.99}
              ignoreNegative={true}
              placeholder="$ Enter price"
              placeholderTextColor={COLORS.secondary}
              style={[styles.regularHeight, { width: SIZES.width * 0.5 }]}
            />
          )}

          {/* NEGOTIABLE */}
          <TouchableOpacity
            style={styles.checkMarkContainer}
            onPress={() => {
              setNegotiable(!negotiable);
            }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={25}
              color={negotiable ? COLORS.primary : COLORS.secondary}
            />
            <Text
              style={{
                color: negotiable ? COLORS.black : COLORS.secondary,
              }}
            >
              Negotiable
            </Text>
          </TouchableOpacity>
        </View>
        {/* CATEGORIES */}
        <DropDownPicker
          open={dropDown}
          value={category}
          items={dropDownItems}
          placeholder="Select a category..."
          setOpen={setDropDown}
          setValue={setCategory}
          setItems={setDropDownItems}
          disableBorderRadius={true}
          listMode="SCROLLVIEW"
          style={styles.dropDown}
          placeholderStyle={styles.dropDownHolder}
          dropDownContainerStyle={styles.dropDownContainer}
        />
        {/* DESCRIPTION */}
        <View style={{ height: 200 }}>
          <Textarea
            containerStyle={[styles.container, styles.textareaContainer]}
            defaultValue={description}
            onChangeText={setDescription}
            maxLength={600}
            placeholder={"Describe your item in as much detail as you can."}
            underlineColorAndroid={"transparent"}
            style={styles.textareaContainer}
          />
        </View>
      </KeyboardAwareScrollView>
      <ModalAlert visibleVariable={alert} closeModal={closeModal} message={submitAlert} />
      <ModalAlert
        visibleVariable={draftAlert}
        closeModal={closeDraftModal}
        onClickOption={handleDraftOption}
        message={"You have a saved draft. Continue writing?"}
        options={["YES", "NO"]}
        actions={["yes", "no"]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.transparent,
    borderBottomColor: COLORS.secondary,
  },
  uploadImgContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  uploadImgBtn: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginRight: SIZES.padding,
  },
  imgContainer: {
    height: SIZES.width / 5,
    width: SIZES.width / 5,
    marginRight: SIZES.padding,
  },
  img: {
    height: "100%",
    width: "100%",
  },
  deleteImgBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  regularHeight: {
    height: SIZES.height * 0.066,
    justifyContent: "center",
  },
  freeNegotiableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  freeLabel: {
    height: 30,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  checkMarkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkMark: {
    width: 20,
    height: 20,
    marginRight: SIZES.padding,
  },
  dropDown: {
    borderRadius: 0,
    borderColor: "transparent",
    backgroundColor: COLORS.lightGray4,
    borderBottomColor: COLORS.secondary,
  },
  dropDownContainer: {
    borderRadius: 0,
    borderColor: COLORS.secondary,
  },
  dropDownHolder: {
    color: COLORS.secondary,
    marginLeft: SIZES.padding,
  },
  textareaContainer: {
    height: SIZES.height * 0.45,
  },
});
