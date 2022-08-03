import mongoose from "mongoose";
import { reqStr, reqNum, reqBoolean, defaultDate, defaultNum } from "./values.js";

const { Schema, model } = mongoose;

const item = new Schema({
  itemId: reqStr,
  status: reqStr,
  date: defaultDate,
  chats: defaultNum,
  favourites: defaultNum,
  views: defaultNum,
  images: [String],
  // an array of img strings, but could be a RN img obj [10]; check later
  title: reqStr,
  price: reqNum,
  free: reqBoolean,
  negotiable: reqBoolean,
  category: reqStr,
  description: reqStr,
});

const listing = new Schema({
  id: reqStr,
  items: [item],
});

const Listing = model("listings", listing);
export default Listing;
