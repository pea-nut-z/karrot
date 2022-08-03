import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  id: reqStr,
  block: [String],
  blockBy: [String],
  hide: [String],
});

const Review = model("restriction", schema);
export default Review;
