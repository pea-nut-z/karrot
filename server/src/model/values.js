import mongoose from "mongoose";

export const reqStr = {
  type: String,
  require: true,
};

export const reqNum = {
  type: Number,
  require: true,
};

export const reqBoolean = {
  type: Boolean,
  require: true,
};

export const reqId = {
  type: mongoose.ObjectId,
  require: true,
};

export const defaultDate = {
  type: String,
  default: Date.now(),
};

export const defaultNum = {
  type: Number,
  default: 0,
};
