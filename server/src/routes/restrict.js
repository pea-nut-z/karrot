import express from "express";
import { Restriction } from "../model/index.js";
const router = express.Router();
let privateId = "6346355173799d48dc57d225";

router.patch("/:action/:key/:memberId", async (req, res) => {
  const { action, key, memberId } = req.params;

  if (key === "block" || key === "hide") {
    const operator = action === "push" ? "$push" : "$pull";
    try {
      const myUpdate = { [operator]: { [key]: memberId } };
      const myDoc = await Restriction.findOneAndUpdate({ privateId }, myUpdate);
      if (key === "block") {
        const memberUpdate = { [operator]: { blockBy: myDoc.id } };
        await Restriction.findOneAndUpdate({ id: memberId }, memberUpdate);
      }
      res.send(`${action} ${key} successfully`);
    } catch (err) {
      throw err;
    }
  } else {
    res.send("Invalid action");
  }
});

export default router;
