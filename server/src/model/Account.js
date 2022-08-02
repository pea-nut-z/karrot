import mongoose from "mongoose";
import { reqStr, defaultDate } from "./values.js";

const { Schema, model } = mongoose;

const schema = new Schema({
  id: reqStr,
  name: reqStr,
  location: reqStr,
  image: reqStr,
  joined: defaultDate,
});

const Account = model("accounts", schema);
export default Account;
