import { Platform } from "react-native";
import axios from "axios";
import * as types from "./actionTypes";

const PROXY = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000";

export const getInitialStates = () => {
  return (dispatch) => {
    axios
      .get(`${PROXY}/`)
      .then((res) => {
        const { myProfile, sellerProfiles, myListings, sellerListings, myFavourites } = res.data;

        dispatch({
          type: types.SET_INITIAL_STATES,
          myProfile,
          sellerProfiles,
          myListings,
          sellerListings,
          myFavourites,
        });
      })
      .catch((err) => {
        console.log("getInitialStates ERROR: ", err);
      });
  };
};

export const patchMyProfile = (name, image) => {
  return (dispatch) => {
    axios
      .patch(`${PROXY}/update`, { name, image })
      .then(() => {
        dispatch(getInitialStates());
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
