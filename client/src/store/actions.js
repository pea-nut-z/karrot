import { Platform } from "react-native";
import axios from "axios";
import * as types from "./actionTypes";

const PROXY = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const getMyProfile = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/`)
      .then((res) => {
        dispatch({
          type: types.GET_MY_PROFILE,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log("getMyProfile ERROR: ", err);
      });
  };
};

export const updateMyProfile = (name, image) => {
  return (dispatch) => {
    axios
      .patch(`${PROXY}/update`, { name, image })
      .then(() => {
        dispatch(getMyProfile());
      })
      .catch((err) => {
        console.log("updateMyProfile ERROR: ", err);
      });
  };
};
