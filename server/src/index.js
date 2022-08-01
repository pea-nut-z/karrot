import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { Listing, Member, Favourite } from "./model/index.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// current user: 8b9
// sign up -> create profile
app.post("/signup", async (req, res) => {
  const userId = new mongoose.Types.ObjectId().toString();
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

// home -> get profile, user's listings, sellers' listings(filter out restrictions), favourites
app.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const promise1 = Member.findOne({ userId });
  const promise2 = Listing.find();
  const promise3 = Favourite.findOne({ userId });

  Promise.all([promise1, promise2, promise3])
    .then((docs) => {
      const profile = docs[0];
      const userListings = docs[1].find((doc) => doc.userId === userId);
      const sellerListings = docs[1].filter((doc) => doc.userId !== userId);
      const favourites = docs[2];
      // console.log({ favourites });
      // console.log({ userListings });
      // console.log({ sellerListings });
      res.status(200).json(profile);
    })
    .catch((err) => console.log("ERROR: ", err));
});

// app.get("/:userId", async (req, res) => {
//   const { userId } = req.params;
//   const userProfile = await Member.findOne({ userId });
//   res.json(userProfile);
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
