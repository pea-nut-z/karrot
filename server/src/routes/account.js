import express from "express";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "6346355173799d48dc57d225";

router.post("/create", async (req, res) => {
  const data = req.body;
  const account = await Account.create(data);
  res.json({ account });
});

export default router;
