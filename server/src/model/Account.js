import mongoose from "mongoose";
import { reqStr, defaultDate } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  id: reqStr,
  name: reqStr,
  location: reqStr,
  image: reqStr,
  joined: defaultDate,
  draft: { type: String, default: null }, // item id for listing draft
  feeds: {
    type: [String],
    default: [
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
  },
});

const Account = model("accounts", schema);
export default Account;
