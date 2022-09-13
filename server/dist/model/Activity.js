import mongoose from "mongoose";
import { reqStr, defaultArr } from "./values.js";
const {
  Schema,
  model
} = mongoose;
const schema = new Schema({
  privateId: reqStr,
  favourites: defaultArr,
  views: defaultArr,
  chats: defaultArr,
  iReview: defaultArr
});
const Activity = model("activities", schema);
export default Activity;