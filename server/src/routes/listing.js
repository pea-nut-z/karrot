import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction } from "../model/index.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();

const uid = new ShortUniqueId({ length: 4 });
let privateId = "62e87ec387aecd786da8d937";

// exclude mine
//   const listings = await Account.find({ id: { $nin: privateId } });

router.get("/", async (req, res) => {
  const { home, id, itemId } = req.query;

  const restriction = await Restriction.findOne({ privateId });
  let docs;

  if (home) {
    // filters: Block-Hide-Category
    const query = {
      $and: [
        { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
        { id: { $nin: restriction.blockBy } },
        { id: { $nin: restriction.hide } },
        { id: { $nin: restriction.block } },
      ],
    };
    docs = await Account.aggregate([
      { $match: query },
      { $unset: ["_id", "__v"] },
      { $unwind: "$items" },
      { $match: { "items.category": { $in: restriction.feeds } } },
    ]);
  } else if (id && itemId) {
    docs = await Account.aggregate([
      { $match: { id } },
      { $unset: ["_id", "__v"] },
      { $unwind: "$items" },
      { $match: { "items.itemId": itemId } },
    ]);
  }

  res.json({ docs });
});

export default router;
