import express from "express";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.patch("/update-view/:memberId/:itemId", (req, res) => {
  const { memberId, itemId } = req.params;

  const query = { id: memberId, "items.itemId": itemId };
  const update = { $inc: { "items.$.views": 1 } };

  const promise1 = Account.findOneAndUpdate(query, update);

  const promise2 = Activity.findOneAndUpdate(
    { privateId },
    {
      $push: { views: itemId },
    }
  );

  Promise.all([promise1, promise2])
    .then((docs) => res.json({ docs }))
    .catch((err) => {
      throw new Error(err);
    });
});

export default router;
