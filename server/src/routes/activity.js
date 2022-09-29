import express from "express";
import mongoose from "mongoose";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

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

router.patch("/add/favourite/:memberId/:itemId", async (req, res) => {
  const { memberId, itemId } = req.params;
  try {
    const doc = await Activity.findOne({ privateId, "favourites.sellerId": memberId });
    if (!doc) {
      await Activity.findOneAndUpdate(
        { privateId },
        {
          $push: {
            favourites: {
              sellerId: memberId,
              itemIds: itemId,
            },
          },
        }
      );
    } else {
      await Activity.findOneAndUpdate(
        { privateId, "favourites.sellerId": memberId },
        {
          $push: {
            "favourites.$.itemIds": itemId,
          },
        }
      );
    }
    console.log(memberId, itemId);

    const query = { id: memberId, "items.itemId": itemId };
    const update = { $inc: { "items.$.favourites": 1 } };
    await Account.findOneAndUpdate(query, update);

    res.send("added favourite");
  } catch (err) {
    throw err;
  }
});

router.patch("/remove/favourite/:memberId/:itemId", async (req, res) => {
  const { memberId, itemId } = req.params;
  try {
    await Activity.findOneAndUpdate(
      { privateId, "favourites.sellerId": memberId },
      {
        $pull: {
          "favourites.$.itemIds": itemId,
        },
      }
    );

    const query = { id: memberId, "items.itemId": itemId };
    const update = { $inc: { "items.$.favourites": -1 } };
    await Account.findOneAndUpdate(query, update);

    res.send("removed favourite");
  } catch (err) {
    throw err;
  }
});

export default router;
