import express from "express";
import mongoose from "mongoose";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.patch("/:action/:key/:memberId/:itemId", (req, res) => {
  const { action, key, memberId, itemId } = req.params;
  const query = { id: memberId, "items.itemId": itemId };
  let subDocKey = `items.$.${key}`;
  const value = action === "add" ? 1 : -1;
  const update = { $inc: { [subDocKey]: value } };
  const promise1 = Account.findOneAndUpdate(query, update);

  const actionKey = action === "add" ? "$push" : "$pull";

  const promise2 = Activity.findOneAndUpdate(
    { privateId },
    {
      [actionKey]: { [key]: itemId },
    }
  );

  Promise.all([promise1, promise2])
    .then(() => res.end())
    .catch((err) => {
      throw err;
    });
});

router.get("/read/favourites", async (req, res) => {
  const doc = await Activity.aggregate([
    {
      $match: {
        privateId,
      },
    },
    {
      $unwind: "$favourites",
    },
    {
      $unwind: "$favourites.itemIds",
    },
    {
      $lookup: {
        from: "accounts",
        localField: "favourites.sellerId",
        foreignField: "id",
        as: "details",
      },
    },
    { $unwind: "$details" },
    {
      $project: {
        _id: 0,
        "details.id": 1,
        "details.location": 1,
        "details.items": {
          $filter: {
            input: "$details.items",
            as: "item",
            cond: { $eq: ["$$item.itemId", "$favourites.itemIds"] },
          },
        },
      },
    },
  ]);
  res.json(doc);
});

router.patch("/update/favourites/add/:sellerId/:itemId", async (req, res) => {
  const { action, sellerId, itemId } = req.params;
  try {
    const doc = await Activity.findOne({ privateId, "favourites.sellerId": sellerId });
    if (!doc) {
      console.log("reach");
      await Activity.findOneAndUpdate(
        { privateId },
        {
          $push: {
            favourites: {
              sellerId,
              itemIds: itemId,
            },
          },
        }
      );
    } else {
      await Activity.findOneAndUpdate(
        { privateId, "favourites.sellerId": sellerId },
        {
          $push: {
            "favourites.$.itemIds": itemId,
          },
        }
      );
    }
    res.send("done");
  } catch (err) {
    throw err;
  }
});

export default router;
