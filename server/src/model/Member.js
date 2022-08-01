import mongoose from "mongoose";
import { reqStr, defaultDate } from "./values.js";

const { Schema, model, ObjectId } = mongoose;

const schema = new Schema({
  userId: { type: ObjectId },
  username: reqStr,
  location: reqStr,
  displayPic: reqStr,
  joined: defaultDate,
});

const Member = model("members", schema);
export default Member;
