import express from "express";
import { Review, Activity } from "../model/index.js";
import { privateId } from "./helper.js";
const router = express.Router();

router.get("/read/:memberId", async (req, res) => {
  const { memberId } = req.params;

  const doc = await Review.aggregate([
    { $match: { id: memberId } },
    { $unwind: "$reviews" },
    {
      $lookup: {
        from: "accounts",
        localField: "reviews.reviewBy",
        foreignField: "id",
        as: "reviews.profile",
      },
    },
    {
      $project: {
        "reviews.privateId": 0,
        "reviews.profile._id": 0,
        "reviews.profile.joined": 0,
        "reviews.profile.__v": 0,
        "reviews.profile.draft": 0,
        "reviews.profile.items": 0,
        "reviews.profile.numOfItems": 0,
      },
    },
    {
      $group: {
        _id: "$_id",
        numOfReviews: {
          $first: "$numOfReviews",
        },
        reviews: {
          $addToSet: "$reviews",
        },
      },
    },
  ]);

  // handle error
  res.json(doc[0]);
});

router.post("/create/:memberId", (req, res) => {
  const { memberId } = req.params;
  const review = { reviewBy: privateId, ...req.body };
  const addReview = Review.findOneAndUpdate(
    { id: memberId },
    { $push: { reviews: review }, $inc: { numOfReviews: 1, totalRating: review.rating } }
  );
  const addiReview = Activity.findOneAndUpdate({ privateId }, { $push: { iReview: memberId } });

  Promise.all([addReview, addiReview])
    .then(() => {
      res.end();
    })
    .catch((err) => {
      throw err;
    });
});

export default router;
