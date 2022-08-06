import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  privateId: reqStr,
  block: [String],
  blockBy: [String],
  hide: [String],
  feeds: {
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

const Review = model("restriction", schema);
export default Review;
