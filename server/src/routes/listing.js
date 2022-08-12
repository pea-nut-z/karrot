import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction } from "../model/index.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();

const uid = new ShortUniqueId({ length: 4 });
let privateId = "62e87ec387aecd786da8d937";
const fieldsToHide = { _id: 0, __v: 0 };

router.get("/search", async (req, res) => {
  const { by, id, category, collection } = req.query;

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
          $group: {
            _id: "$_id",
            id: {
              $first: "$id",
            },
            name: {
              $first: "$name",
            },
            location: {
              $first: "$location",
            },
            image: {
              $first: "$image",
            },
            joined: {
              $first: "$joined",
            },
            draft: {
              $first: "$draft",
            },
            items: {
              $addToSet: "$items",
            },
          },
        },
        { $unset: ["_id"] },
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
