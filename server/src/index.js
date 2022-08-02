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

// kept private on server
let accountId = "62e87ec387aecd786da8d937";

// sign up -> create profile
app.post("/signup", async (req, res) => {
  const uid = new ShortUniqueId({ length: 4 });
  const id = uid();
  const profile = await Account.create({
    id,
    ...req.body,
  });
  accountId = profile._id;
  delete profile._id;
  res.json(profile);
});

// home -> get profile, user's account, sellers' listings(filter out restrictions), favourites
app.get("/", (req, res) => {
  const promise1 = Account.findOne({ accountId }, { _id: 0 });
  const promise2 = Listing.find();
  const promise3 = Favourite.findOne({ accountId });

  Promise.all([promise1, promise2, promise3])
    .then((docs) => {
      const myProfile = docs[0];
      // const userListings = docs[1].find((doc) => doc.myId === myId);
      // const sellerListings = docs[1].filter((doc) => doc.myId !== myId);
      // const favourites = docs[2];
      // console.log({ favourites });
      // console.log({ userListings });
      res.status(200).json(myProfile);
    })
    .catch((err) => console.log("GET INITIAL DATA ERROR: ", err));
});

// my account -> edit profile image and/or name
app.patch("/update", async (req, res) => {
  const changes = req.body;

  console.log({ changes });

  Account.findOneAndUpdate(accountId, changes, (err, doc) => {
    console.log({ doc });
    if (err) return res.send(500, { error: err });
    res.status(200).json({ msg: "done" });
  });
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
