import express from "express";
import { Review, Activity } from "../model/index.js";
const router = express.Router();
const privateId = "62e87ec387aecd786da8d937";

router.get("/read/:memberId", (req, res) => {
  const { memberId } = req.params;
  Review.findOne({ id: memberId }, { _id: 0, __v: 0 }, (err, doc) => {
    if (err) throw err;
    res.json({ doc });
  });
});

router.post("/create/:memberId", (req, res) => {
  const { memberId } = req.params;
  const data = req.body;
  const review = { reviewBy: privateId, ...data };
  const addReview = Review.findOneAndUpdate({ id: memberId }, { $push: { reviews: review } });
  const addiReview = Activity.findOneAndUpdate({ privateId }, { $push: { iReview: memberId } });

  Promise.all([addReview, addiReview])
    .then(() => {
      res.end();
    })
    .catch((err) => {
      throw err;
    });
});

// router.patch("/update", (req, res) => {
//   const changes = req.body;
//   Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
//     if (err) throw err;
//     res.send("resolved");
//   });
// });

export default router;
