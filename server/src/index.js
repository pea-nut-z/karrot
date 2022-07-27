import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Listing from "./model/Listing.js";
import { testname } from "./tester.js";

console.log({ testname });

mongoose.connect(
  process.env.DATABASE_URL,
  () => {
    console.log("db connected");
  },
  (err) => {
    console.error(`db error: ${err}`);
  }
);

const app = express();

app.get("/getRequest/:name", (req, res) => {
  res.send(`Testing name: ${req.params.name}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

const saveListing = async () => {
  const listing = new Listing({
    userId: 111,
    itemId: 123,
    Status: "Active",
    Date: "Date",
  });

  await listing.save();
  console.log("saved listing");
};

saveListing();
