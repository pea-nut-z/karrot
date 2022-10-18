import React, { useState, useEffect, useRef, useReducer } from "react";
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
import * as variables from "../../variables";
import axios from "axios";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 4 });

const initialListing = {
  images: [],
  numOfImg: 0,
  title: "",
  price: null,
  free: false,
  negotiable: true,
  category: "",
  description: "",
};

const listingReducer = (state, action) => {
  const { type, listing, image } = action;
  switch (type) {
    case "update":
      return {
        ...state,
        ...listing,
      };
    case "add-image":
      return {
        ...state,
        images: [...state.images, image],
        numOfImg: state.numOfImg + 1,
      };
    case "remove-image":
      return {
        ...state,
        images: state.images.filter((img) => img != image),
        numOfImg: state.numOfImg - 1,
      };
    default:
      throw new Error();
  }
};

export default function Sell({ route, navigation }) {
  const [listing, listingDispatch] = useReducer(listingReducer, initialListing);
  const [dropDown, setDropDown] = useState(false);
  const [dropDownItems, setDropDownItems] = useState(categoryDropDown);
  const [category, setCategory] = useState("");
  const [draft, setDraft] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalKey, setModalKey] = useState("");
  const [readyToSubmit, setReadyToSubmit] = useState(false);

  // no itemId is a draft and with itemId is a edit
  const itemId = useRef(route.params.itemId).current;

  useEffect(() => {
    if (readyToSubmit) {
      submitListing();
    }
  }, [readyToSubmit]);

  useEffect(() => {
    if (itemId) {
      axios.get(`${helper.proxy}/my-item/read/${itemId}`).then((res) => {
        const { doc } = res.data;
        const numOfImg = typeof doc.images[0] == "string" ? doc.images.length : 0;
        listingDispatch({ type: "update", listing: { ...doc, numOfImg } });
        setCategory(doc.category);
      });
    } else {
      axios
        .get(`${helper.proxy}/profile/draft`)
        .then((res) => {
          const myDraft = res["data"]["doc"]["draft"];
          if (myDraft) {
            setDraft({ ...myDraft, numOfImg: myDraft.images.length });
            openModal("draft");
          }
        })
        .catch((err) => console.error("Homepage get draft error: ", err));
    }
  }, []);

  useEffect(() => {
    if (listing.price === 0) {
      updateListingValue({
        free: true,
        price: null,
      });
    }

    if (category != listing.category) {
      updateListingValue({ category });
    }
  }, [listing.price, category]);

  const updateListingValue = (data) => {
    listingDispatch({ type: "update", listing: data });
  };

  const handleAction = (action) => {
    closeModal();

    switch (action) {
      case "Remove-Draft":
        return axios
          .patch(`${helper.proxy}/profile/update`, { draft: false })
          .then(() => {
            setDraft(null);
          })
          .catch((err) => {
            console.error("Sell->delete draft error: ", err);
          });
      case "Use-Draft":
        listingDispatch({ type: "update", listing: draft });
        setCategory(draft.category);
        break;
      case "Exit":
        navigation.goBack();
      case "Cancel":
        return;
      default:
        console.error("Sell->Modal handleAction error: ", err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = (option) => {
    setModalKey(option);
    setShowModal(true);
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
      listingDispatch({ type: "add-image", image: result.uri });
    }
  };

  const renderImage = ({ item }) => {
    return (
      <View style={styles.imgContainer}>
        <ImageBackground source={{ uri: item }} style={styles.img}></ImageBackground>
        <TouchableOpacity
          onPress={() => {
            listingDispatch({ type: "remove-image", image: item });
          }}
          style={styles.deleteImgBtn}
        >
          <Ionicons name="close-circle" size={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const submitListing = () => {
    if (itemId) {
      axios
        .patch(`${helper.proxy}/my-item/update/${itemId}`, listing)
        .then(() => {
          navigation.navigate("ItemDetails", {
            memberId: helper.myId,
            itemId,
          });
        })
        .catch((err) => {
          console.error("Sell -> submit existing listing error: ", err);
        });
    } else {
      axios
        .post(`${helper.proxy}/my-item/create`, listing)
        .then((res) => {
          navigation.navigate("ItemDetails", {
            memberId: helper.myId,
            itemId: res.data.itemId,
            newItem: true,
          });
        })
        .catch((err) => {
          console.error("Sell -> submit new listing error: ", err);
        });
    }
  };

  const checkFields = () => {
    const checkImgAndPrice = () => {
      if (listing.images.length === 0) {
        const category = categoryOptions.find((category) => category.name === listing.category);
        listingDispatch({ type: "add-image", image: category.icon });
      }
      if (!listing.price) {
        updateListingValue({ free: true, price: 0 });
      }
      setReadyToSubmit(true);
    };
    const { title, category, description } = listing;
    const invalidField = !title
      ? "title"
      : !category
      ? "category"
      : !description
      ? "description"
      : description.length < 20
      ? "descLength"
      : null;
    invalidField ? openModal(invalidField) : checkImgAndPrice();
  };

  const saveDraft = () => {
    const values = Object.values(listing);
    const blankField = (val) => typeof val == "boolean" || !val || val.length == 0;
    const blankListing = values.every((val) => blankField(val));
    if (!blankListing) {
      axios.patch(`${helper.proxy}/profile/update`, { draft: listing }).catch((err) => {
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
        useBackBtn={true}
        useRightBtns={["checkmark-done"]}
        saveDraft={saveDraft}
        submitFunc={checkFields}
        openModal={openModal}
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
              listing.numOfImg < variables.maxUploadImg
                ? choosePhotoFromLibrary()
                : Alert.alert("Choose up to 10 images");
            }}
            style={styles.uploadImgBtn}
          >
            <Ionicons name="camera" size={25} color={COLORS.secondary} />
            <Text>
              {listing.numOfImg} / {variables.maxUploadImg}
            </Text>
          </TouchableOpacity>
          {typeof listing["images"][0] == "string" && (
            <FlatList
              data={listing["images"]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={() => uid()}
              renderItem={renderImage}
            />
          )}
        </View>
        {/* TITLE */}
        <TextInput
          maxLength={64}
          defaultValue={listing.title}
          onChangeText={(val) => {
            updateListingValue({ title: val });
          }}
          placeholder="Title"
          style={[styles.container, styles.regularHeight]}
        />

        <View style={[styles.freeNegotiableContainer, styles.container]}>
          {/* FREE LABEL */}
          {/* PRICE */}
          {listing.free ? (
            <View style={styles.regularHeight}>
              <TouchableOpacity
                onPress={() => updateListingValue({ free: false })}
                style={styles.freeLabel}
              >
                <Text style={{ color: COLORS.primary }}>Free X</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <CurrencyInput
              value={listing.price}
              onChangeValue={(val) => updateListingValue({ price: val })}
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
              updateListingValue({ negotiable: !listing.negotiable });
            }}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={25}
              color={listing.negotiable ? COLORS.primary : COLORS.secondary}
            />
            <Text
              style={{
                color: listing.negotiable ? COLORS.black : COLORS.secondary,
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
            defaultValue={listing.description}
            onChangeText={(val) => updateListingValue({ description: val })}
            maxLength={600}
            placeholder={"Describe your item in as much detail as you can."}
            underlineColorAndroid={"transparent"}
            style={styles.textareaContainer}
          />
        </View>
      </KeyboardAwareScrollView>
      <ModalAlert
        visibleVariable={showModal}
        closeModal={closeModal}
        handleAction={handleAction}
        keys={["post", modalKey]}
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
