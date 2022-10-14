import express from "express";
import { Account, Activity } from "../model/index.js";
import { privateId } from "./helper.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const data = req.body;
  const account = await Account.create(data);
  res.json({ account });
});

export default router;
