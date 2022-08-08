import { combineReducers } from "redux";
import * as types from "./actionTypes";
import { dateWithoutTime } from "../helper";

const members = {
  111: {
    username: "Tony",
    location: "Toronto",
    displayPic: "N/A",
    joined: "November 15, 2021",
  },
  222: {
    username: "Paul",
    location: "Etobicoke",
    displayPic:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBKIQ3nJDvcaM1yFmPXGBq24kgZJxTDBe9A&usqp=CAU",
    joined: "March 22, 2019",
  },
  333: {
    username: "Jennifer",
    location: "Ottawa",
    displayPic: "https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg",
    joined: "January 02, 2020",
  },
};

const favourites = {
  111: [
    {
      sellerId: 222,
      itemId: 3,
    },
    {
      sellerId: 222,
      itemId: 4,
    },
  ],

  222: [
    {
      sellerId: 111,
      itemId: 1,
    },
  ],
};

const feeds = {
  111: [
    "Electronics",
    "Furniture",
    "Home, garden & DIY",
    "Baby & kids",
    "Women's fashion",
    "Men's fashion",
    "Health & beauty",
    "Sports & leisure",
    "Games, hobbies & crafts",
    "Books, music & tickets",
    "Pets stuff",
    "Musical instruments",
    "Vehicles & parts",
    "Other",
    "Wanted",
  ],
  222: ["Electronics"],
};

const restrictions = {
  111: {
    block: [],
    blockedBy: [],
    hide: [],
  },
  333: {
    block: [111],
    blockedBy: [],
    hide: [],
  },
  222: {
    block: [],
    blockedBy: [111],
    hide: [],
  },
};

const drafts = {
  222: 3,
};

const reviews = {
  111: {
    reviews: [],
    total: 0,
    reviewers: [],
  },
  222: {
    reviews: [
      {
        reviewerId: 333,
        date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
        rating: 5,
        headline: "Product as described",
        review: "Thank you!",
      },
      {
        reviewerId: 111,
        date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
        rating: 1,
        headline: "Did not show up",
        review: "!",
      },
    ],
    total: 6,
    reviewers: [333, 111],
  },
  333: {
    reviews: [],
    total: 0,
    reviewers: [],
  },
};

// STATES
const profile = {};
const listings = [];
const myFavourites = [];
const restriction = {}; // change name to restrictions
const iReview = [];

// NEW REDUCERS my info
const profileReducer = (state = profile, action) => {
  const { data, changes } = action;
  switch (action.type) {
    case types.SET_DATA:
      const copy = { ...data };
      delete copy.items; // remove listings from data
      return {
        ...copy,
      };
    case types.UPDATE_PROFILE:
      return {
        ...state,
        ...changes,
      };
    default:
      return state;
  }
};

const listingsReducer = (state = listings, action) => {
  const { data, changes } = action;
  switch (action.type) {
    case types.SET_DATA:
      return [...data.items];
    default:
      return state;
  }
};

const myFavouritesReducer = (state = myFavourites, action) => {
  const { favourites } = action;

  switch (action.type) {
    case types.SET_MY_DATA:
      return [...favourites];
    case types.FAVOURITE_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item.itemId !== itemId),
      };
    default:
      return state;
  }
};

const restrictionReducer = (state = restriction, action) => {
  const { restrictions } = action;
  switch (action.type) {
    case types.SET_MY_DATA:
      return { ...restrictions };
    default:
      return state;
  }
};

const iReviewReducer = (state = iReview, action) => {
  const { iReview } = action;
  switch (action.type) {
    case types.SET_MY_DATA:
      return [...iReview];
    default:
      return state;
  }
};

// OLD REDUCERS
const favouritesReducer = (state = favourites, action) => {
  const { userId, sellerId, itemId } = action;

  switch (action.type) {
    case types.FAVOURITE_ADDED:
      return {
        ...state,
        [userId]: [...state[userId], { sellerId, itemId }],
      };

    case types.FAVOURITE_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item.itemId !== itemId),
      };
    default:
      return state;
  }
};

const usersReducer = (state = members, action) => {
  const { userId, username, image } = action;

  switch (action.type) {
    case types.USER_ADDED:
      return {
        ...state,
        [userId]: {
          username,
          location: "N/A",
          displayPic: "N/A",
          joined: dateWithoutTime(),
        },
      };
    case types.USERNAME_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          username: username,
        },
      };
    case types.USER_DISPLAYPIC_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          displayPic: image,
        },
      };
    // case types.DISPLAYPIC_DELETED:
    //   return {
    //     ...state,
    //     [action.userId]: {
    //       ...state[action.userId],
    //       displayPic: '',
    //     },
    //   };
    default:
      return state;
  }
};

