import express from "express";
import { Account } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.get("/", (req, res) => {
  Account.findOne({ privateId }, (err, account) => {
    if (err) throw new Error(err);
    res.json({ account });
  });
});

router.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
    if (err) throw new Error(err);
    res.send("resolved");
  });
});

export default router;
