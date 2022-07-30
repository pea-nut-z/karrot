import mongoose from "mongoose";
import { reqStr, reqNum, reqBoolean, reqId, defaultDate, defaultNum } from "./values.js";

const { Schema, model } = mongoose;

const item = new Schema({
  itemId: reqId,
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
  userId: reqStr,
  items: [item],
});

const Listing = model("listings", listing);
export default Listing;
