import mongoose from "mongoose";
const { Schema, model } = mongoose;
const schema = new Schema({
  username: { type: String, require: true },
  location: { type: String, require: true },
  displayPic: { type: String, require: true },
  joined: { type: String, default: Date.now() },
});

const Member = model("members", schema);
export default Member;
