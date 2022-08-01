import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const item = new Schema({
  sellerId: reqStr,
  itemId: reqStr,
});

const favourite = new Schema({
  userId: reqStr,
  favourites: [item],
});

const Favourite = model("favourites", favourite);
export default Favourite;
