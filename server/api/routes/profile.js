function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import express from "express";
import { Account, Activity, Restriction, Review } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";
router.patch("/update", (req, res) => {
  const changes = req.body;
  Account.findOneAndUpdate({
    privateId
  }, _objectSpread({}, changes), err => {
    if (err) throw err;
    res.send("resolved");
  });
});
router.get("/draft", async (req, res) => {
  Account.findOne({
    privateId
  }, {
    draft: 1,
    _id: 0
  }, (err, doc) => {
    if (err) throw err;
    res.json({
      doc
    });
  });
});
router.get("/read/:memberId", (req, res) => {
  const {
    memberId
  } = req.params; // get profile -> name image location
  // get number of items -> othersProfile: no hidden items; myProfilo: Hidden,Sold,Active
  // get reviews -> numOfReview
  // get block -> if othersProfile; access by privateId and check if member block by me

  const getAccount = Account.findOne({
    id: memberId
  }, {
    name: 1,
    image: 1,
    location: 1,
    numOfItems: 1,
    id: 1,
    _id: 0
  });
  const getReview = Review.findOne({
    id: memberId
  }, {
    numOfReviews: 1,
    totalRating: 1,
    _id: 0
  });
  Promise.all([getAccount, getReview]).then(async docs => {
    const account = docs[0];
    const review = docs[1];
    let hide = false;
    let block = false;
    const checkRestriction = memberId !== account.id;

    if (checkRestriction) {
      const getRestriction = await Restriction.findOne({
        privateId
      }, {
        hide: 1,
        block: 1
      });
      if (getRestriction.block.includes(memberId)) block = true;
      if (getRestriction.hide.includes(memberId)) hide = true;
    }

    res.json({
      account,
      review,
      hide,
      block
    });
  });
});
export default router;