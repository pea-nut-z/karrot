function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import express from "express";
import { Review, Activity, Account } from "../model/index.js";
const router = express.Router();
const privateId = "62e87ec387aecd786da8d937";
router.get("/read/:memberId", async (req, res) => {
  const {
    memberId
  } = req.params; //  Review.findOne(
  //   { id: memberId },
  //   { _id: 0, __v: 0, privateId: 0, "reviews.privateId": 0 }
  //   ,
  //   (err, doc) => {
  //     if (err) throw err;
  //     const reviews = doc.reviews(review => {
  //     })
  //     res.json({ doc });
  //   }
  // );

  const doc = await Review.aggregate([{
    $match: {
      id: memberId
    }
  }, {
    $unwind: "$reviews"
  }, {
    $lookup: {
      from: "accounts",
      localField: "reviews.reviewBy",
      foreignField: "id",
      as: "reviews.profile"
    }
  }, {
    $project: {
      "reviews.privateId": 0,
      "reviews.profile._id": 0,
      "reviews.profile.joined": 0,
      "reviews.profile.__v": 0,
      "reviews.profile.draft": 0,
      "reviews.profile.items": 0,
      "reviews.profile.numOfItems": 0
    }
  }, {
    $group: {
      _id: "$_id",
      numOfReviews: {
        $first: "$numOfReviews"
      },
      reviews: {
        $addToSet: "$reviews"
      }
    }
  }]); // handle error

  res.json(doc[0]);
});
router.post("/create/:memberId", (req, res) => {
  const {
    memberId
  } = req.params;

  const review = _objectSpread({
    reviewBy: privateId
  }, req.body);

  const addReview = Review.findOneAndUpdate({
    id: memberId
  }, {
    $push: {
      reviews: review
    },
    $inc: {
      numOfReviews: 1,
      totalRating: review.rating
    }
  });
  const addiReview = Activity.findOneAndUpdate({
    privateId
  }, {
    $push: {
      iReview: memberId
    }
  });
  Promise.all([addReview, addiReview]).then(() => {
    res.end();
  }).catch(err => {
    throw err;
  });
}); // router.patch("/update", (req, res) => {
//   const changes = req.body;
//   Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
//     if (err) throw err;
//     res.send("resolved");
//   });
// });

export default router;