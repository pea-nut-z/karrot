import express from "express";
import mongoose from "mongoose";
import Favourites from "../../../client/src/screens/my-account/Favourites.js";
import { Account, Activity } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";
router.patch("/:action/:key/:memberId/:itemId", (req, res) => {
  const {
    action,
    key,
    memberId,
    itemId
  } = req.params;
  const query = {
    id: memberId,
    "items.itemId": itemId
  };
  let subDocKey = `items.$.${key}`;
  const value = action === "add" ? 1 : -1;
  const update = {
    $inc: {
      [subDocKey]: value
    }
  };
  const promise1 = Account.findOneAndUpdate(query, update);
  const actionKey = action === "add" ? "$push" : "$pull";
  const promise2 = Activity.findOneAndUpdate({
    privateId
  }, {
    [actionKey]: {
      [key]: itemId
    }
  });
  Promise.all([promise1, promise2]).then(() => res.end()).catch(err => {
    throw err;
  });
});
export default router;