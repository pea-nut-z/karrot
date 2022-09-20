import mongoose from "mongoose";
import { reqStr, defaultArr } from "./values.js";
const {
  Schema,
  model
} = mongoose;
const favourite = new Schema({
  sellerId: reqStr,
  itemIds: defaultArr
});
const schema = new Schema({
  privateId: reqStr,
  favourites: [favourite],
  views: defaultArr,
  chats: defaultArr,
  iReview: defaultArr
});
const Activity = model("activities", schema);
export default Activity;