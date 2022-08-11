import express from "express";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
    if (err) throw err;
    res.send("resolved");
  });
});

router.get("/draft", async (req, res) => {
  Account.findOne({ privateId }, { draft: 1, _id: 0 }, (err, doc) => {
    if (err) throw err;
    res.json({ doc });
  });
});

export default router;