// const listingsReducer = (state = listings, action) => {
//   const { sellerId, itemId, status } = action;

//   switch (action.type) {
//     case types.ITEM_ADDED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             status: "Active",
//             date: new Date().toString(),
//             chats: 0,
//             favourites: 0,
//             views: 0,
//             ...action.payload,
//           },
//         },
//       };
//     case types.ITEM_EDITED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             ...state[sellerId][itemId],
//             ...action.payload,
//           },
//         },
//       };
//     case types.ITEM_DELETED:
//       const key = itemId;
//       const { [key]: value, ...others } = state[sellerId];
//       return {
//         ...state,
//         [sellerId]: {
//           ...others,
//         },
//       };
//     case types.ITEM_STATUS_CHANGED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             ...state[sellerId][itemId],
//             status: status,
//           },
//         },
//       };
//     case types.FAVOURITE_ADDED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             ...state[sellerId][itemId],
//             favourites: state[sellerId][itemId]["favourites"] + 1,
//           },
//         },
//       };
//     case types.FAVOURITE_REMOVED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             ...state[sellerId][itemId],
//             favourites: state[sellerId][itemId]["favourites"] - 1,
//           },
//         },
//       };
//     case types.ITEM_VIEW_INCREMENTED:
//       return {
//         ...state,
//         [sellerId]: {
//           ...state[sellerId],
//           [itemId]: {
//             ...state[sellerId][itemId],
//             views: state[sellerId][itemId]["views"] + 1,
//           },
//         },
//       };
//     default:
//       return state;
//   }
// };

const feedsReducer = (state = feeds, action) => {
  const { userId, feed } = action;
  switch (action.type) {
    case types.FEED_ADDED:
      return {
        ...state,
        [userId]: [...state[userId], feed],
      };
    case types.FEED_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item !== feed),
      };
    default:
      return state;
  }
};

const restrictionsReducer = (state = restrictions, action) => {
  const { userId, sellerId } = action;

  switch (action.type) {
    case types.BLOCK_ADDED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          block: [...state[userId]["block"], sellerId],
        },

        [sellerId]: {
          ...state[sellerId],
          blockedBy: [...state[sellerId]["blockedBy"], userId],
        },
      };

    case types.BLOCK_REMOVED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          block: state[userId]["block"].filter((id) => id !== sellerId),
        },
        [sellerId]: {
          ...state[sellerId],
          blockedBy: state[sellerId]["blockedBy"].filter((id) => id !== userId),
        },
      };

    case types.HIDE_ADDED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          hide: [...state[userId]["hide"], sellerId],
        },
      };
    case types.HIDE_REMOVED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          hide: state[userId]["hide"].filter((id) => id !== sellerId),
        },
      };

    default:
      return state;
  }
};

const draftsReducer = (state = drafts, action) => {
  const { userId, itemId } = action;
  switch (action.type) {
    case types.DRAFT_ADDED:
      return {
        ...state,
        [userId]: itemId,
      };
    case types.DRAFT_DELETED:
      const key = userId;
      const { [key]: value, ...withoutDeletedItem } = state;
      return {
        ...withoutDeletedItem,
      };
    default:
      return state;
  }
};

const reviewsReducer = (state = reviews, action) => {
  const { memberId, reviewerId } = action;

  switch (action.type) {
    case types.REVIEW_ADDED:
      const reviewReplaced = state[memberId]["reviewers"].includes(reviewerId) ? true : false;
      const prevRating =
        reviewReplaced &&
        state[memberId]["reviews"].filter((reviewer) => reviewer.reviewerId === reviewerId)[0]
          .rating;

      return {
        ...state,
        [memberId]: {
          ...state[memberId],
          reviews: reviewReplaced
            ? state[memberId]["reviews"]
                .filter((review) => review.reviewerId !== reviewerId)
                .concat({
                  reviewerId,
                  date: new Date().toString(),
                  ...action.payload,
                })
            : state[memberId]["reviews"].concat({
                reviewerId,
                date: new Date().toString(),
                ...action.payload,
              }),

          total: reviewReplaced
            ? state[memberId]["total"] - prevRating + action.payload.rating
            : state[memberId]["total"] + action.payload.rating,
          reviewers: reviewReplaced
            ? state[memberId]["reviewers"]
            : [...state[memberId]["reviewers"], reviewerId],
        },
      };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  members: usersReducer,
  // listings: listingsReducer,
  favourites: favouritesReducer,
  feeds: feedsReducer,
  restrictions: restrictionsReducer,
  drafts: draftsReducer,
  reviews: reviewsReducer, //

  profile: profileReducer,
  listings: listingsReducer,
  myFavourites: myFavouritesReducer,
  restriction: restrictionReducer,
  iReview: iReviewReducer,
});

export default rootReducer;
