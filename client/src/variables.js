import { icons } from "./constants";

export const maxUploadImg = 10;

export const starRatingArr = [1, 2, 3, 4, 5];

export const detailedItemStatusOptions = {
  Active: ["Edit", "Hide", "Sold", "Delete"],
  Sold: ["Change to active", "Edit", "Hide", "Delete"],
  Hidden: ["Edit", "Delete", "Unhide"],
};

export const getRestrictActions = (block, hide) => {
  return block ? ["Report", "Unblock"] : ["Report", "Block", hide ? "Unhide" : "Hide"];
};

class ModalActions {
  post = {
    title: {
      message: () => "Enter a title",
    },
    category: {
      message: () => "Select a category",
    },
    description: {
      message: () => "Enter a description",
    },
    descLength: {
      message: () => "Tell us a bit more for description - minimum 20 characters",
    },
    draft: {
      message: () => "You have a saved draft. Continue writing?",
      options: ["Yes", "No"],
      actions: ["Use-Draft", "Remove-Draft"],
    },
    edit: {
      message: () => "Quit editing post?",
      options: ["No", "Yes"],
      actions: ["Cancel", "Exit"],
    },
  };

  listing = {
    Hide: {
      message: () => "Other users won't be able to see your post. Hide post?",
      options: ["Cancel", "Hide"],
      actions: ["Cancel", "Confirm-Hide"],
    },
    Unhide: {
      message: () => "Other users will be able to see your post. Unhide post?",
      options: ["Cancel", "Unhide"],
      actions: ["Cancel", "Confirm-Unhide"],
    },
    Delete: {
      message: () => "Are you sure you want to delete this post?",
      options: ["Cancel", "Delete"],
      actions: ["Cancel", "Confirm-Delete"],
    },
  };

  user = {
    Block: {
      message: (name) =>
        `Are you sure you want to block ${name}? Their posts won't be visible to you and they won't be able to chat with you.`,
      options: ["Cancel", "Block"],
      actions: ["Cancel", "Blocked"],
    },
    Hide: {
      message: (name) => `Hide ${name} and all of ${name}'s post ?`,
      options: ["Cancel", "Hide"],
      actions: ["Cancel", "Hid"],
    },
    Unblock: {
      message: (name) => `${name} was unblocked`,
    },
    Hid: {
      message: (name) => `${name}'s posts will no longer be visible to you`,
    },
    Unhide: {
      message: (name) => `${name}'s posts have been unhidden`,
    },
  };
}

export const modalActions = new ModalActions();

export const categories = [
  {
    name: "Electronics",
    icon: icons.electronics,
  },
  {
    name: "Furniture",
    icon: icons.furniture,
  },
  {
    name: "Home, garden & DIY",
    icon: icons.garden,
  },
  {
    name: "Baby & kids",
    icon: icons.baby,
  },
  {
    name: "Women's fashion",
    icon: icons.womenFashion,
  },
  {
    name: "Men's fashion",
    icon: icons.menFashion,
  },
  {
    name: "Health & beauty",
    icon: icons.beauty,
  },
  {
    name: "Sports & leisure",
    icon: icons.sports,
  },
  {
    name: "Games, hobbies & crafts",
    icon: icons.games,
  },
  {
    name: "Books, music & tickets",
    icon: icons.books,
  },
  {
    name: "Pets stuff",
    icon: icons.pets,
  },
  {
    name: "Musical instruments",
    icon: icons.musical,
  },
  {
    name: "Vehicles & parts",
    icon: icons.vehicles,
  },
  {
    name: "Other",
    icon: icons.other,
  },
  {
    name: "Wanted",
    icon: icons.wanted,
  },
];

export const categoryDropDown = categories.map((category) => ({
  label: category.name,
  value: category.name,
}));

export const itemStatusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Reserved",
    value: "Reserved",
  },
  {
    label: "Sold",
    value: "Sold",
  },
];

export const myItemViewOptions = [
  {
    name: "Listings",
    navigateTo: "ItemsTabs",
    icon: "list-circle-outline",
  },
  {
    name: "Purchases",
    navigateTo: "Purchases",
    icon: "basket-outline",
  },
  {
    name: "Favourites",
    navigateTo: "Favourites",
    icon: "heart-outline",
  },
];

export const locationOptions = [
  {
    name: "Neighbourhood setttings",
    icon: "location-outline",
  },
  {
    name: "Verify neighbourhood",
    icon: "scan-circle-outline",
  },
  {
    name: "Search alerts",
    icon: "search-circle-outline",
  },
];

export const rewardsOption = [
  {
    name: "My rewards",
    icon: "gift-outline",
  },
];

export const infoOptions = [
  {
    name: "Invite friends",
    icon: "mail-outline",
  },
  {
    name: "FAQs",
    icon: "help-circle-outline",
  },
  {
    name: "Get help",
    icon: "information-circle-outline",
  },
];
