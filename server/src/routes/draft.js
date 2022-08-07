import express from "express";
import * as actions from "../actions.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const draft = await actions.getDraft();
  res.json({ draft });
});

router.delete("/delete", async (req, res) => {
  const result = await actions.deleteDraft();
  res.json({ result });
});

router.patch("/create", async (req, res) => {
  const draft = req.body;
  const result = await actions.createDraft(draft);
  res.json({ result });
});

export default router;
