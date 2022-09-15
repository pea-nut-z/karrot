import express from "express";
import mongoose from "mongoose";
import { Account, Activity, Restriction, Review } from "../model/index.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();
const uid = new ShortUniqueId({ length: 4 });

let privateId = "62e87ec387aecd786da8d937";
const hideVIDFields = { _id: 0, __v: 0 };
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

router.get("/filter", async (req, res) => {
  console.log("reached backend");

  const { feeds, category } = req.query;

  const restriction = await Restriction.findOne({ privateId });
  const baseFilters = [
    { _id: { $nin: [mongoose.Types.ObjectId(privateId)] } },
    { id: { $nin: restriction.blockBy } },
    { id: { $nin: restriction.hide } },
    { id: { $nin: restriction.block } },
  ];

  let docs;

  if (feeds) {
    docs = await Account.aggregate([
      { $match: { $and: [...baseFilters] } },
      { $unwind: "$items" },
      {
        $match: {
          $and: [{ "items.category": { $in: restriction.feeds } }, { "items.status": "Active" }],
        },
      },
      {
        $project: itemCardFields,
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
  }

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
      const fav = docs[0].favourites.includes(itemId);
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
    const groups = await Account.aggregate([
      { $match: query },
      { $unwind: "$items" },
      { $project: itemCardFields },
      {
        $group: {
          _id: "$items.status",
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

    let getProfile = true;
    const profile = {};
    const listings = {};

    groups.forEach((group) => {
      if (getProfile) {
        profile.id = group.id;
        profile.location = group.location;
        getProfile = false;
      }
      listings[group._id] = group.items;
    });
    memberId && delete listings.Hidden;
    res.json({ profile, listings });
  } catch (err) {
    throw err;
  }
});

router.post("/create", async (req, res) => {
  const listing = req.body;
  const itemId = uid();
  Account.findOneAndUpdate(
    { privateId },
    { $push: { items: { itemId, ...listing } }, $inc: { numOfItems: 1 } },
    { new: true, select: hideVIDFields },
    (err, doc) => {
      if (err) throw err;
      res.json({ doc, itemId });
    }
  );
});

router.patch("/update/:itemId", async (req, res) => {
  const data = req.body;
  const changes = Object.keys(req.body).reduce(
    (acc, cur) => Object.assign(acc, { [`items.$.${cur}`]: data[cur] }),
    {}
  );

  const { itemId } = req.params;
  Account.findOneAndUpdate(
    { privateId, "items.itemId": itemId },
    {
      $set: { ...changes },
    },
    { new: true, select: hideVIDFields },
    (err, doc) => {
      if (err) throw err;
      res.json({ doc });
    }
  );
});

export default router;
