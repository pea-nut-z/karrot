import express from "express";
import { Account, Restriction, Review } from "../model/index.js";
const router = express.Router();
let privateId = "6346355173799d48dc57d225";

router.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate({ _id:privateId }, { ...changes }, (err) => {
    if (err) throw err;
    res.send("resolved");
  });
});

router.get("/read", (req, res) => {
  Account.findOne({ _id: privateId }, { image: 1, name: 1, location: 1, id: 1 }, (err, doc) => {
    if (err) throw err;
    res.json(doc);
  });
});

router.get("/draft", (req, res) => {
  Account.findOne({ _id:privateId }, { draft: 1, _id: 0 }, (err, doc) => {
    if (err) throw err;
    res.json({ doc });
  });
});

router.get("/get/:memberId", (req, res) => {
  const { memberId } = req.params;
  const getAccount = Account.findOne(
    { id: memberId },
    { name: 1, image: 1, location: 1, numOfItems: 1, id: 1, _id: 0 }
  );
  const getReview = Review.findOne({ id: memberId }, { numOfReviews: 1, totalRating: 1, _id: 0 });

  Promise.all([getAccount, getReview]).then(async (docs) => {
    const account = docs[0];
    const review = docs[1];
    let hide = false;
    let block = false;

    const checkRestriction = memberId !== account.id;
    if (checkRestriction) {
      const getRestriction = await Restriction.findOne({ privateId }, { hide: 1, block: 1 });
      if (getRestriction.block.includes(memberId)) block = true;
      if (getRestriction.hide.includes(memberId)) hide = true;
    }
    res.json({ account, review, hide, block });
  });
});

export default router;
