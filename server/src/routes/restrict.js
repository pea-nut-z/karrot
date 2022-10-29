import express from "express";
import { Restriction } from "../model/index.js";
import { privateId } from "./helper.js";
const router = express.Router();

router.get("/read/feed", (req, res) => {
  Restriction.findOne({ privateId }, { _id: 0, feed: 1 }, (err, doc) => {
    if (err) throw err;
    res.json({ doc });
  });
});

router.post("/update/feed", (req, res) => {
  const { values } = req.body;

  Restriction.findOneAndUpdate({ privateId }, { feed: values }, (err, doc) => {
    if (err) throw err;
    res.send("updated feed");
  });
});

router.patch("/:action/:key/:value", async (req, res) => {
  const { action, key, value } = req.params;

  const operator = action === "push" ? "$push" : "$pull";

  try {
    const myDoc = await Restriction.findOneAndUpdate(
      { privateId },
      { [operator]: { [key]: value } }
    );
    if (key == "block") {
      const memberUpdate = { [operator]: { blockBy: myDoc.id } };
      await Restriction.findOneAndUpdate({ id: value }, memberUpdate);
    }
    res.send(`${action} ${key} successfully`);
  } catch (err) {
    throw err;
  }
});

export default router;
