import express from "express";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";

router.post("/create", async (req, res) => {
  const data = req.body;
  const account = await Account.create(data);
  res.json({ account });
  // Activity.create({ privateId }, (err, doc) => {
  //   if (err) throw err;
  //   res.json({ doc });
  // });
});

export default router;
