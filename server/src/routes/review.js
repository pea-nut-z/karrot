import express from "express";
import { Review } from "../model/index.js";
const router = express.Router();

router.get("/:memberId", (req, res) => {
  const { memberId } = req.params;
  Review.findOne({ id: memberId }, (err, review) => {
    if (err) throw new Error(err);
    res.json({ review });
  });
});

// router.patch("/update", (req, res) => {
//   const changes = req.body;
//   Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
//     if (err) throw new Error(err);
//     res.send("resolved");
//   });
// });

export default router;
