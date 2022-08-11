import express from "express";
import { Restriction } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.get("/:action/:id", (req, res) => {
  const { action, id } = req.params;
  let result;
  switch (action) {
    case "block":
    case "hide":
      Restriction.findOneAndUpdate({ privateId }, { $push: { action: id } });
    default:
      return;
  }
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
