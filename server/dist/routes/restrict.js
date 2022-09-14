import express from "express";
import { Restriction } from "../model/index.js";
const router = express.Router();
let privateId = "62e87ec387aecd786da8d937";
router.patch("/:action/:key/:memberId", async (req, res) => {
  const {
    action,
    key,
    memberId
  } = req.params; // block, hide, blockBy, feeds
  // block -> finds member in restrict, and add my id to their blockBy; add memberId to my block
  // hide ->  add member to my hide
  // feeds -> action:update key:feeds use req.body
  // if action = update
  // if block || hide add to my restrict -> if block add to member's blockBy

  if (key === "block" || key === "hide") {
    const operator = action === "push" ? "$push" : "$pull";

    try {
      const myUpdate = {
        [operator]: {
          [key]: memberId
        }
      };
      const myDoc = await Restriction.findOneAndUpdate({
        privateId
      }, myUpdate);

      if (key === "block") {
        const memberUpdate = {
          [operator]: {
            blockBy: myDoc.id
          }
        };
        await Restriction.findOneAndUpdate({
          id: memberId
        }, memberUpdate);
      }

      res.end();
    } catch (err) {
      throw err;
    }
  } else {
    res.send("reached else statement");
  }
});
export default router;