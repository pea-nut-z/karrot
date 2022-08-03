import mongoose from "mongoose";
import { reqStr } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  id: reqStr,
  items: [reqStr],
});

const Favourite = model("favourites", schema);
export default Favourite;
