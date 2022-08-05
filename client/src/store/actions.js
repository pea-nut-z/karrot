import { Platform } from "react-native";
import axios from "axios";
import * as types from "./actionTypes";

const PROXY = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

// REQUESTS
export const getInitialStates = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/`)
      .then((res) => {
        const {
          myProfile,
          membersProfile,
          myListings,
          membersListings,
          myReviews,
          myFavourites,
          restrictions,
          membersProfileAndListings,
        } = res.data;
        console.log("@ actions myProfile");
        dispatch({
          type: types.SET_INITIAL_STATES,
          myProfile,
          membersProfile,
          myListings,
          membersListings,
          myReviews,
          myFavourites,
          restrictions,
          membersProfileAndListings,
        });
      })
      .catch((err) => {
        console.log("getInitialStates ERROR: ", err);
      });
  };
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

// export const getistings = () => {
//   return (dispath) => {
//     axios.get(`${PROXY}/`).then((res) => {
//       dispatch({
//         type: types.SET_SELLER_LISTINGS,
//         pay,
//       });
//     });
//   };
// };
