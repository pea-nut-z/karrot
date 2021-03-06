import { combineReducers } from "redux";
import * as actions from "./actionTypes";
import { dateWithoutTime } from "../helper";

// STATES
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
    displayPic: "https://viterbischool.usc.edu/wp-content/uploads/2020/05/Lily-Profile-Square.jpeg",
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
        "https://www.bhphotovideo.com/images/images2500x2500/fujifilm_16619011_x_t30_mirrorless_camera_black_1459274.jpg",
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
      images: [
        "https://media.wired.com/photos/5fb2cc575c9914713ead03de/master/w_1920,c_limit/Gear-Apple-MacBook-Air-top-down-SOURCE-Apple.jpg",
        "https://media.wired.com/photos/5faed077f9e76246dde3355d/master/pass/Gear-Surface-Laptop-Go-SOURCE-Microsoft.jpg",
      ],
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
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbTNXy9VvobQfqsWF5JxFtzfXKdepmDIza5GUAtO8LNwuLQCRKe__Hlcd7mqpbd5JbPB8&usqp=CAU",
        "https://d6qwfb5pdou4u.cloudfront.net/product-images/920001-930000/921404/1493830079901676dedf705c0ae03c1b6ee656b089/1500-1500-frame-0.jpg",
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
      images: [
        "https://images3.pricecheck.co.za/images/objects/hash/product/4d1/958/6fd/image_big_151824666.jpg?1547868465",
        "https://i.pinimg.com/originals/e9/fd/48/e9fd485325df5ebf2fbb45ad29f503d9.jpg",
      ],
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
        "https://i.pinimg.com/736x/a2/75/25/a275259364ad4513c155e59d986591cd.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzbbZyMo4mqEZrckpsq6dDVPo8vPcmsdCeHbPbFx2ZOgpbiqn8_nhJTeZSBT2KIQ8OPpc&usqp=CAU",
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
        "https://www.rawlings.com/dw/image/v2/BBBJ_PRD/on/demandware.static/-/Sites-master-catalog/default/dw82199b5e/products/ROMLB-1.jpg?sw=800&sfrm=png&bgcolor=ebebeb",
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
        "https://images.squarespace-cdn.com/content/v1/5d82948649d2036eaca6a98f/1591892584484-VC7DTH9H3P58X1VCGWOT/Vito+alto+sax+A4108202.jpg",
        "https://m.media-amazon.com/images/I/51QBmSmKSQL._AC_SX355_.jpg",
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
        "https://media1.popsugar-assets.com/files/thumbor/wLtfx2uRUtIwQx4jCeyf6r2LUzw/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2018/08/08/815/n/1922564/58b56cd75b6b37aabe0b59.92812343_/i/Denim-Dresses-From-Amazon.jpg",
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
        "https://www.gannett-cdn.com/presto/2018/11/01/PDTF/20b37ad5-bd74-4fd7-a460-55171beb3b2a-Standard_and_Snow_Tires.jpg",
        "https://www.toyotires.ca/sites/default/files/obgs5-sidewall_1_0.jpg",
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
      images: [9],
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
