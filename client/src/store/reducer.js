import { combineReducers } from "redux";
import * as actions from "./actionTypes";
import { dateWithoutTime } from "../helper";

// REDUCERS
const accountsReducer = (state = accounts, action) => {
  const { accountId, userId } = action;

  switch (action.type) {
    case actions.USER_ADDED:
      return {
        ...state,
        [accountId]: userId,
      };
    default:
      return state;
  }
};

const usersReducer = (state = members, action) => {
  const { userId, username, image } = action;

  switch (action.type) {
    case actions.USER_ADDED:
      return {
        ...state,
        [userId]: {
          username,
          location: "N/A",
          displayPic: "N/A",
          joined: dateWithoutTime(),
        },
      };
    case actions.USERNAME_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          username: username,
        },
      };
    case actions.USER_DISPLAYPIC_CHANGED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          displayPic: image,
        },
      };
    // case actions.DISPLAYPIC_DELETED:
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

const listingsReducer = (state = listings, action) => {
  const { sellerId, itemId, status } = action;

  switch (action.type) {
    case actions.ITEM_ADDED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            status: "Active",
            date: new Date().toString(),
            chats: 0,
            favourites: 0,
            views: 0,
            ...action.payload,
          },
        },
      };
    case actions.ITEM_EDITED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            ...action.payload,
          },
        },
      };
    case actions.ITEM_DELETED:
      const key = itemId;
      const { [key]: value, ...others } = state[sellerId];
      return {
        ...state,
        [sellerId]: {
          ...others,
        },
      };
    case actions.ITEM_STATUS_CHANGED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            status: status,
          },
        },
      };
    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            favourites: state[sellerId][itemId]["favourites"] + 1,
          },
        },
      };
    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            favourites: state[sellerId][itemId]["favourites"] - 1,
          },
        },
      };
    case actions.ITEM_VIEW_INCREMENTED:
      return {
        ...state,
        [sellerId]: {
          ...state[sellerId],
          [itemId]: {
            ...state[sellerId][itemId],
            views: state[sellerId][itemId]["views"] + 1,
          },
        },
      };
    default:
      return state;
  }
};

const favouritesReducer = (state = favourites, action) => {
  const { userId, sellerId, itemId } = action;

  switch (action.type) {
    case actions.FAVOURITE_ADDED:
      return {
        ...state,
        [userId]: [...state[userId], { sellerId, itemId }],
      };

    case actions.FAVOURITE_REMOVED:
      return {
        ...state,
        [userId]: state[userId].filter((item) => item.itemId !== itemId),
      };
    default:
      return state;
  }
};

const feedsReducer = (state = feeds, action) => {
  const { userId, feed } = action;
  switch (action.type) {
    case actions.FEED_ADDED:
      return {
        ...state,
        [userId]: [...state[userId], feed],
      };
    case actions.FEED_REMOVED:
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
    case actions.BLOCK_ADDED:
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

    case actions.BLOCK_REMOVED:
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

    case actions.HIDE_ADDED:
      return {
        ...state,
        [userId]: {
          ...state[userId],
          hide: [...state[userId]["hide"], sellerId],
        },
      };
    case actions.HIDE_REMOVED:
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
    case actions.DRAFT_ADDED:
      return {
        ...state,
        [userId]: itemId,
      };
    case actions.DRAFT_DELETED:
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
    case actions.REVIEW_ADDED:
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
  listings: listingsReducer,
  favourites: favouritesReducer,
  feeds: feedsReducer,
  restrictions: restrictionsReducer,
  drafts: draftsReducer,
  reviews: reviewsReducer,
  accounts: accountsReducer,
});

export default rootReducer;
