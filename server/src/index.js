import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Listing, Member } from "./model/index.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// sign up -> create profile
app.post("/signup", async (req, res) => {
  const userId = new mongoose.Types.ObjectId();
  const userProfile = await Member.create({
    userId,
    ...req.body,
  });
  res.json(userProfile);
});

// sell -> list item
app.post("/:userId/create", async (req, res) => {
  const { userId } = req.params;
  const itemId = mongoose.Types.ObjectId();
  const payload = req.body;

  // check if user has listed an item
  // if so, add to its listing
  // else, create a new doc
  Listing.findOne({ userId }, async (err, doc) => {
    console.log({ userId });
    if (err) res.status(500).send(err);
    if (doc) {
      console.log("found doc so push");
      console.log(doc);
      await Listing.updateOne({ userId }, { $push: { items: { itemId, ...payload } } });
    } else {
      console.log("no doc found so create");
      await Listing.create({
        userId,
        items: [
          {
            itemId,
            ...payload,
          },
        ],
      });
    }
  });

  res.send("done");
});

// home -> get profile, user's listings, sellers' listings
app.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const profile = await Member.findOne({ userId });
  const userListings = await Listing.findOne({ userId });
  res.json(userListings);
});

app.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const userProfile = await Member.findOne({ userId });
  res.json(userProfile);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
