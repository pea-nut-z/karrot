import "dotenv/config";
// import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as routes from "./routes/index.js";
import * as actions from "./actions.js";
import { Account, Activity, Restriction } from "../src/model/index.js";

let privateId = "62e87ec387aecd786da8d937";

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error(err));

const app = express();
// app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", routes.account);
app.use("/activity", routes.activity);
app.use("/listing", routes.listing);
app.use("/review", routes.review);

app.get("/", async (req, res) => {
  const account = Account.findOne({ privateId }, { _id: 0, __v: 0 });
  const activities = Activity.findOne({ privateId }, { privateId: 0, _id: 0, __v: 0 });
  const restriction = Restriction.findOne(
    { privateId },
    { privateId: 0, blockBy: 0, _id: 0, __v: 0 }
  );

  Promise.all([account, activities, restriction])
    .then((docs) => {
      res.json({
        account: docs[0],
        activities: docs[1],
        restriction: docs[2],
      });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
