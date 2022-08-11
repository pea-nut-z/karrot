import express from "express";
import { Review } from "../model/index.js";
const router = express.Router();

router.get("/:memberId", (req, res) => {
  const { memberId } = req.params;
  Review.findOne({ id: memberId }, { _id: 0, __v: 0 }, (err, doc) => {
    if (err) throw err;
    res.json({ doc });
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
