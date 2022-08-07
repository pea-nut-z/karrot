import mongoose from "mongoose";
import { reqStr, defaultDate, defaultNum, reqNum, reqBoolean } from "./values.js";

const { Schema, model } = mongoose;

const item = new Schema({
  itemId: reqStr,
  status: { type: String, default: "Active" },
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

const schema = new Schema({
  id: reqStr,
  name: reqStr,
  location: reqStr,
  image: reqStr,
  joined: defaultDate,
  draft: { type: Schema.Types.Mixed, default: null }, // item id for listing draft
  items: [item],
});

const Account = model("accounts", schema);
export default Account;
