import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  privateId: reqStr,
  iReview: [String],
});

const IReview = model("myreviewtos", schema);
export default IReview;
