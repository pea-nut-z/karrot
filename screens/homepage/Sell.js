import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Alert,
  FlatList,
  ImageBackground,
} from "react-native";

import { COLORS, SIZES, categoryOptions, categoryDropDown } from "../../constants";
import { Header, ModalAlert } from "../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CurrencyInput from "react-native-currency-input";
import Textarea from "react-native-textarea";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as actions from "../../store/actionTypes";
import { useDispatch, useSelector } from "react-redux";

export default function Sell({ route, navigation }) {
  const { userId, existingItemId, continueDraft } = route.params;

  const existingItem = useSelector((state) => state["listings"][userId][existingItemId]);

  const maxNumOfImg = 10;
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(categoryDropDown);
  const [numOfImg, setNumOfImg] = useState(existingItem?.images.length || 0);
  const [images, setImages] = useState(existingItem?.images || []);
  const [title, setTitle] = useState(existingItem?.title || "");
  const [price, setPrice] = useState(existingItem?.price || "");
  const [free, setFree] = useState(existingItem?.free || false);
  const [negotiable, setNegotiable] = useState(existingItem?.negotiable || true);
  const [category, setCategory] = useState(existingItem?.category);
  const [description, setDescription] = useState(existingItem?.description || "");

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  let newItemId = 100;
  let itemId = existingItemId ? existingItemId : ++newItemId;

  const dispatch = useDispatch();

  useEffect(() => {
    if (price === 0) {
      setFree(true);
      setPrice(null);
    }
  }, [price]);

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

  const renderImage = ({ item }) => {
    return (
      <View style={styles.imgContainer}>
        <ImageBackground
          source={typeof item === "number" ? item : { uri: item }}
          style={styles.img}
        ></ImageBackground>
        <TouchableOpacity onPress={() => deleteImg(item)} style={styles.deleteImgBtn}>
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

  const submitPost = () => {
    if (!title) {
      setAlertMsg("Enter a title");
      setAlert(true);
    } else if (!category) {
      setAlertMsg("Select a category");
      setAlert(true);
    } else if (!description) {
      setAlertMsg("Enter a description");
      setAlert(true);
    } else if (description.length < 20) {
      setAlertMsg("Tell us a bit more for description - minimum 20 characters");
      setAlert(true);
    } else {
      let imgPath;
      if (images.length === 0) {
        categoryOptions.find((obj) => {
          if (obj.name === category) {
            imgPath = [obj.icon];
          }
        });
      } else {
        imgPath = images;
      }

      if (continueDraft || !existingItem) {
        dispatch({
          type: actions.ITEM_ADDED,
          sellerId: userId,
          itemId,
          payload: {
            images: imgPath,
            title,
            price,
            free,
            negotiable,
            category,
            description,
          },
        });
      }

      if (!continueDraft && existingItem) {
        dispatch({
          type: actions.ITEM_EDITED,
          sellerId: userId,
          itemId,
          payload: {
            images: imgPath,
            title,
            price,
            free,
            negotiable,
            category,
            description,
          },
        });
      }

      navigation.navigate("ItemDetails", {
        userId,
        sellerId: userId,
        itemId,
        newItem: true,
      });
    }
  };

  const saveDraft = () => {
    const fields = {
      images,
      title,
      price,
      category,
      description,
    };
    const notBlank = (value) => value !== "" && value?.length !== 0 && value !== undefined;

    let postIsNotBlank = Object.values(fields);
    postIsNotBlank = postIsNotBlank.some(notBlank);

    if (postIsNotBlank) {
      let imgPath;
      if (images.length === 0 && category) {
        categoryOptions.find((obj) => {
          if (obj.name === category) imgPath = [obj.icon];
        });
      } else {
        imgPath = images;
      }

      dispatch({
        type: actions.ITEM_EDITED,
        sellerId: userId,
        itemId,
        payload: {
          images: imgPath,
          title,
          price,
          free,
          negotiable,
          category,
          description,
        },
      });

      dispatch({
        type: actions.DRAFT_ADDED,
        userId,
        itemId,
      });
    }
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        title={continueDraft ? "Post For Sale" : existingItem ? "Edit Post" : "Post For Sale"}
        saveDraft={saveDraft}
        useBackBtn={true}
        useRightBtns={["checkmark-done"]}
        submitFunc={submitPost}
      />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraHeight={100}
        enableOnAndroid
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            ...styles.container,
            ...styles.uploadImgContainer,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              numOfImg < maxNumOfImg
                ? choosePhotoFromLibrary()
                : Alert.alert("Choose up to 10 images");
            }}
            style={styles.uploadImgBtn}
          >
            <Ionicons name="camera" size={25} color={COLORS.secondary} />
            <Text>
              {numOfImg} / {maxNumOfImg}
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
          style={{ ...styles.container, ...styles.regularHeight }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            ...styles.container,
          }}
        >
          {/* FREE LABEL */}
          {/* PRICE */}
          {free ? (
            <View
              style={{
                ...styles.regularHeight,
              }}
            >
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
              style={{
                ...styles.regularHeight,
                width: SIZES.width * 0.5,
              }}
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
          style={{
            borderRadius: 0,
            borderColor: "transparent",
            backgroundColor: COLORS.lightGray4,
            borderBottomColor: COLORS.secondary,
          }}
          placeholderStyle={{
            color: COLORS.secondary,
            marginLeft: SIZES.padding,
          }}
          dropDownContainerStyle={{
            borderRadius: 0,
            borderColor: COLORS.secondary,
          }}
        />
        {/* DESCRIPTION */}
        <View style={{ height: 200 }}>
          <Textarea
            containerStyle={{
              ...styles.container,
              ...styles.textareaContainer,
            }}
            defaultValue={description}
            onChangeText={setDescription}
            maxLength={600}
            placeholder={"Describe your item in as much detail as you can."}
            underlineColorAndroid={"transparent"}
          />
        </View>
      </KeyboardAwareScrollView>
      <ModalAlert visibleVariable={alert} closeModal={closeModal} message={alertMsg} />
    </View>
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
    position: "absolute",
    width: SIZES.width,
  },
  textareaContainer: {
    height: SIZES.height * 0.45,
  },
});
