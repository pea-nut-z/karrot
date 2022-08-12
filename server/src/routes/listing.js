import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction } from "../model/index.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();

const uid = new ShortUniqueId({ length: 4 });
let privateId = "62e87ec387aecd786da8d937";
const fieldsToHide = { _id: 0, __v: 0 };

router.get("/search", async (req, res) => {
  const { by, category } = req.query;

  const restriction = await Restriction.findOne({ privateId });
  const baseFilters = [
    { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
    { id: { $nin: restriction.blockBy } },
  ];

  let docs;

  switch (by) {
    case "category":
      const moreFilters = [{ id: { $nin: restriction.hide } }, { id: { $nin: restriction.block } }];
      const categoryArr = category ? [...category] : restriction.feeds; //["Health & beauty"];
      docs = await Account.aggregate([
        { $match: { $and: [...baseFilters, ...moreFilters] } },
        { $unwind: "$items" },
        { $match: { "items.category": { $in: categoryArr } } },
        {
          $project: {
            id: 1,
            location: 1,
            "items.itemId": 1,
            "items.title": 1,
            "items.date": 1,
            "items.price": 1,
            "items.images": 1,
          },
        },
        {
          $group: {
            _id: "$_id",
            id: {
              $first: "$id",
            },
            location: {
              $first: "$location",
            },
            items: {
              $addToSet: "$items",
            },
          },
        },
      ]);
      break;
    case "words":
      break;
    default:
      return;
  }

  // handle error

  res.json({ docs });
});

router.post("/create", async (req, res) => {
  const listing = req.body;
  const itemId = uid();
  Account.findOneAndUpdate(
    { privateId },
    { $push: { items: { itemId, ...listing } } },
    { new: true, select: fieldsToHide },
    (err, doc) => {
      if (err) throw err;
      res.json({ doc, itemId });
    }
  );
});

router.patch("/update/:itemId", async (req, res) => {
  const changes = Object.keys(req.body).reduce(
    (acc, cur) => Object.assign(acc, { [`items.$.${cur}`]: changes[cur] }),
    {}
  );

  const { itemId } = req.params;
  Account.findOneAndUpdate(
    { privateId, "items.itemId": itemId },
    {
      $set: { ...changes },
    },
    { new: true, select: fieldsToHide },
    (err, doc) => {
      if (err) throw err;
      res.json({ doc });
    }
  );
});

export default router;

// const key = collection === "profile" ? "id" : "items.itemId";
// docs = await Account.findOne({ $and: [...baseFilters, { [key]: id }] }, fieldsToHide);
