import mongoose from "mongoose";
const { Schema, model } = mongoose;
const schema = new Schema({
  userId: { type: Number, require: true },
  itemId: { type: Number, require: true },
  Status: { type: String, require: true },
  Date: { type: String, default: Date.now() },
});

const Listing = model("listings", schema);
export default Listing;
