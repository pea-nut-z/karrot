import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction } from "../model/index.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();

const uid = new ShortUniqueId({ length: 4 });
let privateId = "62e87ec387aecd786da8d937";

// exclude mine
//   const listings = await Account.find({ id: { $nin: privateId } });

router.get("/search", async (req, res) => {
  const { by, id, category, collection } = req.query;

  const restriction = await Restriction.findOne({ privateId });
  const baseFilters = [
    { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
    { id: { $nin: restriction.blockBy } },
  ];
  const fieldsToHide = { _id: 0, __v: 0 };

  let docs;

  switch (by) {
    case "category":
      const moreFilters = [{ id: { $nin: restriction.hide } }, { id: { $nin: restriction.block } }];
      const categoryArr = category ? [...category] : restriction.feeds;
      docs = await Account.aggregate([
        { $match: { $and: [...baseFilters, ...moreFilters] } },
        { $unset: ["_id", "__v"] },
        { $unwind: "$items" },
        { $match: { "items.category": { $in: categoryArr } } },
      ]);
      break;
    case "id":
      const key = collection === "profile" ? "id" : "items.itemId";
      docs = await Account.findOne({ $and: [...baseFilters, { [key]: id }] }, fieldsToHide);
      break;
    case "words":
      break;
    default:
      return;
  }

  // handle error

  res.json({ docs });
});

router.post("/item", async (req, res) => {
  const { listing } = req.body;
  Account.findOneAndUpdate(
    { privateId },
    { $push: { items: { itemId: uid(), ...listing } } },
    (err) => {
      if (err) throw err;
      res.send("resolved");
    }
  );
});
export default router;
