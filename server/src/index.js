import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Listing, Member } from "./model/index.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();

app.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  const result = await Member.findOne({ userId: id });
  console.log({ result });
  res.send("found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
