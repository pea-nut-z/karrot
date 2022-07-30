import mongoose from "mongoose";
import { reqStr, defaultDate } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  userId: { type: mongoose.ObjectId },
  username: reqStr,
  location: reqStr,
  displayPic: reqStr,
  joined: defaultDate,
});

const Member = model("members", schema);
export default Member;
