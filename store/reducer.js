import { combineReducers } from "redux";
import * as actions from "./actionTypes";
import { dateWithoutTime } from "../helper";
// sync id to database
//actions (add, edit , delete)
// userId -> sellerId -> itemId

// MOCK USER
// const userId = 111;
// 644@gmail.com

const dateTime = new Date();

const accounts = {
  CEzKopBqHhUaOuV4QLQHnyymiXq2: 111,
};

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
    displayPic:
      "https://media-exp1.licdn.com/dms/image/C4D03AQFqL3K7Xm2ySg/profile-displayphoto-shrink_200_200/0/1604292859762?e=1620864000&v=beta&t=x1edHswOrFkSJMX8P1NyCZgGG-1Jqa1ADdOkHeAxeqs",
    joined: "January 02, 2020",
  },
};

const listings = {
  111: {
    1: {
      status: "Hidden",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://i.pcmag.com/imagery/roundups/018cwxjHcVMwiaDIpTnZJ8H-23.fit_lim.size_1050x.jpg",
        "https://photographycourse.net/wp-content/uploads/2019/11/10-best-fashion-photography-cameras-2-696x462.jpg",
      ],
      title: "Camera",
      price: 100,
      free: false,
      negotiable: true,
      category: "Electronics",
      description:
        "Aliquam quis massa malesuada, pulvinar nunc sit amet, imperdiet urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In nec risus congue, iaculis lacus at, euismod libero. Vivamus sed pretium mauris. Praesent eget condimentum leo, vel sollicitudin libero. Praesent congue nulla nec nisl tempor, id mattis dolor imperdiet. Duis a tempus augue, nec pulvinar elit. Donec molestie sem at vulputate iaculis. Etiam sit amet urna mauris.",
    },
    2: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://upload.wikimedia.org/wikipedia/commons/3/39/PSX-Console-wController.jpg",
        "https://cdn.vox-cdn.com/thumbor/n0ffZ25IFz0U9UByTKatZLznjVU=/0x0:1024x661/1200x800/filters:focal(431x250:593x412)/cdn.vox-cdn.com/uploads/chorus_image/image/54646621/1.0.jpg",
      ],
      title: "PlayStation",
      price: 20,
      free: false,
      negotiable: true,
      category: "Games, hobbies & crafts",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
  },
  222: {
    3: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 1,
      views: 0,
      images: ["https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg"],
      title: "Computer",
      price: 150,
      free: false,
      negotiable: true,
      category: "Electronics",
      description:
        "ok Pellentesque habitant morbi tristiquegestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    12: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://cdn.shopify.com/s/files/1/2660/5106/products/zitwtf8ugnk2s36hmqih_1bea5b64-70ab-4cba-81ce-287847488ef2_1400x.jpg?v=1610048659",
      ],
      title: "Sofa",
      price: 100,
      free: false,
      negotiable: true,
      category: "Furniture",
      description:
        "Pellentesque egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    13: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: ["https://images-na.ssl-images-amazon.com/images/I/71Y62DmZg3L._AC_SL1500_.jpg"],
      title: "baby stroller",
      price: 200,
      free: false,
      negotiable: true,
      category: "Baby & kids",
      description: "Pellentesque habitant morbi tristique senectus et.",
    },

    15: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://thefibreco.com/wp-content/uploads/2020/01/Navigate-Pullover-by-Annie-Lupton.jpg",
      ],
      title: "Sweater",
      price: 50,
      free: false,
      negotiable: true,
      category: "Men's fashion",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    4: {
      status: "Sold",
      date: new Date("Thu Jan 26 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 1,
      views: 0,
      images: [
        "data:image/jpeg;base64,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",
      ],
      title: "Baseball",
      price: 0,
      free: true,
      negotiable: false,
      category: "Sports & leisure",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },

    6: {
      status: "Active",
      date: new Date("Thu Jun 04 2019 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://www.thelabradorsite.com/wp-content/uploads/2018/09/best-moving-dog-toys-long.jpg",
        "https://www.pettoy.co.uk/wp-content/uploads/2018/04/pet-toy-homepage.jpg",
      ],
      title: "Dog Toy",
      price: 30,
      free: false,
      negotiable: false,
      category: "Pets stuff",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    7: {
      status: "Active",
      date: new Date("Thu Mar 01 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://images-na.ssl-images-amazon.com/images/I/91DOyffm3cL._AC_SL1500_.jpg",
        "https://www.musikalessons.com/blog/wp-content/uploads/2013/10/Fotolia_46742837_M.jpg",
      ],
      title: "Saxophone",
      price: 1000,
      free: false,
      negotiable: true,
      category: "Musical instruments",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
  },
  333: {
    5: {
      status: "Active",
      date: new Date("Thu Feb 09 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),

      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://imagescdn.simons.ca/images/6772/200964/45/A1_2.jpg?__=19",
        "https://imagescdn.simons.ca/images/6772/200964/1/A1_1.jpg?__=19",
      ],
      title: "Dress",
      price: 70,
      free: false,
      negotiable: true,
      category: "Women's fashion",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    8: {
      status: "Active",
      date: new Date("Thu Feb 09 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [
        "https://tirecraft.com/wp-content/uploads/2018/01/Hankook-winter-tire.jpeg",
        "https://www.familyhandyman.com/wp-content/uploads/2020/10/snow-tires-GettyImages-1227503607.jpg",
      ],
      title: "Winter Tires",
      price: 100,
      free: false,
      negotiable: true,
      category: "Vehicles & parts",
      description:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
    9: {
      status: "Active",
      date: new Date("Thu Jan 26 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: [10],
      title: "plant",
      price: 10,
      free: false,
      negotiable: true,
      category: "Home, garden & DIY",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus maximus ex nec eros posuere, consequat tempus lorem fringilla. Sed nec lacinia tellus. Nam ac dignissim nisl. Nullam blandit dapibus ultricies. Nullam a feugiat ex. Pellentesque varius nisl a erat aliquet porttitor vel a eros. Ut id nibh non metus sodales maximus nec in nunc. Nulla consectetur tincidunt ex. Donec vehicula tellus augue, et finibus metus feugiat et. In diam odio, iaculis sit amet urna quis, suscipit fermentum odio.Nunc gravida enim ex, ac vehicula mi placerat sed. Quisque mollis eleifend tincidunt in a weathe.",
    },
    10: {
      category: undefined,
      description: "",
      free: false,
      images: [Array],
      negotiable: true,
      price: "",
      title: "TESTING DRAFT NOT TO BE DISPLAYED",
    },
    14: {
      status: "Active",
      date: new Date("Thu Feb 04 2021 20:36:28 GMT-0500 (Eastern Standard Time").toString(),
      chats: 0,
      favourites: 0,
      views: 0,
      images: ["https://images.indianexpress.com/2019/12/GettyImages-1085654634.jpg"],
      title: "Makeup brushes",
      price: 60,
      free: false,
      negotiable: true,
      category: "Health & beauty",
      description:
        "Malesuada fames ac turpis egestas. Nam et mauris tincidunt, lacinia mauris non, venenatis quam. Duis odio metus, sodales eget quam sed, dictum egestas mi. Ut scelerisque risus enim, at viverra turpis eleifend a. Praesent erat arcu, rhoncus in pellentesque at, sagittis malesuada justo. Mauris vulputate est ut risus mollis, non blandit libero pretium. Phasellus tincidunt nunc in sapien elementum malesuada. Mauris tincidunt nisl eget nibh blandit viverra. Quisque rutrum, lacus at dapibus auctor, sem quam placerat justo, vitae aliquet massa turpis a libero.",
    },
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

// dispatch({ type: actions.USER_ADDED, userId: id, username, location: "N/A" });
// username: "Tony",
// location: "Toronto",
// displayPic: "N/A",
// joined: "November 15, 2021",

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
      const { [key]: value, ...withoutDeletedItem } = state[sellerId];
      return {
        ...state,
        [sellerId]: {
          ...withoutDeletedItem,
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
            favourites: ++state[sellerId][itemId]["favourites"],
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
            favourites: --state[sellerId][itemId]["favourites"],
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
            views: ++state[sellerId][itemId]["views"],
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
        [userId]: state[userId].concat({
          sellerId: sellerId,
          itemId: itemId,
        }),
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
  const initialFeed = [
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
  ];
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
