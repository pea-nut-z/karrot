import mongoose from "mongoose";
import { reqStr, reqNum, defaultDate } from "./values.js";

const { Schema, model } = mongoose;

const iReview = new Schema({
  id: reqStr,
  reviewId: reqStr,
});

const reviewMe = new Schema({
  reviewerId: reqStr,
  date: defaultDate,
  rating: reqNum,
  headline: reqStr,
  review: reqStr,
});

const review = new Schema({
  id: reqStr,
  reviewMe: [reviewMe],
  totalRating: { type: Number, default: 0 },
  numOfReviews: { type: Number, default: 0 },
  iReview: [iReview],
});

const Review = model("reviews", review);
export default Review;
