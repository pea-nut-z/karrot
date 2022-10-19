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
  images: [Schema.Types.Mixed],
  title: reqStr,
  price: reqNum,
  free: reqBoolean,
  negotiable: reqBoolean,
  category: reqStr,
  description: reqStr,
});

const schema = new Schema({
  id: reqStr,
  privateId: reqStr,
  name: reqStr,
  location: reqStr,
  image: reqStr,
  joined: defaultDate,
  draft: { type: Schema.Types.Mixed, default: false }, // item id for listing draft
  items: [item],
  numOfItems: defaultNum,
});

const Account = model("accounts", schema);
export default Account;
