import express from "express";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate({ privateId }, { ...changes }, (err) => {
    if (err) throw new Error(err);
    res.send("resolved");
  });
});

// move to a signup route
router.post("/create", (req, res) => {
  Activity.create({ privateId }, (err, doc) => {
    if (err) throw new Error(err);
    res.json({ doc });
  });
});

export default router;
