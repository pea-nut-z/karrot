import { Platform } from "react-native";
import axios from "axios";
import * as types from "./actionTypes";

// REQUESTS
// get my data
export const getMyData = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/`)
      .then((res) => {
        const { profile, listings, favourites, restrictions, iReview } = res.data;
        dispatch({
          type: types.SET_MY_DATA,
          profile,
          listings,
          favourites,
          restrictions,
          iReview,
        });
      })
      .catch((err) => {
        console.log("getInitialStates ERROR: ", err);
      });
  };
};

// get members listings filtered by restrictions and feed settings
export const getHomeListings = () => {
  axios
    .get(`${PROXY}/getHomeListings`)
    .then((res) => {
      const { profile, favourites, restrictions, iReview } = res.data;
      dispatch({
        type: types.SET_MY_DATA,
        profile,
        favourites,
        restrictions,
        iReview,
      });
    })
    .catch((err) => {
      console.log("getHomeListings ERROR: ", err);
    });
};

export const patchMyProfile = (changes) => {
  return (dispatch) => {
    axios
      .patch(`${PROXY}/update`, changes)
      .then(() => {
        dispatch({
          type: types.UPDATE_MY_PROFILE,
          changes,
        });
      })
      .catch((err) => {
        console.log("patchMyProfile ERROR: ", err);
      });
  };
};
