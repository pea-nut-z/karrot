import "dotenv/config";
// import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";
import { Restriction, Listing, Account, Review, Favourite } from "./model/index.js";

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

// home -> get all initial states
app.get("/", (req, res) => {
  const myProfile = Account.findOne({ privateId }, { _id: 0 });
  const othersProfiles = Account.find({ _id: { $nin: privateId } }, { _id: 0, draft: 0 });
  const myListings = Listing.findOne({ id: publicId }, { _id: 0 });
  const othersListings = Listing.find({ id: { $nin: publicId } }, { _id: 0 });
  const myReviews = Review.find({ privateId }, { id: 0, _id: 0 });
  const myFavourites = Favourite.findOne({ privateId }, { id: 0, _id: 0 });
  const restrictions = Restriction.findOne({ privateId }, { id: 0, _id: 0 });

  Promise.all([
    myProfile,
    othersProfiles,
    myListings,
    othersListings,
    myReviews,
    myFavourites,
    restrictions,
  ])
    .then((docs) => {
      const othersProfilesData = docs[1];
      const othersListingsData = docs[3];
      const restrictions = { ...docs[6]._doc };

      // filter profiles and listings by "block by"
      const profilesDidNotBlockMe = othersProfilesData.filter(
        (profile) => !restrictions.blockBy.includes(profile.id)
      );
      const listingsDidNotBlockMe = othersListingsData.filter(
        (listing) => !restrictions.blockBy.includes(listing.id)
      );
      // hide who has blocked user
      delete restrictions.blockBy;

      res.status(200).json({
        myProfile: docs[0],
        othersProfiles: profilesDidNotBlockMe,
        myListings: docs[2].items,
        othersListings: listingsDidNotBlockMe,
        myReviews: docs[4],
        myFavourites: docs[5].items,
        restrictions,
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
