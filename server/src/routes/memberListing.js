import express from "express";
import { Account } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.patch("/add-view/:memberId/:itemId", (req, res) => {
  const { memberId, itemId } = req.params;
  const query = { id: memberId, "items.itemId": itemId };
  const update = { $inc: { "items.$.views": 1 } };
  Account.findOneAndUpdate(query, update, (err, account) => {
    if (err) throw new Error(err);
    res.send("done");
  });
});

export default router;
