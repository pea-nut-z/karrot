import express from "express";
import { Account } from "../model/index.js";
import { privateId } from "./helper.js";
import ShortUniqueId from "short-unique-id";

const router = express.Router();
const uid = new ShortUniqueId({ length: 4 });

const hideVIDFields = { _id: 0, __v: 0 };

router.post("/create", (req, res) => {
  const listing = req.body;
  const itemId = uid();
  Account.findOneAndUpdate(
    { _id: privateId },
    { $push: { items: { itemId, ...listing } }, $inc: { numOfItems: 1 } },
    { new: true, select: hideVIDFields },
    (err, doc) => {
      if (err) throw err;
      res.json({ doc, itemId });
    }
  );
});

router.get("/read/:itemId", (req, res) => {
  const { itemId } = req.params;
  Account.findOne({ _id: privateId }, { _id: 0, items: { $elemMatch: { itemId } } }, (err, doc) => {
    if (err) throw err;
    res.json({ doc: doc.items[0] });
  });
});

router.patch("/update/:itemId", (req, res) => {
  const data = req.body;
  const { itemId } = req.params;

  const changes = Object.keys(data).reduce(
    (acc, cur) => Object.assign(acc, { [`items.$.${cur}`]: data[cur] }),
    {}
  );

  Account.findOneAndUpdate(
    { _id: privateId, "items.itemId": itemId },
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

router.delete("/delete/:itemId", (req, res) => {
  const { itemId } = req.params;
  Account.findOneAndUpdate(
    { _id: privateId },
    {
      $pull: {
        items: {
          itemId,
        },
      },
      $inc: {
        numOfItems: -1,
      },
    },
    (err) => {
      if (err) throw err;
      res.send("removed item");
    }
  );
});

export default router;
