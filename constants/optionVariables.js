import {icons} from '.';

// CATEGORY
export const categoryOptions = [
  {
    name: 'Electronics',
    icon: icons.electronics,
  },
  {
    name: 'Furniture',
    icon: icons.furniture,
  },
  {
    name: 'Home, garden & DIY',
    icon: icons.garden,
  },
  {
    name: 'Baby & kids',
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
    name: 'Health & beauty',
    icon: icons.beauty,
  },
  {
    name: 'Sports & leisure',
    icon: icons.sports,
  },
  {
    name: 'Games, hobbies & crafts',
    icon: icons.games,
  },
  {
    name: 'Books, music & tickets',
    icon: icons.books,
  },
  {
    name: 'Pets stuff',
    icon: icons.pets,
  },
  {
    name: 'Musical instruments',
    icon: icons.musical,
  },
  {
    name: 'Vehicles & parts',
    icon: icons.vehicles,
  },
  {
    name: 'Other',
    icon: icons.other,
  },
  {
    name: 'Wanted',
    icon: icons.wanted,
  },
];

export const categoryDropDown = categoryOptions.map((category) => ({
  label: category.name,
  value: category.name,
}));

export const itemStatusOptions = [
  {
    label: 'Active',
    value: 'Active',
  },
  {
    label: 'Reserved',
    value: 'Reserved',
  },
  {
    label: 'Sold',
    value: 'Sold',
  },
];

// MY ACCOUNT
export const viewOptions = [
  {
    name: 'Listings',
    icon: 'list-circle-outline',
  },
  {
    name: 'Purchases',
    icon: 'basket-outline',
  },
  {
    name: 'Favourites',
    icon: 'heart-outline',
  },
];
export const locationOptions = [
  {
    name: 'Neighbourhood setttings',
    icon: 'location-outline',
  },
  {
    name: 'Verify neighbourhood',
    icon: 'scan-circle-outline',
  },
  {
    name: 'Search alerts',
    icon: 'search-circle-outline',
  },
];

export const infoOptions = [
  {
    name: 'Get help',
    icon: 'information-circle-outline',
  },
  {
    name: 'Invite friends',
    icon: 'mail-outline',
  },
  {
    name: 'My rewards',
    icon: 'gift-outline',
  },
  {
    name: 'Share ShopApp',
    icon: 'share-social-outline',
  },
  {
    name: "What's new?",
    icon: 'mic-outline',
  },
  {
    name: 'FAQs',
    icon: 'help-circle-outline',
  },
  {
    name: 'Settings',
    icon: 'settings-outline',
  },
];

// SEARCH
// [
//   'armchair',
//   'air fryer',
//   'arm chair',
//   'apple watch',
//   'automatic cars',
//   'airpods',
//   'audi'
// ]
