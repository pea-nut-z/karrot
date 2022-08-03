import "dotenv/config";
// import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";
import { Listing, Account, Favourite } from "./model/index.js";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// kept on server; db.accounts._id
let privateId = "62e87ec387aecd786da8d937";
// public; db.account.id
let publicId = "z69D";

// create ids
const uid = new ShortUniqueId({ length: 4 });

// sign up -> create profile
app.post("/signup", async (req, res) => {
  const profile = await Account.create({
    id: uid(),
    ...req.body,
  });
  publicId = profile.id;
  privateId = profile._id;
  delete profile._id;
  res.json(profile);
});

// home -> get profile, user's account, sellers' listings(filter out restrictions), favourites
app.get("/", (req, res) => {
  const myProfile = Account.findOne({ privateId }, { _id: 0 });
  const sellerProfiles = Account.find({ _id: { $nin: privateId } }, { _id: 0, draft: 0 });
  const myListings = Listing.findOne({ id: publicId });
  const sellerListings = Listing.find({ id: { $nin: publicId } }, { _id: 0 });
  const myFavourites = Favourite.findOne({ privateId }, { id: 0 });

  Promise.all([myProfile, sellerProfiles, myListings, sellerListings, myFavourites])
    .then((docs) => {
      res.status(200).json({
        myProfile: docs[0],
        sellerProfiles: docs[1],
        myListings: docs[2].items,
        sellerListings: docs[3],
        myFavourites: docs[4].items,
      });
    })
    .catch((err) => console.log("SERVER/GET INITIAL DATA ERROR: ", err));
});

// my account -> edit profile image and/or name
app.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate(privateId, changes, (err, doc) => {
    if (err) return res.send(500, { error: err });
    res.status(200).json({ msg: "done" });
  });
});

// sell -> list item
app.post("/:userId/create", (req, res) => {
  const payload = req.body;
  const itemId = uid();
  Listing.findOne({ privateId }, async (err, doc) => {
    if (err) res.status(500).send(err);
    if (doc) {
      console.log("found doc so push");
      await Listing.updateOne({ privateId }, { $push: { items: { itemId, ...payload } } });
    } else {
      console.log("no doc found so create");
      await Listing.create({
        id: publicId,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
