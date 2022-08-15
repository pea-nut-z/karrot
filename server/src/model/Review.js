import mongoose from "mongoose";
import { reqStr, reqNum, defaultDate } from "./values.js";

const { Schema, model } = mongoose;

const details = new Schema({
  reviewBy: reqStr,
  date: defaultDate,
  rating: reqNum,
  headline: reqStr,
  review: reqStr,
});

const review = new Schema({
  id: reqStr,
  privateId: reqStr,
  reviews: [details],
  totalRating: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
});

const Review = model("reviews", review);
export default Review;
