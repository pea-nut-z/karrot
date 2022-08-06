import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  privateId: reqStr,
  items: [reqStr],
});

const Favourite = model("favourites", schema);
export default Favourite;
