import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction, Review } from "../model/index.js";
import { privateId } from "./helper.js";

const router = express.Router();

const itemCardFields = {
  id: 1,
  location: 1,
  "items.itemId": 1,
  "items.title": 1,
  "items.date": 1,
  "items.price": 1,
  "items.images": 1,
  "items.status": 1,
};

router.get("/filter/:by", async (req, res) => {
  const { by } = req.params;
  const { value } = req.query;

  const restriction = await Restriction.findOne({ privateId });

  let baseFilters = [
    { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
    { id: { $nin: restriction.blockBy } },
    { id: { $nin: restriction.hide } },
    { id: { $nin: restriction.block } },
  ];

  let filters;

  switch (by) {
    case "category":
      filters = {
        $and: [
          ...baseFilters,
          { "items.category": { $regex: value } },
          { "items.status": "Active" },
        ],
      };
      break;
    case "word":
      const expression = new RegExp(`\\b${value}\\b`, "i");
      filters = {
        $and: [
          ...baseFilters,
          {
            $or: [
              { "items.category": { $regex: expression } },
              { "items.title": { $regex: expression } },
              { "items.description": { $regex: expression } },
            ],
          },
        ],
        $or: [{ "items.status": "Active" }, { "items.status": "Sold" }],
      };
      break;
    default:
      filters = {
        $and: [
          ...baseFilters,
          { "items.category": { $in: restriction.feeds } },
          { "items.status": "Active" },
        ],
      };
  }

  console.log({ filters });

  let docs = await Account.aggregate([
    { $unwind: "$items" },
    {
      $match: {
        ...filters,
      },
    },
    {
      $project: itemCardFields,
    },
  ]);
  console.log({ docs });

  // handle error
  res.json({ docs });
});

router.get("/read/item/:memberId/:itemId", (req, res) => {
  const { memberId, itemId } = req.params;

  const checkFavAndView = Activity.findOne({ privateId });
  const checkHide = Restriction.findOne({ privateId });
  const getTwoOtherItems = Account.aggregate([
    { $match: { id: memberId } },
    { $unwind: "$items" },
    { $match: { $and: [{ "items.itemId": { $ne: itemId } }, { "items.status": "Active" }] } },
    { $limit: 2 },
    { $addFields: { "items.image": { $first: "$items.images" } } },
    {
      $project: {
        "items.itemId": 1,
        "items.title": 1,
        "items.price": 1,
        "items.image": 1,
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $addToSet: "$items",
        },
      },
    },
  ]);
  const getReviewData = Review.findOne({ id: memberId }, { numOfReviews: 1, totalRating: 1 });

  Promise.all([checkFavAndView, checkHide, getTwoOtherItems, getReviewData])
    .then(async (docs) => {
      const favSeller = docs[0].favourites.filter((fav) => fav.sellerId == memberId);
      const fav = favSeller[0]?.itemIds.includes(itemId);
      const view = docs[0].views.includes(itemId);
      const hide = docs[1].hide.includes(itemId);
      const twoOtherItems = docs[2].length == 0 ? [] : docs[2][0]["items"];
      const review = docs[3];
      const curItemFields = { name: 1, location: 1, image: 1, "items.$": 1 };

      if (!view) {
        const updateActivityView = Activity.findOneAndUpdate(
          { privateId },
          { $push: { views: itemId } }
        );

        const updateListingView = Account.findOneAndUpdate(
          { id: memberId, "items.itemId": itemId },
          { $inc: { "items.$.views": 1 } },
          { select: curItemFields }
        );

        Promise.all([updateActivityView, updateListingView])
          .then((docs) => {
            res.json({ fav, hide, twoOtherItems, listing: docs[1], review });
          })
          .catch((err) => {
            throw err;
          });
      } else {
        Account.findOne({ id: memberId, "items.itemId": itemId }, curItemFields, (err, doc) => {
          if (err) throw err;
          res.json({ fav, hide, twoOtherItems, listing: doc, review });
        });
      }
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/read/items", async (req, res) => {
  const { memberId } = req.query;
  const query = memberId ? { id: memberId } : { _id: mongoose.Types.ObjectId(privateId) };

  try {
    const unwindDocs = await Account.aggregate([
      { $match: query },
      { $unwind: "$items" },
      { $project: itemCardFields },
    ]);

    const docs = {
      Active: [],
      Sold: [],
      Hidden: [],
    };

    for (const doc of unwindDocs) {
      if (memberId && doc.items.status == "Hidden") continue;
      docs[doc.items.status].push(doc);
    }
    res.json({ docs });
  } catch (err) {
    throw err;
  }
});

export default router;
