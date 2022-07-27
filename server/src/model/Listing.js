import mongoose from "mongoose";
const { Schema, model } = mongoose;
const listingSchema = new Schema({
  userId: Number,
  itemId: Number,
  Status: String,
  Date: String,
});

const Listing = model("Listing", listingSchema);
export default Listing;
